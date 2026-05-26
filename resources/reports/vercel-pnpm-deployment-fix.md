# Post-Mortem: Vercel Deployment & pnpm Lockfile Resolution

## 1. Executive Summary / Incident Overview

* **The Incident**: Initial attempts to deploy the Planicle website to Vercel failed during the "install" phase. The build logs reported two distinct fatal errors: first, a corrupted `pnpm-lock.yaml` with a `duplicated mapping key`, and subsequently, a `ERR_PNPM_LOCKFILE_CONFIG_MISMATCH` relating to `patchedDependencies`.
* **The Root Cause**: 
    1. **Lockfile Corruption**: A duplicate entry for `framer-motion` existed in the `pnpm-lock.yaml` file, likely introduced during a manual merge or local dependency update.
    2. **Environment Drift**: Vercel defaulted to `pnpm@10.x` while the local environment used `pnpm@11.1.3`. Additionally, placing `patchedDependencies` in `pnpm-workspace.yaml` rather than the root `package.json` caused detection issues in Vercel's optimized build environment.
* **The Fix**: 
    1. Surgically removed the duplicate key from the lockfile.
    2. Migrated `patchedDependencies` configuration to the root `package.json`.
    3. Explicitly pinned the package manager version using the `"packageManager"` field in `package.json`.
* **The Impact**: Deployment was successfully restored. The project now has a "frozen" lockfile that is consistent across local development and Vercel's CI/CD pipeline, preventing future "it works on my machine" deployment failures.

---

## 2. Technical Deep Dive: Lockfiles and Version Pinning

### What is a Lockfile?
A lockfile (`pnpm-lock.yaml`, `package-lock.json`, or `yarn.lock`) ensures that every developer and server installs the **exact same version** of every dependency and sub-dependency. Without it, a fresh install might pull a newer "minor" version of a library that introduces a bug, breaking the build unexpectedly.

### The "Duplicated Key" Problem
YAML (the format used by pnpm lockfiles) does not allow the same key to appear twice in a mapping at the same level.
```yaml
# ❌ INVALID YAML (Causes parser failure)
dependencies:
  framer-motion: ^12.40.0
  animejs: ^4.4.1
  framer-motion: ^12.40.0 # <--- Duplicate!
```
While some local tools might silently ignore the second key, Vercel's build environment uses strict parsers that fail immediately to prevent ambiguous dependency resolution.

### The `packageManager` Field
Modern Node.js projects use the `"packageManager"` field in `package.json` to tell tools (like Corepack or Vercel) exactly which version of `pnpm`, `npm`, or `yarn` to use:
```json
"packageManager": "pnpm@11.1.3"
```
This eliminates "Environment Drift," where a server uses an older version of the tool that might interpret the lockfile differently than the developer's machine.

---

## 3. Discovery & Debugging Process

The resolution required a multi-stage debugging approach as fixing one error unmasked the next.

### Stage 1: Identifying Lockfile Corruption
The Vercel logs provided a very specific error message:
```bash
Error while parsing config file: "/vercel/path0/pnpm-lock.yaml"
...
The lockfile at "/vercel/path0/pnpm-lock.yaml" is broken: duplicated mapping key (20:7)
 20 |       framer-motion:
```
By searching the local `pnpm-lock.yaml`, we confirmed that `framer-motion` appeared twice in the `importers` section.

### Stage 2: Identifying the Config Mismatch
After fixing the duplicate key, a new error appeared:
```bash
 ERR_PNPM_LOCKFILE_CONFIG_MISMATCH  Cannot proceed with the frozen installation. 
The current "patchedDependencies" configuration doesn't match the value found in the lockfile
```
This indicated that while the lockfile *recorded* a patch for the `shaders` package, Vercel's installer couldn't find the *instruction* to apply it in the expected location.

---

## 4. Implementation & Resolution

### Step 1: Manual Lockfile Repair
We performed a surgical edit on `pnpm-lock.yaml` to remove the redundant `framer-motion` block. This allowed the YAML parser to complete its pass.

### Step 2: Configuration Migration
In pnpm monorepos or workspace-style projects, `patchedDependencies` can technically live in `pnpm-workspace.yaml`. However, for single-package deployments on Vercel, moving this configuration to the root `package.json` is the standard "Best Practice" for maximum compatibility.

**Original (`pnpm-workspace.yaml`):**
```yaml
patchedDependencies:
  shaders: patches/shaders.patch
```

**New (`package.json`):**
```json
"patchedDependencies": {
  "shaders": "patches/shaders.patch"
}
```

### Step 3: Enforcing Tool Consistency
We added the `"packageManager": "pnpm@11.1.3"` field to `package.json`. This forced Vercel to upgrade from its default `10.x` version to `11.1.3`, matching the developer's environment exactly and ensuring the lockfile hashes were calculated using the same algorithm.

---

## 5. Local vs. CI/CD Environments

This incident highlights the difference between **Lenient Local Environments** and **Strict CI Environments**.

| Feature | Local Development | Vercel / CI Environment |
| :--- | :--- | :--- |
| **pnpm Version** | Manually managed (11.1.3) | Defaulted to 10.x |
| **Lockfile Enforcement** | Often updates automatically | Uses `--frozen-lockfile` (fails if any change is needed) |
| **Error Handling** | May ignore minor YAML warnings | Fatal crash on any syntax or hash mismatch |

By standardizing the configuration and pinning versions, we transitioned the project from a "lucky" local state to a "verifiable" production state.

---

## 6. Future Deployment Checklist

Before pushing a major change or adding new patches, use this checklist to ensure a smooth Vercel deployment:

- [ ] **Verify Lockfile Integrity**:
    * Run `pnpm install` locally. If it modifies the lockfile, commit those changes.
    * Check for duplicate keys if you've recently performed a complex git merge.
- [ ] **Check `packageManager` version**:
    * Ensure your local `pnpm -v` matches the version pinned in `package.json`.
- [ ] **Standardize Patch Locations**:
    * Always keep `patchedDependencies` in the root `package.json` for Next.js projects on Vercel.
- [ ] **Use Frozen Lockfiles Locally**:
    * Occasionally run `pnpm install --frozen-lockfile` locally to simulate the CI environment and catch mismatches early.
- [ ] **Review Vercel Build Logs**:
    * If a build fails, scroll up to the "install" phase. Most deployment issues are dependency-related, not code-related.

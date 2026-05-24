# Planicle Brand & UI/UX Design System Specification
**Target Atmosphere:** Premium, High-Conviction, Precise, Technologically Superior

---

## 1. Brand Identity & Creative Direction

Planicle is an elite software studio engineering high-end websites, applications, and advanced digital product ecosystems for rapid-growth startups (Seed to Series B). The identity is rooted in absolute execution, technical mastery, and elite execution. 

### Core Philosophy & Positioning
* **Expert Confidence:** The copywriting and structural layouts do not beg for attention; they command it. We let the work breathe, using razor-sharp layouts to communicate that we build premium software without needing hand-holding.
* **Premium Restraint:** We actively reject generic SaaS boilerplate layouts, cartoonish vector illustrations, and cluttered interfaces. Every pixel must feel intentional, expensive, and structurally sound.
* **The "Wow Factor" Engine:** The interface itself serves as the primary proof of competency. We showcase live-rendered, interactive architecture stacks, buttery-smooth micro-interactions, and flawless typography to immediately hook high-intent founders.

---

## 2. Color Palette & System Tokens

The layout shifts dynamically through a high-contrast dark aesthetic designed to feel prestigious, using an intense, energetic accent orange to anchor user focus and interactive states. Per the tonal arc principle: **never pitch black, never flat white throughout** — the darkest canvas is a rich near-black, and the lightest canvas is a warm ivory.

| Token Name | Hex Code | Visual Role / Usage |
| :--- | :--- | :--- |
| **Planicle Orange** | `#EF4A2A` | Primary Brand Mark, Active Interaction Rings, Interactive Focus Highlights |
| **Gris** | `#F7F7F7` | Technical Feature Sheets, Contrast Text Invasions |
| **N-700 (Rich Black)** | `#0C0C0E` | Core Canvas Background, Hero Panels, High-Impact Content Blocks (never pitch #000000) |
| **N-600 (Charcoal)** | `#161618` | Secondary Layer Containers, Deep Card Backdrops, Element Wrapper Fills |
| **N-500 (Off-Black)** | `#797872` | Technical Component Borders, Unselected Tabs, Grid Lines |
| **N-400 (Slate Muted)**| `#A09F9A` | Supporting Explanatory Text, Labels, Inactive Micro-copy |
| **N-300 (Stone Gray)** | `#E4E3DD` | Light Canvas Section Separators, Crisp Accent Borders |
| **N-200 (Warm Silver)** | `#EEEDE9` | Disabled Element Fills, Subtle Structural Dividers, Secondary Surface Backgrounds |
| **N-100 (Ivory White)** | `#F4F3EF` | Subtle Canvas Backgrounds, Card Surfaces, Elevated Layer Fills |
| **N-50 (Pure White)** | `#FFFFFF` | Heading Typography on dark canvases, Sharp Data Overlays (never used as a canvas/section background) |

---

## 3. Typography & Heading Composition

Our typographic hierarchy uses **expressive serif + sans-serif interplay** with an editorial layout sensibility. Three distinct type roles create deliberate structural tension:

1. **Display Serif** — high-contrast, editorial headlines that command attention.
2. **Sans-Serif Body** — clean, legible prose and UI text.
3. **Technical Monospace** — cold, hyper-precise labels, pills, and data fields.

```
       [ READY TO MOVE MOUNTAINS? ]       <-- Monospace Technical Capsule Pill
                    │
   ┌────────────────┴────────────────┐
   ▼                                 ▼
 Think big,                       make it real.  <-- Display Serif Headline
(Display Serif Bold)            (Display Serif Italic / Light)
                    │
                    ▼
  We build what others pitch.                     <-- Sans-Serif Body Text
       (Sans-Serif Regular)
```

### Typeface Rules
1.  **Display Heading Font (Serif):** A luxurious, high-contrast editorial Serif with sharp serifs and pronounced stroke contrast (e.g., *Editorial New*, *Chronicle Display*, or Google Font *Playfair Display / DM Serif Display*). Styled with tight tracking. This is the primary expressive voice — used for hero headlines, section titles, and any text that needs to feel authoritative and editorial. **Not** pixelated or lo-fi; the display serif must feel premium and high-fidelity.
2.  **Body & System Font (Sans-Serif):** Highly legible, geometric Sans-Serif or Technical Grotesk (e.g., *Inter*, *SF Pro Display*, or *Plus Jakarta Sans*). Used for body copy, navigation, buttons, and all functional UI text. Provides a clean, modern counterpoint to the editorial serif.
3.  **Capsule Labels & Data Fields (Monospace):** Precision Monospace (e.g., *SF Mono*, *JetBrains Mono*) for pills, tags, technical labels, and data readouts. Creates an uncompromisingly professional engineering look alongside the editorial serif.

### Scale & Hierarchy Metrics
* `h1` (Hero Headline): `56pt` - `72pt` (Desktop) / `36pt` (Mobile). Line-height: `1.05`. **Set in Display Serif.**
* `h2` (Section Headers): `36pt` - `44pt`. Line-height: `1.1`. **Set in Display Serif.**
* `Body Text`: `12pt` - `13pt`. Line-height: `1.65`. **Set in Sans-Serif.** Styled in muted slate (`#A09F9A`) to let white serif headers draw the primary optical weight.
* `Labels / Pills`: `10pt` - `11pt`. Letter-spacing: `0.08em`. Text-transform: uppercase. **Set in Monospace.**

---

## 4. Motion Mechanics & Interaction Design

Planicle communicates engineering dominance through **exceptional motion restraint**. We eliminate aggressive bounces, cartoonish spring physics, or frantic triggers. All animations use buttery-smooth exponential ease-out curves that make the interface feel perfectly oiled.

### Core Animation Specs
* **Standard Transition Curve:** `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-premium ease-out).
* **Hover Micro-interactions:** Elements like buttons, tags, or links expand with a strict, slight scale translation (`1.02x` max) or background shift over `250ms`.
* **The Architecture Reveal (Scroll-Driven):** As the founder scrolls to the process section, isometric application layer models gracefully slide vertically apart along a 3D Z-axis, simulating an exploding schematic file.

---

## 5. Accessibility, Inclusivity & Compliance

Planicle interfaces are built to a strict **WCAG 2.1 AA** baseline standard. 
* **Contrast Compliance:** All typography must hit or exceed a `4.5:1` contrast ratio against backdrops. Text in muted classes (`#A09F9A`) must automatically scale up or switch to a higher-contrast token when applied over lighter section canvas sheets.
* **Motion Accessibility:** Implement structural respect for system preferences:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
* **Semantic Soundness:** Interactive layers, interactive engineering modules, and configuration options must rely on native semantic elements (`<button>`, `<nav>`) with explicit `aria-expanded` states configured on interactive dashboards.

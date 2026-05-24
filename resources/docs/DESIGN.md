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

The layout shifts dynamically through a high-contrast dark aesthetic designed to feel prestigious, using an intense, energetic accent orange to anchor user focus and interactive states.

| Token Name | Hex Code | Visual Role / Usage |
| :--- | :--- | :--- |
| **Planicle Orange** | `#EF4A2A` | Primary Brand Mark, Active Interaction Rings, Interactive Focus Highlights |
| **Gris** | `#F7F7F7` | Technical Feature Sheets, Contrast Text Invasions |
| **N-700 (Jet Black)** | `#000000` | Core Canvas Background, Hero Panels, High-Impact Content Blocks |
| **N-600 (Charcoal)** | `#161618` | Secondary Layer Containers, Deep Card Backdrops, Element Wrapper Fills |
| **N-500 (Off-Black)** | `#797872` | Technical Component Borders, Unselected Tabs, Grid Lines |
| **N-400 (Slate Muted)**| `#A09F9A` | Supporting Explanatory Text, Labels, Inactive Micro-copy |
| **N-300 (Stone Gray)** | `#E4E3DD` | Light Canvas Section Separators, Crisp Accent Borders |
| **N-200 (Warm Silver)** | `#EEEDE9` | Disabled Element Fills, Subtle Structural Dividers, Secondary Surface Backgrounds |
| **N-100 (Ivory White)** | `#F4F3EF` | Subtle Canvas Backgrounds, Card Surfaces, Elevated Layer Fills |
| **N-50 (Pure White)** | `#FFFFFF` | Core Heading Typography (Dark Mode), Sharp Data Overlays |

---

## 3. Typography & Heading Composition

Our typographic hierarchy relies on a deliberate structural tension between an elegant, high-contrast display serif and a cold, hyper-precise technical monospace.

```
       [ READY TO MOVE MOUNTAINS? ]       <-- Monospace Technical Capsule Pill
                    │
   ┌────────────────┴────────────────┐
   ▼                                 ▼
 Think big,                       make it real  <-- Dual-style Display Header
(Display Serif Bold)            (Monospace / Pixelated Accent Style)
```

### Typeface Rules
1.  **Display Heading Font:** Luxurious, high-contrast editorial Serif (e.g., *Editorial New*, *Chronicle Display*, or Google Font *Playfair Display / DM Serif Display*). Styled with tight tracking, sharp serifs, and high stroke contrast.
2.  **Body & System Font:** Highly legible, geometric Sans-Serif or Technical Grotesk (e.g., *Inter*, *SF Pro Display*, or *Plus Jakarta Sans*).
3.  **Capsule Labels & Data Fields:** Precision Monospace (e.g., *SF Mono*, *JetBrains Mono*) for an uncompromisingly professional engineering look.

### Scale & Hierarchy Metrics
* `h1` (Hero Headline): `56pt` - `72pt` (Desktop) / `36pt` (Mobile). Line-height: `1.05`.
* `h2` (Section Headers): `36pt` - `44pt`. Line-height: `1.1`.
* `Body Text`: `12pt` - `13pt`. Line-height: `1.65`. Styled in muted slate (`#A09F9A`) to let white headers draw the primary optical weight.

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

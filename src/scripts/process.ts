import { PHASES, getLayerMotion, getLayerTransform, type LayerMotion } from "../data/phases";
import { cubicBezier, inQuad, tween, type Tween } from "./motion";

const outQuint = cubicBezier(0.23, 1, 0.32, 1);

/** Sticky, scroll-driven process section: 5 phases chosen by scroll position. */
export function initProcess() {
  const section = document.querySelector<HTMLElement>("[data-process]");
  if (!section) return;

  const layers = [...section.querySelectorAll<HTMLElement>("[data-layer]")];
  const text = section.querySelector<HTMLElement>("[data-phase-text]");
  const fields = [...section.querySelectorAll<HTMLElement>("[data-phase-field]")];
  const counter = section.querySelector<HTMLElement>("[data-phase-counter]");
  const tabs = [...section.querySelectorAll<HTMLElement>("[data-tab]")];

  // Every element whose classes depend on the active phase, with its phase index.
  const scoped = [...section.querySelectorAll<HTMLElement>("[data-on]")].map((el) => {
    const owner = el.closest<HTMLElement>("[data-tab], [data-layer], [data-card]")!;
    const idx = Number(owner.dataset.tab ?? owner.dataset.layer ?? owner.dataset.card);
    const list = (v?: string) => (v ? v.split(" ") : []);
    return { el, idx, on: list(el.dataset.on), off: list(el.dataset.off) };
  });

  let activeIdx = 0;
  const motions: LayerMotion[] = PHASES.map((_, i) => getLayerMotion(i, 0));
  const layerTweens: (Tween | null)[] = PHASES.map(() => null);
  let textTween: Tween | null = null;

  const applyLayer = (i: number) => {
    const el = layers[i];
    if (!el) return;
    el.style.transform = getLayerTransform(motions[i]!);
    el.style.opacity = String(motions[i]!.opacity);
  };

  const animateLayers = (idx: number) => {
    layers.forEach((_, i) => {
      layerTweens[i]?.cancel();
      const target = getLayerMotion(i, idx);
      const motion = motions[i]!;
      layerTweens[i] = tween(
        motion as unknown as Record<string, number>,
        { depth: target.depth, offsetY: target.offsetY, offsetX: target.offsetX, opacity: target.opacity },
        350,
        outQuint,
        () => applyLayer(i),
      );
    });
  };

  // Text swaps immediately, then dips out and back in (as the anime.js sequence did).
  const animateText = () => {
    if (!text) return;
    textTween?.cancel();
    const state = {
      opacity: Number(getComputedStyle(text).opacity),
      y: new DOMMatrixReadOnly(getComputedStyle(text).transform).m42,
    };
    const write = () => {
      text.style.opacity = String(state.opacity);
      text.style.transform = `translateY(${state.y}px)`;
    };
    textTween = tween(state, { opacity: 0, y: 8 }, 150, inQuad, write, () => {
      textTween = tween(state, { opacity: 1, y: 0 }, 300, outQuint, write);
    });
  };

  const render = (idx: number) => {
    const phase = PHASES[idx]!;
    for (const { el, on, off, idx: owner } of scoped) {
      const active = owner === idx;
      el.classList.remove(...(active ? off : on));
      el.classList.add(...(active ? on : off));
    }
    tabs.forEach((tab) => tab.setAttribute("aria-selected", String(Number(tab.dataset.tab) === idx)));
    layers.forEach((layer, i) => (layer.style.zIndex = String(i === idx ? 10 : 5 - i)));
    for (const field of fields) {
      const key = field.dataset.phaseField as "overline" | "title" | "copy";
      field.textContent = phase[key];
    }
    // Three text nodes, as the React build rendered them (keeps glyph shaping identical).
    counter?.replaceChildren("PHASE 0", String(idx + 1), " / 05");
  };

  const setActive = (idx: number) => {
    activeIdx = idx;
    render(idx);
    animateLayers(idx);
    animateText();
  };

  let frame: number | null = null;
  const onScroll = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = null;
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      if (range <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / range));
      const idx = Math.min(PHASES.length - 1, Math.max(0, Math.floor(progress * PHASES.length)));
      if (idx !== activeIdx) setActive(idx);
    });
  };

  const scrollToPhase = (idx: number) => {
    const rect = section.getBoundingClientRect();
    const top = rect.top + (window.scrollY || document.documentElement.scrollTop);
    const range = rect.height - window.innerHeight;
    if (range <= 0) {
      if (idx !== activeIdx) setActive(idx);
      return;
    }
    // Middle of the phase's scroll range.
    window.scrollTo({ top: top + ((idx + 0.5) / PHASES.length) * range, behavior: "smooth" });
  };

  render(activeIdx);
  tabs.forEach((tab) => tab.addEventListener("click", () => scrollToPhase(Number(tab.dataset.tab))));
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  // First paint runs the phase-change animation once, as the React effect did on mount.
  animateLayers(activeIdx);
  animateText();
}

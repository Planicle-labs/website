/**
 * Small animation helpers that reproduce the framer-motion and anime.js
 * behaviour of the previous React build without shipping either library.
 */

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Cubic bezier (same solver approach as CSS / anime.js) ---------- */

export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const ax = 3 * x1 - 3 * x2 + 1;
  const bx = 3 * x2 - 6 * x1;
  const cx = 3 * x1;
  const ay = 3 * y1 - 3 * y2 + 1;
  const by = 3 * y2 - 6 * y1;
  const cy = 3 * y1;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  const solveT = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i += 1) {
      const err = sampleX(t) - x;
      if (Math.abs(err) < 1e-7) return t;
      const d = slopeX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    while (lo < hi) {
      const v = sampleX(t);
      if (Math.abs(v - x) < 1e-7) return t;
      if (x > v) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
      if (hi - lo < 1e-7) break;
    }
    return t;
  };
  return (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : sampleY(solveT(x)));
}

export const inQuad = (t: number) => t * t;

/* ---------- rAF tween over plain numbers (anime.js "replace" semantics) ---------- */

export interface Tween {
  cancel(): void;
}

export function tween<T extends Record<string, number>>(
  target: T,
  to: Partial<T>,
  duration: number,
  ease: (t: number) => number,
  onUpdate: () => void,
  onComplete?: () => void,
): Tween {
  const from = { ...target };
  const keys = Object.keys(to) as (keyof T)[];
  const start = performance.now();
  let frame = 0;
  let cancelled = false;
  const step = (now: number) => {
    if (cancelled) return;
    const p = Math.min(1, (now - start) / duration);
    const e = ease(p);
    for (const k of keys) {
      const a = from[k] as number;
      const b = to[k] as number;
      (target as Record<keyof T, number>)[k] = a + (b - a) * e;
    }
    onUpdate();
    if (p < 1) frame = requestAnimationFrame(step);
    else onComplete?.();
  };
  frame = requestAnimationFrame(step);
  return {
    cancel() {
      cancelled = true;
      cancelAnimationFrame(frame);
    },
  };
}

/* ---------- framer-motion default spring for `scale` gestures ---------- */

// framer-motion animates `scale` with { stiffness: 550, damping: 30, restSpeed: 10 }
// and, for deltas below 5, stops once within 0.005 of the target, then snaps to it.
const STIFFNESS = 550;
const DAMPING = 30;
const REST_DELTA = 0.005;

function springEasing(delta: number) {
  const zeta = DAMPING / (2 * Math.sqrt(STIFFNESS));
  const w0 = Math.sqrt(STIFFNESS) / 1000;
  const wd = w0 * Math.sqrt(1 - zeta * zeta);
  const progress = (t: number) =>
    1 - Math.exp(-zeta * w0 * t) * ((zeta * w0 / wd) * Math.sin(wd * t) + Math.cos(wd * t));
  const threshold = Math.abs(delta) > 0 ? REST_DELTA / Math.abs(delta) : 1;
  let end = 10;
  while (end < 2000 && Math.abs(1 - progress(end)) > threshold) end += 10;
  // framer checks once per frame; refine to the millisecond for a smooth curve.
  while (end > 1 && Math.abs(1 - progress(end - 1)) <= threshold) end -= 1;
  const points: string[] = [];
  const steps = Math.max(8, Math.round(end / 8));
  for (let i = 0; i <= steps; i += 1) points.push(progress((end * i) / steps).toFixed(4));
  points[points.length - 1] = `${points[points.length - 1]} 99.9%`;
  points.push("1");
  return { duration: end, easing: `linear(${points.join(", ")})` };
}

/** Press (`whileTap`) and hover (`whileHover`) scale, like framer-motion gestures. */
export function bindGestureScale(el: HTMLElement, tap: number, hover?: number) {
  let hovered = false;
  let pressed = false;
  let anim: Animation | null = null;
  const current = () => Number.parseFloat(getComputedStyle(el).scale) || 1;
  const go = (to: number) => {
    const from = current();
    anim?.cancel();
    el.style.scale = String(from);
    if (from === to) {
      el.style.scale = to === 1 ? "" : String(to);
      return;
    }
    const { duration, easing } = springEasing(to - from);
    anim = el.animate([{ scale: String(from) }, { scale: String(to) }], { duration, easing });
    el.style.scale = to === 1 ? "" : String(to);
  };
  const update = () => go(pressed ? tap : hovered && hover ? hover : 1);
  el.addEventListener("pointerdown", (e) => {
    if (!e.isPrimary) return;
    pressed = true;
    update();
    const release = () => {
      pressed = false;
      update();
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
  });
  if (hover) {
    el.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return;
      hovered = true;
      update();
    });
    el.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch") return;
      hovered = false;
      update();
    });
  }
}

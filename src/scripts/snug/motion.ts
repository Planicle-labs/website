/**
 * Scroll choreography for /snug: Lenis smooth scrolling plus GSAP ScrollTrigger reveals.
 * Loaded after the page has loaded, and never when the visitor prefers reduced motion.
 * Every start state is set by CSS under `html.motion`, so nothing flashes before this runs.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { chromeFrame, setScroller } from "./chrome";

const EASE = "expo.out";

function smoothScroll() {
  // Lenis already subtracts the root's scroll-padding-top (the header height) from anchor targets.
  const lenis = new Lenis({ lerp: 0.12, autoRaf: false });
  lenis.on("scroll", () => {
    ScrollTrigger.update();
    // Move the ruler in the same frame as the page, not one frame behind.
    chromeFrame();
  });
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  // Ruler drags and jumps go through Lenis too, so they never fight a smooth scroll in progress.
  setScroller((y, immediate) => lenis.scrollTo(y, { immediate }));

  // In-page links: smooth scroll, update the URL, and move focus to the target for keyboard users.
  document.addEventListener("click", (e) => {
    const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
    if (!link || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const id = decodeURIComponent(link.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, {
      onComplete: () => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      },
    });
    history.pushState(null, "", `#${id}`);
  });

  // Pause smooth scrolling while the Cal.com booking modal is open, so the page
  // behind it never moves and the modal keeps native scrolling.
  let observed: Element | null = null;
  let stopped = false;
  const sync = () => {
    const box = document.querySelector("cal-modal-box");
    const open = !!box && box.getAttribute("state") !== "closed" && getComputedStyle(box).display !== "none";
    if (open && !stopped) lenis.stop();
    if (!open && stopped) lenis.start();
    stopped = open;
    if (box && box !== observed) {
      observed = box;
      new MutationObserver(sync).observe(box, { attributes: true, attributeFilter: ["state", "style"] });
    }
  };
  new MutationObserver(sync).observe(document.body, { childList: true });
  document.addEventListener("click", (e) => {
    if (!(e.target as Element | null)?.closest?.("[data-booking]")) return;
    // The modal mounts asynchronously; check for a few seconds, then give up.
    let tries = 0;
    const poll = () => {
      sync();
      if (!observed && ++tries < 40) setTimeout(poll, 150);
    };
    poll();
  });
  return lenis;
}

/** Fade-and-rise for blocks below the fold, revealed once, in batches. */
function reveals() {
  const selectors = [
    ".problem__grid > *",
    ".ship > *",
    ".ask .h2",
    ".ask__col",
    ".walk .h3",
    ".answers__head",
    ".card",
    ".setup__intro",
    ".setup__list li",
    ".fact",
    ".brands",
    ".pricing__head",
    ".plan",
    ".pricing__note",
    ".founding__head",
    ".founding__terms > *",
    ".faq__grid > div:first-child",
    ".qa",
    ".final__inner > :not(.final__title)",
  ];
  const vh = window.innerHeight;
  const targets = gsap.utils.toArray<HTMLElement>(selectors.join(",")).filter((el) => el.getBoundingClientRect().top > vh * 0.92);
  gsap.set(targets, { opacity: 0, y: 32 });
  ScrollTrigger.batch(targets, {
    start: "clamp(top 88%)",
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.08, overwrite: true }),
  });
}

function problem() {
  const slash = document.querySelector(".neq__slash");
  const neq = document.querySelector(".neq");
  if (slash && neq) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: neq, start: "clamp(top 88%)", once: true } });
    tl.from(".neq__m", { yPercent: 18, opacity: 0, duration: 1, ease: EASE, stagger: 0.12 })
      .from(".neq__eq", { opacity: 0, scale: 0.6, duration: 0.6, ease: EASE }, "-=0.6")
      .to(slash, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" }, "+=0.1")
      .fromTo(".neq__sign", { rotate: 0 }, { rotate: -4, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, "-=0.08");
  }

  const bars = document.querySelectorAll<HTMLElement>(".bar");
  if (bars.length) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".bars", start: "clamp(top 75%)", once: true } });
    bars.forEach((bar, i) => {
      const fill = bar.querySelector(".bar__fill");
      const num = bar.querySelector<HTMLElement>("[data-count]");
      tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.out" }, i * 0.18);
      if (num) {
        const to = parseFloat(num.dataset.count!);
        const decimals = num.dataset.count!.includes(".") ? 1 : 0;
        const o = { v: to - 12 };
        tl.to(o, { v: to, duration: 1.4, ease: "expo.out", onUpdate: () => (num.textContent = o.v.toFixed(decimals)) }, i * 0.18);
      }
    });
  }

  route();
}

/**
 * The wrong-size round trip. A parcel marked M leaves the store along the solid arc (drawing it),
 * is refused at the shopper, then comes back along the dashed curve (drawing that too). After the
 * first run the parcel keeps making the trip while the diagram is on screen.
 */
function route() {
  const fig = document.querySelector<HTMLElement>(".route");
  const svg = fig?.querySelector("svg");
  const parcel = fig?.querySelector<HTMLElement>(".route__parcel");
  const outPath = fig?.querySelector<SVGPathElement>(".route__out");
  const backPath = fig?.querySelector<SVGPathElement>(".route__back");
  const reveal = fig?.querySelector<SVGPathElement>(".route__back-reveal");
  const [store, shopper] = fig ? [...fig.querySelectorAll<HTMLElement>(".route__pt")] : [];
  const tags = fig ? [...fig.querySelectorAll<HTMLElement>(".route__tag")] : [];
  if (!fig || !svg || !parcel || !outPath || !backPath || !reveal || !store || !shopper) return;

  // Measure on copies without pathLength (it rescales the drawn paths for the dash reveal).
  const defs = svg.querySelector("defs")!;
  const legs = [outPath, backPath].map((p) => {
    const m = document.createElementNS("http://www.w3.org/2000/svg", "path");
    m.setAttribute("d", p.getAttribute("d")!);
    defs.append(m);
    return { m, len: m.getTotalLength() };
  });

  // SVG units to pixels; the figure scales with its column.
  let k = fig.clientWidth / 560;
  const state = { leg: 0, t: 0 };
  const place = () => {
    const { m, len } = legs[state.leg];
    const d = state.t * len;
    const a = m.getPointAtLength(d);
    const b = m.getPointAtLength(Math.min(len, d + 2));
    const c = m.getPointAtLength(Math.max(0, d - 2));
    // Tilt with the slope of the road, whichever way the parcel is heading.
    let deg = (Math.atan2(b.y - c.y, b.x - c.x) * 180) / Math.PI;
    if (deg > 90) deg -= 180;
    if (deg < -90) deg += 180;
    gsap.set(parcel, { x: a.x * k, y: a.y * k, rotation: deg * 0.3 });
  };
  new ResizeObserver(() => {
    k = fig.clientWidth / 560;
    place();
  }).observe(fig);

  const pulse = { keyframes: { scale: [1, 1.45, 1] }, duration: 0.4, ease: "power2.out" };
  const LEG = 1.5;
  // The roads draw with a 1 to 0 dash offset (pathLength=1): GSAP must not round it to whole pixels.

  /** One round trip. On the first run it also draws both roads and shows their labels. */
  const trip = (tl: gsap.core.Timeline, first: boolean) => {
    tl.call(() => {
      state.leg = 0;
      state.t = 0;
      place();
    })
      .fromTo(parcel, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.2)" })
      .addLabel("out")
      .to(state, { t: 1, duration: LEG, ease: "power1.inOut", onUpdate: place }, "out");
    if (first) {
      tl.to(outPath, { strokeDashoffset: 0, duration: LEG, ease: "power1.inOut", autoRound: false }, "out").to(
        tags[0],
        { opacity: 1, y: 0, duration: 0.4, ease: EASE },
        `out+=${LEG * 0.4}`,
      );
    }
    // At the shopper: it doesn't fit. A shake, and the shopper's dot flags it.
    tl.to(shopper, pulse)
      .to(parcel, { keyframes: { rotation: [-14, 12, -8, 0] }, duration: 0.5, ease: "none" }, "<")
      .call(() => {
        state.leg = 1;
        state.t = 0;
        place();
      })
      .addLabel("back", "+=0.15")
      .to(state, { t: 1, duration: LEG, ease: "power1.inOut", onUpdate: place }, "back");
    if (first) {
      tl.to(reveal, { strokeDashoffset: 0, duration: LEG, ease: "power1.inOut", autoRound: false }, "back").to(
        tags[1],
        { opacity: 1, y: 0, duration: 0.4, ease: EASE },
        `back+=${LEG * 0.4}`,
      );
    }
    // Home again: the second courier trip is done.
    tl.to(store, pulse).to(parcel, { opacity: 0, scale: 0.6, duration: 0.3, ease: "power2.in" }, "+=0.2");
    return tl;
  };

  gsap.set(tags, { opacity: 0, y: (i: number) => (i ? -10 : 10) });
  const loop = trip(gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2 }), false);
  let onScreen = false;
  let introDone = false;
  ScrollTrigger.create({
    trigger: fig,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      onScreen = self.isActive;
      if (!introDone) return;
      if (onScreen) loop.play();
      else loop.pause();
    },
  });
  const intro = gsap.timeline({
    scrollTrigger: { trigger: fig, start: "clamp(top 75%)", once: true },
    onComplete: () => {
      introDone = true;
      if (onScreen) gsap.delayedCall(1.2, () => onScreen && loop.play());
    },
  });
  intro.from([store, shopper], { scale: 0, duration: 0.45, ease: "back.out(2.4)", stagger: 0.08 });
  trip(intro, true);
}

function question() {
  const lines = gsap.utils.toArray<HTMLElement>(".strike__line");
  if (lines.length) {
    gsap.fromTo(
      lines,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: { trigger: ".strike", start: "clamp(top 85%)", end: "center 55%", scrub: 0.4 },
      },
    );
  }
  gsap.from(".token", {
    scrollTrigger: { trigger: ".tokens", start: "clamp(top 82%)", once: true },
    x: 24,
    opacity: 0,
    duration: 0.8,
    ease: EASE,
    stagger: 0.1,
  });
}

function closing() {
  const words = gsap.utils.toArray<HTMLElement>(".tw");
  if (words.length) {
    // A timed reveal, not a scrub: the headline sits near the bottom of the page, where a scrub
    // range may never complete, which left half the words faded.
    gsap.to(words, {
      color: "#111111",
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.14,
      scrollTrigger: { trigger: ".final__title", start: "clamp(top 85%)", once: true },
    });
  }
  document.querySelectorAll<HTMLElement>(".plan__fill").forEach((fill) => {
    const w = parseFloat(getComputedStyle(fill.parentElement!).getPropertyValue("--w")) || 1;
    gsap.fromTo(
      fill,
      { scaleX: 0 },
      { scaleX: w, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: fill.closest(".plan"), start: "clamp(top 92%)", once: true } },
    );
  });
  gsap.from(".spot__seg", {
    scrollTrigger: { trigger: ".spots", start: "clamp(top 88%)", once: true },
    scaleX: 0,
    duration: 0.7,
    ease: EASE,
    stagger: 0.08,
  });
}

export function initMotion() {
  const html = document.documentElement;
  if (!html.classList.contains("motion")) return;
  gsap.registerPlugin(ScrollTrigger);
  html.classList.add("motion-ready");
  smoothScroll();
  reveals();
  problem();
  question();
  closing();
  // Fonts or late layout can move trigger points; recalculate once everything has settled.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

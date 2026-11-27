/** Page chrome: the header that steps aside while reading, and the measuring strip on the right. */

let lastY = 0;
let cmPx = 37.8;
/** Runs the header and ruler update now; set once initChrome has run. */
export let chromeFrame: () => void = () => {};

type Scroller = (y: number, immediate: boolean) => void;
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
let scroller: Scroller = (y, immediate) =>
  window.scrollTo({ top: y, behavior: immediate || reducedMotion() ? "instant" : "smooth" });
/** The motion bundle hands its smooth scroller over, so ruler drags and jumps go through Lenis. */
export function setScroller(fn: Scroller) {
  scroller = fn;
}

function measureCm() {
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;visibility:hidden;height:10cm;width:1px";
  document.body.append(probe);
  cmPx = probe.getBoundingClientRect().height / 10 || 37.8;
  probe.remove();
}

export function initChrome() {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const tape = document.querySelector<HTMLElement>(".ruler__tape");
  const read = document.querySelector<HTMLElement>("[data-ruler-read]");
  const ruler = document.querySelector<HTMLElement>("[data-ruler]");
  const thumb = ruler?.querySelector<HTMLElement>(".ruler__read") ?? null;
  // Measured on start and on resize, so a scroll frame only reads the page height.
  let thumbH = thumb?.offsetHeight ?? 0;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  measureCm();

  // After an in-page link, keep the header visible: the jump is not the reader scrolling down.
  let holdUntil = 0;
  document.addEventListener("click", (e) => {
    if ((e.target as Element | null)?.closest?.('a[href^="#"]')) holdUntil = performance.now() + 2500;
  });

  let queued = false;
  const frame = () => {
    queued = false;
    const y = Math.max(0, window.scrollY);
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (header) {
      header.classList.toggle("is-scrolled", y > 8);
      // Hide while scrolling down past the hero, show again on any scroll up.
      const down = y > lastY + 4;
      const up = y < lastY - 4;
      const held = performance.now() < holdUntil;
      if (down && !held && y > window.innerHeight * 0.6 && !header.contains(document.activeElement)) header.classList.add("is-hidden");
      else if (up || y < 80) header.classList.remove("is-hidden");
    }
    if (tape && !reduced) tape.style.transform = `translate3d(0, ${-(y % (cmPx * 5))}px, 0)`;
    if (read) read.textContent = String(Math.round(y / cmPx));
    // The cm chip is the scroll thumb: its place on the strip is how far down the page you are.
    if (thumb && thumbH) {
      const room = window.innerHeight - thumbH;
      thumb.style.transform = `translate3d(0, ${Math.round(Math.min(1, y / max) * room)}px, 0)`;
    }
    lastY = y;
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(frame);
    }
  };
  chromeFrame = frame;
  window.addEventListener("scroll", onScroll, { passive: true });
  let resizeQueued = false;
  window.addEventListener("resize", () => {
    if (resizeQueued) return;
    resizeQueued = true;
    requestAnimationFrame(() => {
      resizeQueued = false;
      measureCm();
      thumbH = thumb?.offsetHeight ?? 0;
      onScroll();
    });
  });
  header?.addEventListener("focusin", () => header.classList.remove("is-hidden"));
  if (ruler && thumb) initRulerScroll(ruler, thumb);
  frame();
}

/** Pointer scrolling on the ruler strip: drag the chip like a scrollbar thumb, or click the strip to jump. */
function initRulerScroll(ruler: HTMLElement, thumb: HTMLElement) {
  const html = document.documentElement;
  let grab = -1;
  const targetFor = (clientY: number) => {
    const room = window.innerHeight - thumb.offsetHeight;
    const ratio = Math.min(1, Math.max(0, (clientY - grab) / Math.max(1, room)));
    return ratio * Math.max(0, html.scrollHeight - window.innerHeight);
  };
  ruler.addEventListener("pointerdown", (e) => {
    // Under 900px the chip is hidden and the strip is decoration only.
    if (e.button !== 0 || !thumb.offsetHeight) return;
    e.preventDefault();
    const onThumb = thumb.contains(e.target as Node);
    // Hold the chip where it was grabbed; a click on the strip centres the chip on the pointer.
    grab = onThumb ? e.clientY - thumb.getBoundingClientRect().top : thumb.offsetHeight / 2;
    if (!onThumb) scroller(targetFor(e.clientY), false);
    ruler.setPointerCapture(e.pointerId);
    html.classList.add("is-ruler-drag");
  });
  ruler.addEventListener("pointermove", (e) => {
    if (grab < 0 || !ruler.hasPointerCapture(e.pointerId)) return;
    scroller(targetFor(e.clientY), true);
  });
  const end = () => {
    grab = -1;
    html.classList.remove("is-ruler-drag");
  };
  ruler.addEventListener("pointerup", end);
  ruler.addEventListener("pointercancel", end);
  ruler.addEventListener("lostpointercapture", end);
}

/** Desktop walkthrough: the step nearest the middle of the screen drives the sticky product frame. */
export function initWalk() {
  const frames = document.querySelector<HTMLElement>("[data-walk]");
  const steps = [...document.querySelectorAll<HTMLElement>(".step[data-step]")];
  if (!frames || !steps.length) return;
  const set = (n: string) => {
    frames.dataset.walk = n;
    steps.forEach((s) => s.classList.toggle("is-active", s.dataset.step === n));
  };
  set("1");
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && set((e.target as HTMLElement).dataset.step!)),
    { rootMargin: "-38% 0px -38% 0px" },
  );
  steps.forEach((s) => io.observe(s));
}

/** Highlight the nav link of the section in view. */
export function initNavSpy() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>(".hdr__nav a[href^='#']")];
  const map = new Map(links.map((a) => [a.hash.slice(1), a]));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.removeAttribute("aria-current"));
        map.get(e.target.id)?.setAttribute("aria-current", "location");
      }),
    { rootMargin: "-40% 0px -55% 0px" },
  );
  map.forEach((_, id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

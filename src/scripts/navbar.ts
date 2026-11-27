import { openBooking } from "./booking";
import { initClocks } from "./clock";
import { bindGestureScale, prefersReducedMotion } from "./motion";

const COMPACT_RANGE = 250;
const EXPAND_ZONE = 600;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Smooth-scroll to an in-page anchor, or open booking for #connect. */
export function scrollToHash(href: string) {
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  const id = href.replace("#", "");
  if (id === "" || id === "/") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

function initCompactOnScroll(header: HTMLElement) {
  // "Compact" progress 0..100: grows while scrolling down, shrinks while scrolling
  // up only inside the top EXPAND_ZONE, and resets near the top.
  let last = window.scrollY;
  let d = Math.min((last / COMPACT_RANGE) * 100, 100);
  const write = () => header.style.setProperty("--nav-d", String(d));
  write();
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      const delta = y - last;
      if (delta === 0) return;
      last = y;
      if (y <= 10) d = 0;
      else if (delta > 0) d = Math.min(d + (delta / COMPACT_RANGE) * 100, 100);
      else if (y <= EXPAND_ZONE) d = Math.max(d + (delta / COMPACT_RANGE) * 100, 0);
      write();
    },
    { passive: true },
  );
}

function initMobileMenu() {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.getElementById("mobile-nav-menu");
  if (!toggle || !menu) return;
  const iconOpen = toggle.querySelector<SVGElement>("[data-icon-open]");
  const iconClose = toggle.querySelector<SVGElement>("[data-icon-close]");
  const links = [...menu.querySelectorAll<HTMLElement>("[data-menu-link]")];
  const footer = menu.querySelector<HTMLElement>("[data-menu-footer]");
  let open = false;
  let running: Animation[] = [];

  const stopAll = () => {
    running.forEach((a) => a.cancel());
    running = [];
  };
  const play = (el: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
    const a = el.animate(frames, { easing: EASE, fill: "both", ...options });
    running.push(a);
    return a.finished;
  };

  const setOpen = (next: boolean) => {
    if (next === open) return;
    open = next;
    toggle.setAttribute("aria-expanded", String(open));
    iconOpen?.classList.toggle("hidden", open);
    iconClose?.classList.toggle("hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
    // Start the next transition from wherever the current one is.
    const snapshot = (el: HTMLElement) => {
      const cs = getComputedStyle(el);
      return { transform: cs.transform, opacity: Number(cs.opacity) };
    };
    const fromMenu = snapshot(menu);
    const fromLinks = links.map(snapshot);
    const fromFooter = footer ? snapshot(footer) : null;
    stopAll();

    if (open) {
      menu.hidden = false;
      play(menu, [{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
      links.forEach((link, i) =>
        play(link, [{ transform: "translateY(100%)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 600, delay: i * 100 }),
      );
      if (footer) play(footer, [{ transform: "translateY(10px)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 400, delay: 250 });
      return;
    }

    // Exit: everything leaves together; the overlay is removed once all are done.
    const done = [
      play(menu, [{ opacity: fromMenu.opacity }, { opacity: 0 }], { duration: 400 }),
      ...links.map((link, i) =>
        play(link, [fromLinks[i], { transform: "translateY(-20%)", opacity: 0 }], { duration: 600, delay: i * 100 }),
      ),
    ];
    if (footer && fromFooter) done.push(play(footer, [fromFooter, { transform: "translateY(10px)", opacity: 0 }], { duration: 400, delay: 250 }));
    Promise.all(done)
      .then(() => {
        if (open) return;
        menu.hidden = true;
        stopAll();
      })
      .catch(() => {});
  };

  toggle.addEventListener("click", () => setOpen(!open));
  menu.querySelectorAll("[data-menu-link], [data-menu-close]").forEach((el) => el.addEventListener("click", () => setOpen(false)));
  // Viewport grows past the mobile breakpoint: the overlay is display:none there, so release the scroll lock.
  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

export function initNavbar() {
  const header = document.querySelector<HTMLElement>("[data-nav]");
  if (!header) return;
  initCompactOnScroll(header);
  initMobileMenu();
  initClocks();

  document.querySelectorAll<HTMLElement>("[data-tap]").forEach((el) => {
    bindGestureScale(el, Number(el.dataset.tap), el.dataset.hover ? Number(el.dataset.hover) : undefined);
  });

  // Navigation links always handle their own scrolling (the URL hash stays unchanged).
  document.querySelectorAll<HTMLAnchorElement>("a[data-nav-link]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToHash(a.getAttribute("href") ?? "#");
    }),
  );

  // Other in-page links smooth-scroll too, unless reduced motion is requested.
  if (!prefersReducedMotion()) {
    window.addEventListener("click", (e) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href");
      if (!a || !href?.startsWith("#") || a.hasAttribute("data-nav-link") || a.closest("header")) return;
      e.preventDefault();
      if (href === "#connect") openBooking();
      else scrollToHash(href);
    });
  }
}

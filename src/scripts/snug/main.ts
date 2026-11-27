/**
 * Client entry for /snug. The page is server-rendered in its final state; this wires
 * up the demo and page chrome, then loads the motion bundle (GSAP, Lenis) after load.
 */
import { initBooking } from "../booking";
import { initChrome, initNavSpy, initWalk } from "./chrome";
import { initTranslator } from "./translator";

const html = document.documentElement;
html.classList.add("js");
initTranslator();
// Booking first and synchronously: it only adds listeners, and a fast tap must open the modal.
initBooking({
  theme: "light",
  brand: "#FFD60A",
  brandEmphasis: "#E6C000",
  brandText: "#111111",
  notes: "Snug enquiry from planicle.com/snug",
  fallbackToLink: true,
});

declare global {
  interface Window {
    __snugMotionFailsafe?: number;
  }
}

requestAnimationFrame(() =>
  setTimeout(() => {
    initChrome();
    initWalk();
    initNavSpy();

    if (!html.classList.contains("motion")) return;
    const start = () => {
      if (!html.classList.contains("motion")) return;
      // The bundle is on its way: replace the page-level failsafe with one for the download itself.
      clearTimeout(window.__snugMotionFailsafe);
      const failsafe = setTimeout(() => html.classList.remove("motion"), 3000);
      return import("./motion")
        .then(({ initMotion }) => {
          clearTimeout(failsafe);
          initMotion();
        })
        .catch((err) => {
          html.classList.remove("motion");
          console.error("[snug] motion failed to load:", err);
        });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }, 0),
);

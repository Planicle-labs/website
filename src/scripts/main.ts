/**
 * Single client entry for the page. Everything here is small; the hero shader
 * (three.js) is split into its own chunk and loaded without blocking.
 */
import { initBooking } from "./booking";
import { initManifesto } from "./manifesto";
import { initNavbar } from "./navbar";
import { initProcess } from "./process";
import { initServices } from "./services";

function initHeroShader() {
  const container = document.querySelector<HTMLElement>("[data-hero-shader] .shader");
  const canvas = container?.querySelector("canvas");
  if (!container || !canvas) return;
  // Decorative: fetch three.js only after the page (HTML, CSS, fonts) has loaded,
  // so it never competes with the content for bandwidth or the main thread.
  const start = () =>
    import("./hero-shader")
      .then(({ mountHeroShader }) => mountHeroShader(container, canvas))
      .catch((err) => console.error("[HeroShader] failed to load:", err));
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}

// The markup is server-rendered in its initial state, so wiring up behaviour can
// wait until the first frame has painted instead of delaying it.
requestAnimationFrame(() =>
  setTimeout(() => {
    initBooking();
    initNavbar();
    initProcess();
    initServices();
    initManifesto();
    initHeroShader();
  }, 0),
);

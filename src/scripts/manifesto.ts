import { revealOnView } from "./reveal";

/** Manifesto: staggered reveal the first time it comes into view. */
export function initManifesto() {
  const manifesto = document.querySelector<HTMLElement>("[data-manifesto]");
  if (manifesto) revealOnView(manifesto, "reveal-item", 100);
}

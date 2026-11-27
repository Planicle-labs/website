import { revealOnView } from "./reveal";

/** Services: staggered reveal when the cards enter view, and the cursor-following glow. */
export function initServices() {
  const stack = document.querySelector<HTMLElement>("[data-service-cards]");
  if (!stack) return;
  const cards = [...stack.querySelectorAll<HTMLElement>(".service-card")];

  revealOnView(stack, "reveal-card", 80);

  stack.addEventListener("mousemove", (e) => {
    // Read every rect first, then write, so layout is computed once per event.
    const rects = cards.map((card) => card.getBoundingClientRect());
    cards.forEach((card, i) => {
      card.style.setProperty("--mouse-x", `${e.clientX - rects[i]!.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rects[i]!.top}px`);
    });
  });
  stack.addEventListener("mouseenter", () => cards.forEach((c) => c.style.setProperty("--glow-opacity", "1")));
  stack.addEventListener("mouseleave", () => cards.forEach((c) => c.style.setProperty("--glow-opacity", "0")));
}

/**
 * Plays the paused CSS reveal animations inside `root` the first time it enters
 * the viewport (shrunk by `margin` px), then releases each finished animation so
 * the element keeps its final values without a held animation.
 */
export function revealOnView(root: HTMLElement, itemClass: string, margin: number) {
  root.addEventListener("animationend", (e) => {
    const el = e.target as HTMLElement;
    if (el.classList.contains(itemClass)) el.classList.add("reveal-done");
  });
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        root.setAttribute("data-revealed", "");
        io.disconnect();
      }
    },
    { rootMargin: `-${margin}px` },
  );
  io.observe(root);
}

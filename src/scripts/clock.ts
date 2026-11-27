/** Live IST clock in the navbar and mobile menu, refreshed every 30 seconds. */
export function initClocks(timeZone = "Asia/Kolkata", label = "IST") {
  const clocks = [...document.querySelectorAll<HTMLElement>("[data-clock]")];
  if (!clocks.length) return;
  const update = () => {
    const now = new Date();
    let text: string;
    try {
      text = now.toLocaleTimeString("en-US", { hourCycle: "h23", hour: "2-digit", minute: "2-digit", timeZone });
    } catch {
      text = now.toLocaleTimeString("en-US", { hourCycle: "h23", hour: "2-digit", minute: "2-digit" });
    }
    for (const clock of clocks) {
      clock.classList.remove("opacity-50");
      const span = clock.lastElementChild;
      if (span) span.textContent = `${text} ${label}`;
    }
  };
  update();
  setInterval(update, 30_000);
}

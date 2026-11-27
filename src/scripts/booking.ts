/**
 * Cal.com booking modal. The embed script (about 27 KB) loads on the visitor's
 * first interaction instead of on every page view; a click that arrives before
 * it has loaded is queued by Cal's own stub and opens the modal once ready.
 */

type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };
declare global {
  interface Window {
    Cal?: CalFn;
  }
}

const EMBED_SRC = "https://app.cal.com/embed/embed.js";
const CAL_LINK = "planicle-labs/30min";

function ensureCal(): CalFn {
  if (window.Cal) return window.Cal;
  // Official Cal.com embed v2 stub: queues calls and injects the script once.
  /* eslint-disable prefer-rest-params */
  (function (C: Window, A: string, L: string) {
    const p = (a: { q: unknown[] }, ar: unknown) => a.q.push(ar);
    const d = C.document;
    const cal = function (this: unknown) {
      const self = C.Cal!;
      const ar = arguments;
      if (!self.loaded) {
        self.ns = {};
        self.q = self.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        self.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () {
          p(api as unknown as { q: unknown[] }, arguments);
        } as unknown as { q: unknown[] };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === "string") {
          self.ns![namespace] = self.ns![namespace] || api;
          p(self.ns![namespace] as { q: unknown[] }, ar);
          p(self as unknown as { q: unknown[] }, ["initNamespace", namespace]);
        } else p(self as unknown as { q: unknown[] }, ar);
        return;
      }
      p(self as unknown as { q: unknown[] }, ar);
    } as CalFn;
    C.Cal = C.Cal || cal;
  })(window, EMBED_SRC, "init");
  /* eslint-enable prefer-rest-params */

  const Cal = window.Cal!;
  Cal("init", { origin: "https://app.cal.com" });
  Cal("ui", {
    theme: "dark",
    cssVarsPerTheme: {
      dark: {
        "cal-brand": "#EF4A2A",
        "cal-brand-emphasis": "#d63b1c",
        "cal-brand-text": "#FFFFFF",
      },
    },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
  return Cal;
}

export function openBooking() {
  try {
    ensureCal()("modal", {
      calLink: CAL_LINK,
      config: { theme: "dark", notes: "Scheduled via Planicle Labs website CTA" },
    });
  } catch {
    window.open(`https://cal.com/${CAL_LINK}`, "_blank", "noopener,noreferrer");
  }
}

/** Load the embed on first intent, and open the modal from any [data-booking] control. */
export function initBooking() {
  const events = ["pointerdown", "pointermove", "keydown", "touchstart", "scroll", "focusin"] as const;
  const warm = () => {
    events.forEach((e) => window.removeEventListener(e, warm));
    ensureCal();
  };
  events.forEach((e) => window.addEventListener(e, warm, { once: true, passive: true }));

  document.addEventListener("click", (e) => {
    const trigger = (e.target as Element | null)?.closest?.("[data-booking]");
    if (!trigger) return;
    e.preventDefault();
    openBooking();
  });
}

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

/** How the modal looks and what note it carries. The defaults are the homepage's. */
export interface BookingConfig {
  theme: "dark" | "light";
  brand: string;
  brandEmphasis: string;
  brandText: string;
  notes: string;
  /** Let modified clicks open the link, and follow it if the embed never opens. Off for the homepage. */
  fallbackToLink?: boolean;
}

const PLANICLE: BookingConfig = {
  theme: "dark",
  brand: "#EF4A2A",
  brandEmphasis: "#d63b1c",
  brandText: "#FFFFFF",
  notes: "Scheduled via Planicle Labs website CTA",
};

let config: BookingConfig = PLANICLE;

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
    theme: config.theme,
    cssVarsPerTheme: {
      [config.theme]: {
        "cal-brand": config.brand,
        "cal-brand-emphasis": config.brandEmphasis,
        "cal-brand-text": config.brandText,
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
      config: { theme: config.theme, notes: config.notes },
    });
  } catch {
    window.open(`https://cal.com/${CAL_LINK}`, "_blank", "noopener,noreferrer");
  }
}

/** Load the embed on first intent, and open the modal from any [data-booking] control. */
export function initBooking(options: BookingConfig = PLANICLE) {
  config = options;
  const events = ["pointerdown", "pointermove", "keydown", "touchstart", "scroll", "focusin"] as const;
  const warm = () => {
    events.forEach((e) => window.removeEventListener(e, warm));
    ensureCal();
  };
  events.forEach((e) => window.addEventListener(e, warm, { once: true, passive: true }));

  document.addEventListener("click", (e) => {
    const trigger = (e.target as Element | null)?.closest?.("[data-booking]");
    if (!trigger) return;
    if (config.fallbackToLink && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0)) return;
    e.preventDefault();
    openBooking();
    if (config.fallbackToLink && trigger instanceof HTMLAnchorElement) {
      const href = trigger.href;
      // If the embed is blocked or offline, the modal never mounts: open the booking page instead.
      // Once it has mounted (even if already closed again), never redirect.
      let tries = 0;
      const check = () => {
        if (document.querySelector("cal-modal-box")) return;
        if (++tries >= 16) window.location.assign(href);
        else setTimeout(check, 250);
      };
      setTimeout(check, 250);
    }
  });
}

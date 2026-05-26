'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface BookingContextType {
  openBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({
  openBooking: () => {},
});

export const useBooking = () => useContext(BookingContext);

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [, setIsLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;

    // Official Cal.com embed v2 IIFE — sets up queue, namespace handling,
    // and auto-loads the script exactly as Cal's snippet generator produces.
    if (!w.Cal || !w.Cal.loaded) {
      /* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params */
      (function (C: any, A: string, L: string) {
        const p = function (a: any, ar: any) { a.q.push(ar); };
        const d = C.document;
        C.Cal = C.Cal || function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); } as any;
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      /* eslint-enable @typescript-eslint/no-explicit-any, prefer-rest-params */
    }

    // Initialize the default namespace with the correct origin
    w.Cal("init", { origin: "https://app.cal.com" });

    // Pre-configure UI styles — dark mode with Planicle brand accent
    w.Cal("ui", {
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  const openBooking = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.Cal) {
      w.Cal("modal", {
        calLink: "planicle-labs/30min",
        config: {
          theme: "dark",
          notes: "Scheduled via Planicle website CTA",
        }
      });
    } else {
      // Fallback: if script fails to load, redirect gracefully
      window.open("https://cal.com/planicle-labs/30min", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

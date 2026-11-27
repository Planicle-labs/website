/** The hero size translator: pick a size and brand, read the size to take at the sample store. */
import { translate, type Chart } from "../../data/snug_engine";

interface Payload {
  min: number;
  max: number;
  brands: Chart[];
  store: Chart;
}

const fmt = (n: number) => n.toFixed(1);
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Count a number shown in an element from its current value to the target. */
function countTo(el: HTMLElement, to: number) {
  const from = parseFloat(el.textContent || "0");
  if (reduced() || Math.abs(from - to) < 0.05) {
    el.textContent = fmt(to);
    return;
  }
  const start = performance.now();
  const dur = 700;
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const e = 1 - Math.pow(1 - t, 4);
    el.textContent = fmt(from + (to - from) * e);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initTranslator() {
  const el = document.querySelector<HTMLElement>("[data-translator]");
  if (!el?.dataset.payload) return;
  const root: HTMLElement = el;
  const data = JSON.parse(el.dataset.payload) as Payload;
  const pct = (cm: number) => ((cm - data.min) / (data.max - data.min)) * 100;
  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T & Element>(sel)!;

  const refLane = $("[data-lane=ref]");
  const storeLane = $("[data-lane=store]");
  const needle = $<HTMLElement>("[data-needle]");
  const gap = $<HTMLElement>("[data-gap]");
  const result = $<HTMLElement>(".tx__result");
  const live = $<HTMLElement>("[data-live]");
  const close = $<HTMLElement>("[data-close]");
  const w = {
    size: $<HTMLElement>("[data-w-size]"),
    brand: $<HTMLElement>("[data-w-brand]"),
    ref: $<HTMLElement>("[data-w-ref]"),
    match: $<HTMLElement>("[data-w-match]"),
    mchest: $<HTMLElement>("[data-w-mchest]"),
    delta: $<HTMLElement>("[data-w-delta]"),
  };

  // Let the load choreography finish, then hand movement over to transitions.
  setTimeout(() => root.classList.add("is-settled"), reduced() ? 0 : 2300);

  let current = (result.querySelector("[data-letter]")?.textContent || "").trim();

  function swapLetter(next: string) {
    if (next === current) return;
    current = next;
    const old = result.querySelector<HTMLElement>("[data-letter]:not(.is-out)");
    const el = document.createElement("span");
    el.className = "tx__letter";
    el.dataset.letter = "";
    el.dataset.len = String(next.length);
    el.textContent = next;
    if (reduced() || !old) {
      old?.remove();
      result.append(el);
      return;
    }
    // Drop the finished entry animation first, or the exit animation never starts.
    old.classList.remove("is-in");
    old.classList.add("is-out");
    old.addEventListener("animationend", () => old.remove(), { once: true });
    setTimeout(() => old.remove(), 700);
    el.classList.add("is-in");
    result.append(el);
  }

  function update() {
    // A change during the intro hands control to transitions straight away.
    root.classList.add("is-settled");
    const form = root.querySelector("form")!;
    const fd = new FormData(form);
    const brand = data.brands.find((b) => b.id === fd.get("tx-brand")) ?? data.brands[0];
    const ref = brand.sizes.find((s) => s.size === fd.get("tx-size")) ?? brand.sizes[1];
    const m = translate(ref.chest, data.store);

    refLane.querySelectorAll<HTMLElement>(".mk").forEach((mk) => {
      const row = brand.sizes.find((s) => s.size === mk.dataset.size);
      if (!row) return;
      mk.style.setProperty("--p", String(pct(row.chest)));
      mk.querySelector("i")!.textContent = fmt(row.chest);
      mk.classList.toggle("is-on", row.size === ref.size);
    });
    $<HTMLElement>("[data-ref-name]").textContent = brand.name;
    storeLane.querySelectorAll<HTMLElement>(".mk").forEach((mk) => mk.classList.toggle("is-on", mk.dataset.size === m.size));

    needle.style.setProperty("--p", String(pct(ref.chest)));
    countTo($<HTMLElement>("[data-read-cm]"), ref.chest);
    countTo($<HTMLElement>("[data-read-in]"), ref.chest / 2.54);
    gap.style.setProperty("--a", String(pct(Math.min(ref.chest, m.chest))));
    gap.style.setProperty("--b", String(pct(Math.max(ref.chest, m.chest))));

    swapLetter(m.size);
    w.size.textContent = ref.size;
    w.brand.textContent = brand.name;
    w.ref.textContent = `${fmt(ref.chest)} cm`;
    w.match.textContent = m.size;
    w.mchest.textContent = `${fmt(m.chest)} cm`;
    w.delta.textContent = `${fmt(m.delta)} cm`;
    if (m.closeTo) {
      close.hidden = false;
      close.textContent = `${m.closeTo.size} would also work, a little ${m.closeTo.roomier ? "roomier" : "snugger"}.`;
    } else {
      close.hidden = true;
      close.textContent = "";
    }
    live.textContent = `At SAHAJ, take ${m.size}. Your ${ref.size} from ${brand.name} is ${fmt(ref.chest)} cm across the chest; SAHAJ’s ${m.size} is ${fmt(m.chest)} cm.${m.closeTo ? ` ${m.closeTo.size} would also work.` : ""}`;
  }

  const form = root.querySelector("form")!;
  form.addEventListener("change", update);
  // Pointer shortcut: tapping a size on the tape selects it (the radios stay the accessible control).
  refLane.addEventListener("click", (e) => {
    const size = (e.target as Element).closest<HTMLElement>(".mk")?.dataset.size;
    const radio = size ? form.querySelector<HTMLInputElement>(`input[name="tx-size"][value="${size}"]`) : null;
    if (!radio || radio.checked) return;
    radio.checked = true;
    update();
  });
  // Enter on a radio must never submit (and reload) the page.
  form.addEventListener("submit", (e) => e.preventDefault());
}

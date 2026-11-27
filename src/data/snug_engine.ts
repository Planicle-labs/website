/** Size matching used by the /snug demo. No imports, so it can ship to the browser on its own. */

export type Size = "S" | "M" | "L" | "XL" | "XXL";
export interface Chart {
  id: string;
  name: string;
  sizes: { size: Size; chest: number }[];
}

export interface Match {
  size: Size;
  chest: number;
  delta: number;
  /** Neighbouring size when the reference sits within 1 cm of the midpoint between two sizes. */
  closeTo: { size: Size; roomier: boolean } | null;
}

/** Closest garment chest on the target chart: the rule Snug uses when both tees share a fit. */
export function translate(refChest: number, target: Chart): Match {
  const rows = target.sizes;
  let best = 0;
  rows.forEach((r, i) => {
    if (Math.abs(r.chest - refChest) < Math.abs(rows[best].chest - refChest)) best = i;
  });
  const row = rows[best];
  let closeTo: Match["closeTo"] = null;
  for (const j of [best - 1, best + 1]) {
    const n = rows[j];
    if (!n) continue;
    const mid = (n.chest + row.chest) / 2;
    if (Math.abs(refChest - mid) <= 1) closeTo = { size: n.size, roomier: n.chest > row.chest };
  }
  return { size: row.size, chest: row.chest, delta: Math.abs(row.chest - refChest), closeTo };
}


"use client";

import { useCurrency } from "@/lib/currency";
import { formatMoney, priceFor } from "@/lib/pricing";
import type { Billing, PlanId } from "@/lib/site";

/** Big plan price in the visitor's currency. Re-renders instantly when currency or billing changes. */
export function Price({ plan, billing = "monthly" }: { plan: PlanId; billing?: Billing }) {
  const currency = useCurrency();
  const p = priceFor(plan, currency, billing);

  return (
    <div>
      <p className="flex items-baseline gap-1.5">
        <span className="font-display text-[clamp(2.75rem,2rem+2.5vw,3.75rem)] leading-none">
          {formatMoney(p.headline, currency)}
        </span>
        <span className="font-bold">{plan === "free" ? "forever" : `/ ${p.per === "mo" ? "month" : "year"}`}</span>
      </p>
      <p className="mt-2 min-h-[1.5em] text-[0.9375rem]">
        {plan === "free"
          ? "No card, no time limit."
          : billing === "annual"
            ? `That's ${formatMoney(p.perMonth, currency, { cents: !Number.isInteger(p.perMonth) })} a month, billed yearly.`
            : "Billed monthly. Cancel any time."}
      </p>
    </div>
  );
}

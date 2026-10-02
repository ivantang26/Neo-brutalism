"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { setCurrency, toCurrency, useCurrency } from "@/lib/currency";
import { COMPARISON, CURRENCIES, CURRENCY_META, PLANS, type Currency } from "@/lib/pricing";
import { signupHref, type Billing } from "@/lib/site";
import { IconCheck, IconCross } from "./Icons";
import { Price } from "./Price";

/** FR-1: billing (and currency) live in the URL hash, e.g. #billing=annual&currency=usd */
function readHash(): { billing: Billing | null; currency: Currency | null } {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const billing = params.get("billing");
  return {
    billing: billing === "annual" || billing === "monthly" ? billing : null,
    currency: toCurrency(params.get("currency")),
  };
}

function writeHash(billing: Billing, currency: Currency) {
  const hash = `#billing=${billing}&currency=${currency.toLowerCase()}`;
  if (window.location.hash !== hash) history.replaceState(null, "", hash);
}

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-grid h-8 w-8 place-items-center rounded-full border-[3px] border-ink bg-green">
        <IconCheck size={16} />
        <span className="sr-only">Included</span>
      </span>
    );
  if (value === false)
    return (
      <span className="inline-grid h-8 w-8 place-items-center">
        <IconCross size={16} />
        <span className="sr-only">Not included</span>
      </span>
    );
  return <span className="font-bold">{value}</span>;
}

export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const currency = useCurrency();
  const [hydrated, setHydrated] = useState(false);
  const ids = { billing: useId(), currency: useId() };

  // Read the hash once on load and whenever someone edits it by hand.
  useEffect(() => {
    const apply = () => {
      const fromHash = readHash();
      if (fromHash.billing) setBilling(fromHash.billing);
      if (fromHash.currency) setCurrency(fromHash.currency);
    };
    apply();
    setHydrated(true);
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    if (hydrated) writeHash(billing, currency);
  }, [billing, currency, hydrated]);

  const changeBilling = (next: Billing) => {
    setBilling(next);
    track("Pricing Toggle", { billing: next });
  };
  const changeCurrency = (next: Currency) => {
    setCurrency(next);
    track("Currency Switch", { currency: next });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-8">
        <fieldset className="nb-segmented" aria-describedby={`${ids.billing}-note`}>
          <legend className="sr-only">Billing period</legend>
          {(["monthly", "annual"] as const).map((b) => (
            <span key={b} className="contents">
              <input
                type="radio"
                id={`${ids.billing}-${b}`}
                name={`${ids.billing}-billing`}
                value={b}
                checked={billing === b}
                onChange={() => changeBilling(b)}
              />
              <label htmlFor={`${ids.billing}-${b}`}>
                {b === "monthly" ? "Monthly" : "Annual"}
                {b === "annual" ? <span className="nb-badge nb-badge--green !text-[0.6875rem]">2 months free</span> : null}
              </label>
            </span>
          ))}
        </fieldset>
        <p id={`${ids.billing}-note`} className="sr-only">
          Annual billing charges 10 months and gives you 2 months free.
        </p>

        <fieldset className="nb-segmented">
          <legend className="sr-only">Currency</legend>
          {CURRENCIES.map((c) => (
            <span key={c} className="contents">
              <input
                type="radio"
                id={`${ids.currency}-${c}`}
                name={`${ids.currency}-currency`}
                value={c}
                checked={currency === c}
                onChange={() => changeCurrency(c)}
              />
              <label htmlFor={`${ids.currency}-${c}`}>
                <span aria-hidden="true">{CURRENCY_META[c].symbol}</span> {c}
              </label>
            </span>
          ))}
        </fieldset>
      </div>

      <p role="status" className="sr-only">
        {hydrated ? `Showing ${billing} prices in ${currency}.` : ""}
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
        {PLANS.map((plan) => (
          <li key={plan.id}>
            <article
              aria-labelledby={`plan-${plan.id}`}
              className={`nb-card nb-card--${plan.colour} flex h-full flex-col gap-5 md:!p-5 lg:!p-7`}
            >
              <div className="flex min-h-[34px] flex-wrap items-center justify-between gap-2">
                <h2 id={`plan-${plan.id}`} className="nb-h3">
                  {plan.name}
                </h2>
                {billing === "annual" && plan.id !== "free" ? (
                  <span className="nb-badge nb-badge--green">2 months free</span>
                ) : plan.popular ? (
                  <span className="nb-badge nb-badge--yellow">Most popular</span>
                ) : null}
              </div>
              <p>{plan.blurb}</p>
              <Price plan={plan.id} billing={billing} />
              <a
                href={signupHref({ plan: plan.id, placement: "pricing-card", billing })}
                className={`nb-btn nb-btn--block ${plan.id === "free" ? "nb-btn--white" : ""}`}
                data-track="Signup Click"
                data-track-plan={plan.id}
                data-track-placement="pricing-card"
              >
                Start free<span className="sr-only"> on {plan.name}</span>
              </a>
              <ul className="grid gap-2.5 border-t-[3px] border-ink pt-5">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <IconCheck size={20} className="mt-[3px] flex-none" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-[0.9375rem]">
        Paid plans start with a 14-day free trial, no card needed. Prices include VAT where it applies.
      </p>

      <ComparisonTable />
    </>
  );
}

function ComparisonTable() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(false);

  const update = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    setHint(el.scrollWidth > el.clientWidth + 2 && el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = wrapRef.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <section aria-labelledby="compare-title" className="mt-20 md:mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="compare-title" className="nb-h2">
          Compare plans
        </h2>
        {/* Visible scroll hint while the table overflows its outline */}
        <p className={`nb-badge nb-badge--yellow ${hint ? "" : "invisible"}`} aria-hidden="true">
          Scroll for more →
        </p>
      </div>
      <div
        ref={wrapRef}
        className="nb-table-wrap mt-6"
        role="region"
        aria-labelledby="compare-title"
        tabIndex={0}
      >
        <table className="nb-table">
          <thead>
            <tr>
              <th scope="col" className="is-sticky w-[38%] max-md:w-[9.5rem]">
                Feature
              </th>
              {PLANS.map((p) => (
                <th key={p.id} scope="col" className="w-[20.66%] max-md:w-[8.5rem]">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          {COMPARISON.map((group) => (
            <tbody key={group.group}>
              <tr className="is-group">
                <th scope="colgroup" colSpan={4} className="is-sticky">
                  {group.group}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="is-sticky">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i}>
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
}

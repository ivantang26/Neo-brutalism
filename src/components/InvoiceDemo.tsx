"use client";

import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { useCurrency } from "@/lib/currency";
import { CURRENCIES, formatMoney, type Currency } from "@/lib/pricing";
import { signupHref } from "@/lib/site";
import { IconWarn } from "./Icons";

const MAX_AMOUNT = 1_000_000_000;

/** Accepts "1250", "1,250.50", "£1 250" — returns null when it isn't a usable amount. */
function parseAmount(raw: string): number | null {
  const cleaned = raw.replace(/[£$€\s,]/g, "");
  if (cleaned === "") return null;
  if (!/^\d+(\.\d{0,2})?$/.test(cleaned)) return NaN;
  const n = Number(cleaned);
  return n > MAX_AMOUNT ? NaN : n;
}

/**
 * FR-4: type a client and an amount, see the invoice update live.
 * Nothing is stored — state lives in this component and disappears on reload.
 */
export function InvoiceDemo() {
  const ids = { client: useId(), amount: useId(), what: useId(), currency: useId(), due: useId(), error: useId() };
  const storeCurrency = useCurrency();
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [client, setClient] = useState("");
  const [amountRaw, setAmountRaw] = useState("");
  const [what, setWhat] = useState("");
  const [dueDays, setDueDays] = useState(14);
  const [today, setToday] = useState<Date | null>(null);
  const tracked = useRef(false);

  // Dates depend on the visitor's clock, so compute them after hydration.
  useEffect(() => setToday(new Date()), []);

  const activeCurrency = currency ?? storeCurrency;
  const amount = parseAmount(amountRaw);
  const invalid = Number.isNaN(amount);
  const total = amount !== null && !invalid ? amount : null;

  const onInput = () => {
    if (tracked.current) return;
    tracked.current = true;
    track("Demo Used");
  };

  const fmtDate = (d: Date) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(d);
  const due = today ? new Date(today.getTime() + dueDays * 86_400_000) : null;

  return (
    <section aria-labelledby="demo-title" className="nb-section border-y-[3px] border-ink bg-white">
      <div className="nb-container grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div>
          <p className="nb-label">Try it — no sign-up</p>
          <h2 id="demo-title" className="nb-h2 mt-3">
            Make an invoice in ten seconds.
          </h2>
          <p className="mt-4 max-w-[44ch]">
            Type a client and an amount. The preview is the real layout your clients receive. Nothing you type is
            stored or sent anywhere.
          </p>

          <form className="mt-8 grid gap-5" onSubmit={(e) => e.preventDefault()} onInput={onInput} noValidate>
            <div className="nb-field">
              <label htmlFor={ids.client} className="nb-label">
                Client name
              </label>
              <input
                id={ids.client}
                className="nb-input"
                autoComplete="off"
                placeholder="e.g. Northwind Coffee"
                maxLength={60}
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-[1fr_9.5rem]">
              <div className="nb-field">
                <label htmlFor={ids.amount} className="nb-label">
                  Amount
                </label>
                <input
                  id={ids.amount}
                  className="nb-input font-mono"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="1,250.00"
                  maxLength={16}
                  value={amountRaw}
                  aria-invalid={invalid || undefined}
                  aria-describedby={invalid ? ids.error : undefined}
                  onChange={(e) => setAmountRaw(e.target.value)}
                />
              </div>
              <div className="nb-field">
                <label htmlFor={ids.currency} className="nb-label">
                  Currency
                </label>
                <select
                  id={ids.currency}
                  className="nb-input"
                  value={activeCurrency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {invalid ? (
              <p id={ids.error} className="nb-error -mt-2" role="alert">
                <IconWarn size={18} className="flex-none translate-y-[3px]" />
                Numbers only, like 1250 or 1,250.50.
              </p>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-[1fr_9.5rem]">
              <div className="nb-field">
                <label htmlFor={ids.what} className="nb-label">
                  What it&rsquo;s for <span className="normal-case">(optional)</span>
                </label>
                <input
                  id={ids.what}
                  className="nb-input"
                  autoComplete="off"
                  placeholder="Brand identity, phase 1"
                  maxLength={60}
                  value={what}
                  onChange={(e) => setWhat(e.target.value)}
                />
              </div>
              <div className="nb-field">
                <label htmlFor={ids.due} className="nb-label">
                  Due in
                </label>
                <select
                  id={ids.due}
                  className="nb-input"
                  value={dueDays}
                  onChange={(e) => setDueDays(Number(e.target.value))}
                >
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-28">
          <section
            aria-label="Invoice preview"
            className="nb-card nb-card--static nb-card--flush overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-ink bg-pink px-5 py-4 sm:px-7">
              <div>
                <p className="font-display text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-none">Invoice</p>
                <p className="nb-label mt-1">INV-0043</p>
              </div>
              <span className="nb-badge nb-badge--white">Draft</span>
            </div>

            <div className="grid gap-6 p-5 sm:p-7">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <dt className="nb-label">Bill to</dt>
                  <dd className="mt-1 break-words font-bold">{client.trim() || "Your client"}</dd>
                </div>
                <div>
                  <dt className="nb-label">Due</dt>
                  <dd className="mt-1 font-bold">{due ? fmtDate(due) : `In ${dueDays} days`}</dd>
                </div>
                <div>
                  <dt className="nb-label">From</dt>
                  <dd className="mt-1">You, via Stackd</dd>
                </div>
                <div>
                  <dt className="nb-label">Issued</dt>
                  <dd className="mt-1">{today ? fmtDate(today) : "Today"}</dd>
                </div>
              </dl>

              <table className="w-full border-[3px] border-ink text-left">
                <thead>
                  <tr className="bg-yellow">
                    <th scope="col" className="nb-label border-b-[3px] border-ink px-3 py-2.5">
                      Description
                    </th>
                    <th scope="col" className="nb-label border-b-[3px] border-l-[3px] border-ink px-3 py-2.5 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="break-words px-3 py-3">{what.trim() || "Design work"}</td>
                    <td className="border-l-[3px] border-ink px-3 py-3 text-right font-mono font-bold whitespace-nowrap">
                      {total !== null ? formatMoney(total, activeCurrency, { cents: true }) : "—"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex flex-wrap items-end justify-between gap-4 border-t-[3px] border-ink pt-5">
                <div>
                  <p className="nb-label">Total due</p>
                  <p className="mt-1 break-all font-display text-[clamp(2rem,1.4rem+2.4vw,3rem)] leading-none">
                    {formatMoney(total ?? 0, activeCurrency, { cents: true })}
                  </p>
                </div>
                <span aria-hidden="true" className="nb-btn nb-btn--green pointer-events-none">
                  Pay now
                </span>
              </div>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={signupHref({ placement: "invoice-demo" })}
              className="nb-btn nb-btn--lg"
              data-track="Signup Click"
              data-track-placement="invoice-demo"
            >
              Send one for real
            </a>
            <p className="text-[0.9375rem]">Free for 14 days. No card needed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

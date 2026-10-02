import type { Billing, PlanId } from "./site";

export const CURRENCIES = ["GBP", "USD", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_META: Record<Currency, { symbol: string; locale: string }> = {
  GBP: { symbol: "£", locale: "en-GB" },
  USD: { symbol: "$", locale: "en-US" },
  EUR: { symbol: "€", locale: "en-IE" },
};

/** Monthly list prices, set per currency rather than FX-converted. Annual = 10 × monthly ("2 months free"). */
export const MONTHLY_PRICE: Record<PlanId, Record<Currency, number>> = {
  free: { GBP: 0, USD: 0, EUR: 0 },
  solo: { GBP: 9, USD: 11, EUR: 10 },
  studio: { GBP: 24, USD: 29, EUR: 27 },
};

export const ANNUAL_MONTHS_CHARGED = 10;

export function formatMoney(amount: number, currency: Currency, opts: { cents?: boolean } = {}) {
  const whole = Number.isInteger(amount) && !opts.cents;
  return new Intl.NumberFormat(CURRENCY_META[currency].locale, {
    style: "currency",
    currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(amount);
}

export function priceFor(plan: PlanId, currency: Currency, billing: Billing) {
  const monthly = MONTHLY_PRICE[plan][currency];
  if (billing === "monthly") return { headline: monthly, per: "mo" as const, perMonth: monthly };
  const yearly = monthly * ANNUAL_MONTHS_CHARGED;
  return { headline: yearly, per: "yr" as const, perMonth: Math.round((yearly / 12) * 100) / 100 };
}

export type Plan = {
  id: PlanId;
  name: string;
  blurb: string;
  colour: "white" | "blue" | "pink";
  popular?: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    blurb: "For your first few clients. Free for as long as you like.",
    colour: "white",
    features: ["3 active clients", "5 invoices a month", "Card payments via Stripe", "PDF and CSV export"],
  },
  {
    id: "solo",
    name: "Solo",
    blurb: "Everything one person needs to get paid on time.",
    colour: "blue",
    features: [
      "Unlimited clients and invoices",
      "Automatic payment reminders",
      "Client portal",
      "Stripe, PayPal and Wise",
      "Xero sync",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    blurb: "For studios of 2–5 people sharing clients and cash flow.",
    colour: "pink",
    popular: true,
    features: [
      "Everything in Solo",
      "5 team seats",
      "Branded client portal",
      "Approval before sending",
      "Priority support, 4-hour reply",
    ],
  },
];

type Cell = boolean | string;
export const COMPARISON: { group: string; rows: { label: string; values: [Cell, Cell, Cell] }[] }[] = [
  {
    group: "Invoicing",
    rows: [
      { label: "Active clients", values: ["3", "Unlimited", "Unlimited"] },
      { label: "Invoices per month", values: ["5", "Unlimited", "Unlimited"] },
      { label: "Recurring invoices", values: [false, true, true] },
      { label: "30 currencies", values: [true, true, true] },
      { label: "VAT and sales tax lines", values: [true, true, true] },
    ],
  },
  {
    group: "Getting paid",
    rows: [
      { label: "Stripe card payments", values: [true, true, true] },
      { label: "PayPal and Wise", values: [false, true, true] },
      { label: "Automatic reminders", values: [false, true, true] },
      { label: "Late fees", values: [false, true, true] },
    ],
  },
  {
    group: "Clients and team",
    rows: [
      { label: "Client portal", values: [false, true, true] },
      { label: "Portal branding", values: [false, "Logo", "Logo, colours, domain"] },
      { label: "Team seats", values: ["1", "1", "5"] },
      { label: "Approval before sending", values: [false, false, true] },
    ],
  },
  {
    group: "Data",
    rows: [
      { label: "PDF and CSV export", values: [true, true, true] },
      { label: "Xero sync", values: [false, true, true] },
      { label: "Full account export (JSON)", values: [true, true, true] },
      { label: "Support", values: ["Email, 2 days", "Email, 1 day", "Priority, 4 hours"] },
    ],
  },
];

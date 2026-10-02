export const SITE = {
  name: "Stackd",
  url: "https://stackd.example",
  tagline: "Invoicing that doesn't feel like accounting.",
  description:
    "Stackd is invoicing for freelancers and one-person studios: quick invoices, automatic reminders and a client portal. Free for 14 days.",
  appUrl: "https://app.stackd.example",
  /** Sticker and trial copy. Depends on open question #1 (permanent free plan vs. trial). */
  trialDays: 14,
} as const;

export const NAV = [
  { href: "/features/", label: "Features" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/changelog/", label: "Changelog" },
] as const;

export type PlanId = "free" | "solo" | "studio";
export type Billing = "monthly" | "annual";

/**
 * FR-5: every sign-up link carries the plan and UTM parameters.
 * `plan` goes first so it reads cleanly: /signup?plan=studio&utm_…
 */
export function signupHref({
  plan,
  placement,
  billing,
}: {
  plan?: PlanId;
  placement: string;
  billing?: Billing;
}) {
  const params = new URLSearchParams();
  if (plan) params.set("plan", plan);
  if (billing && plan && plan !== "free") params.set("billing", billing);
  params.set("utm_source", "stackd-site");
  params.set("utm_medium", "website");
  params.set("utm_campaign", "v1");
  params.set("utm_content", placement);
  return `${SITE.appUrl}/signup?${params.toString()}`;
}

export const loginHref = `${SITE.appUrl}/login`;

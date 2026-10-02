import type { Metadata } from "next";
import { CtaBlock } from "@/components/CtaBlock";
import { Faq } from "@/components/Faq";
import { PricingPlans } from "@/components/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free, Solo (£9) and Studio (£24). Annual billing gives you two months free. Prices in GBP, USD or EUR.",
};

const PRICING_FAQ = [
  {
    q: "How does the 14-day trial work?",
    a: "Every paid plan starts with 14 days free and no card. On day 14 you pick a plan, or your account moves to Free and keeps all its data.",
  },
  {
    q: "What does “2 months free” mean exactly?",
    a: "Annual plans cost 10 times the monthly price and cover 12 months. Solo is £90 a year instead of £108.",
  },
  {
    q: "Can I switch plans or cancel?",
    a: "Yes, any time from Settings. Upgrades apply immediately and are prorated. If you cancel an annual plan in the first 30 days we refund it in full.",
  },
  {
    q: "Which currency will I be charged in?",
    a: "The one you choose at checkout: GBP, USD or EUR. We pick a default from your browser's language, and you can change it above. Your invoices can use any of 30 currencies on every plan.",
  },
  {
    q: "Do you charge fees on payments?",
    a: "No. Stripe, PayPal and Wise charge their own standard processing fees; Stackd adds nothing on top.",
  },
  {
    q: "Is VAT included?",
    a: "Prices include UK VAT for UK customers. EU businesses with a valid VAT number are charged under reverse charge.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section aria-labelledby="pricing-title" className="nb-section !pt-12 md:!pt-20">
        <div className="nb-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="nb-label">Pricing</p>
            <h1 id="pricing-title" className="nb-display mt-4 !text-[clamp(2.75rem,1.4rem+4.6vw,5.5rem)]">
              Simple prices. <span className="nb-mark [--mark:var(--yellow)]">Loud</span> invoices.
            </h1>
            <p className="nb-lede mx-auto mt-6">Start free. Upgrade when the reminders have paid for themselves.</p>
          </div>
          <div className="mt-10 md:mt-14">
            <PricingPlans />
          </div>
        </div>
      </section>
      <Faq items={PRICING_FAQ} id="pricing-faq" title="Billing, without the small print." />
      <CtaBlock placement="pricing-final" title="Try every feature free for 14 days." />
    </>
  );
}

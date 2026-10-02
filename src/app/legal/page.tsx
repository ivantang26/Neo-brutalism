import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal",
  description: "Stackd terms, privacy and cookies, in plain English.",
};

const SECTIONS = [
  {
    id: "terms",
    title: "Terms",
    body: [
      "Stackd is a fictional product built as a design portfolio piece. These terms show how we would write them: short and plain.",
      "You own your data. You can export it or delete your account at any time from Settings, and deletion is complete within 30 days, including backups.",
      "Paid plans renew until you cancel. Annual plans cancelled within 30 days are refunded in full; after that they run to the end of the paid year.",
      "Payments to you are processed by Stripe, PayPal or Wise under their own terms. Stackd never holds your money.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: [
      "We collect what we need to run the service: your account details, your clients' names and emails, and the invoices you create.",
      "We don't sell data, and we don't use your clients' details for anything but sending your invoices and reminders.",
      "Data is stored in the EU (Frankfurt), encrypted in transit and at rest. Our sub-processors are our hosting provider, email delivery provider and the payment processors you connect.",
      "To ask what we hold about you, or to have it corrected or deleted, email privacy@stackd.example.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "This website sets no cookies. Visit statistics use a privacy-friendly analytics tool that doesn't use cookies or track you across sites.",
      "The pricing page remembers your currency choice in your browser's local storage. Clear it whenever you like; nothing is sent to us.",
      "The Stackd app uses one essential cookie to keep you signed in.",
    ],
  },
];

export default function LegalPage() {
  return (
    <section aria-labelledby="legal-title" className="nb-section !pt-12 md:!pt-20">
      <div className="nb-container max-w-[calc(780px+var(--gutter)*2)]">
        <p className="nb-label">Legal</p>
        <h1 id="legal-title" className="nb-display mt-4 !text-[clamp(2.75rem,1.4rem+4.6vw,5.5rem)]">
          The small print, made big.
        </h1>
        <p className="nb-lede mt-6">Last updated 1 October 2026.</p>
        <nav aria-label="Legal sections" className="mt-8">
          <ul className="flex flex-wrap gap-3">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="nb-btn nb-btn--white nb-btn--sm">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-12 grid gap-8">
          {SECTIONS.map((s) => (
            <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="nb-card nb-card--static md:!p-8">
              <h2 id={`${s.id}-title`} className="nb-h3">
                {s.title}
              </h2>
              <div className="nb-prose mt-4">
                <ul>
                  {s.body.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

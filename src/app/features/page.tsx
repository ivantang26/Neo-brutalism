import type { Metadata } from "next";
import { CtaBlock } from "@/components/CtaBlock";
import { IconBell, IconBolt, IconCard, IconCheck, IconDownload, IconLock, IconPortal } from "@/components/Icons";
import { Tabs } from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Quick invoices, automatic payment reminders and a client portal. Stripe, PayPal, Wise and Xero built in; clean CSV and PDF exports.",
};

function InvoiceMock() {
  return (
    <div role="img" aria-label="Invoice editor with two line items, 20% VAT and a total of £1,440." className="nb-card nb-card--static nb-card--flush overflow-hidden">
      <div className="flex items-center justify-between border-b-[3px] border-ink bg-white px-5 py-3">
        <span className="font-display">INV-0044</span>
        <span className="nb-badge nb-badge--yellow">Ready to send</span>
      </div>
      <div className="grid gap-0 bg-white">
        {[
          ["Logo design", "£800.00"],
          ["Brand guidelines", "£400.00"],
          ["VAT 20%", "£240.00"],
        ].map(([label, amount]) => (
          <div key={label} className="flex justify-between border-b-[3px] border-ink px-5 py-3">
            <span>{label}</span>
            <span className="font-mono font-bold">{amount}</span>
          </div>
        ))}
        <div className="flex items-end justify-between bg-yellow px-5 py-4">
          <span className="nb-label">Total</span>
          <span className="font-display text-3xl leading-none">£1,440</span>
        </div>
      </div>
    </div>
  );
}

function RemindersMock() {
  const rows = [
    { when: "3 days before", subject: "Friendly heads-up: INV-0040 is due Friday", state: "Sent", colour: "white" },
    { when: "On the day", subject: "INV-0040 is due today", state: "Sent", colour: "white" },
    { when: "7 days after", subject: "Following up on INV-0040", state: "Paid — cancelled", colour: "green" },
  ];
  return (
    <div role="img" aria-label="Reminder timeline: two reminders sent, the third cancelled automatically because the invoice was paid." className="grid gap-3">
      {rows.map((r) => (
        <div key={r.when} className={`nb-card nb-card--static !p-4 ${r.colour === "green" ? "nb-card--green" : ""}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="nb-label">{r.when}</span>
            <span className="nb-badge nb-badge--white !text-[0.6875rem]">{r.state}</span>
          </div>
          <p className="mt-2 font-bold">{r.subject}</p>
        </div>
      ))}
    </div>
  );
}

function PortalMock() {
  return (
    <div role="img" aria-label="Client portal for Folio Press showing one open invoice with a pay button and two paid receipts." className="nb-card nb-card--static nb-card--flush nb-window">
      <div className="nb-window__bar">
        <span className="nb-window__dot" />
        <span className="nb-window__dot" />
        <span className="nb-window__url">pay.yourstudio.com/folio-press</span>
      </div>
      <div className="grid gap-4 bg-cream p-5">
        <p className="font-display text-2xl">Hi, Folio Press</p>
        <div className="flex items-center justify-between gap-3 border-[3px] border-ink bg-white p-4">
          <div>
            <p className="nb-label">INV-0041 · due 9 Oct</p>
            <p className="font-display text-2xl">£860.00</p>
          </div>
          <span className="nb-btn nb-btn--green nb-btn--sm pointer-events-none">Pay</span>
        </div>
        {["INV-0035 · £1,200.00", "INV-0029 · £640.00"].map((r) => (
          <div key={r} className="flex items-center justify-between border-[3px] border-ink bg-white px-4 py-3">
            <span className="font-mono text-sm font-bold">{r}</span>
            <span className="nb-badge nb-badge--green !text-[0.6875rem]">Paid</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SECTIONS = [
  {
    id: "quick-invoices",
    label: "Quick invoices",
    Icon: IconBolt,
    colour: "pink",
    title: "An invoice in under a minute.",
    body: "Pick a client and Stackd fills in their address, currency and tax rate. Add lines, press send. Your client gets a tidy PDF and a pay button in the same email.",
    points: [
      "VAT and sales tax worked out per line, rounded the way HMRC expects",
      "Recurring invoices for retainers, sent on the day you choose",
      "30 currencies, with the exchange rate fixed and printed when you send",
      "Duplicate last month's invoice with the dates already moved on",
    ],
    Mock: InvoiceMock,
  },
  {
    id: "reminders",
    label: "Automatic reminders",
    Icon: IconBell,
    colour: "blue",
    title: "Chasing, without the awkward bit.",
    body: "Set a schedule once. Polite reminders go out before, on and after the due date, from your own name, and stop the moment the invoice is paid.",
    points: [
      "Default schedule: 3 days before, on the day, 7 and 14 days after",
      "Edit the wording, or pause reminders for one client",
      "Optional late fee, fixed or percentage, added only after the date you set",
      "Replies land in your inbox, not ours",
    ],
    Mock: RemindersMock,
  },
  {
    id: "client-portal",
    label: "Client portal",
    Icon: IconPortal,
    colour: "green",
    title: "One link. Every invoice.",
    body: "Each client gets a private page with their open invoices, receipts and quotes. They pay, download PDFs and update their own billing details.",
    points: [
      "Magic-link sign-in for clients, no password to forget",
      "Pay by card, PayPal or bank transfer from the same page",
      "Studio plan: your logo, colours and your own domain",
      "You see when a client has opened an invoice",
    ],
    Mock: PortalMock,
  },
] as const;

const SECURITY = [
  {
    Icon: IconCard,
    title: "We never see card numbers",
    body: "Payments run on Stripe, PayPal or Wise. Card and bank details go straight to them; Stackd only receives a paid or failed status.",
  },
  {
    Icon: IconLock,
    title: "Encrypted, in the EU",
    body: "TLS 1.2+ in transit, AES-256 at rest, hosted in Frankfurt. Two-factor sign-in is available on every plan and required for Studio admins.",
  },
  {
    Icon: IconDownload,
    title: "Your data leaves when you do",
    body: "Export invoices as PDF, payments and lines as CSV, or the whole account as JSON. No support ticket, no waiting.",
  },
  {
    Icon: IconCheck,
    title: "Backups you don't think about",
    body: "Encrypted backups every hour, kept for 30 days in a separate region. We publish incidents on our status page within one hour.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section aria-labelledby="features-hero" className="nb-section !pb-10 !pt-12 md:!pt-20">
        <div className="nb-container">
          <p className="nb-label">Features</p>
          <h1 id="features-hero" className="nb-display mt-4 max-w-[14ch] !text-[clamp(2.75rem,1.4rem+4.6vw,5.5rem)]">
            Three things, done <span className="nb-mark [--mark:var(--green)]">properly</span>.
          </h1>
          <p className="nb-lede mt-6">
            Stackd doesn&rsquo;t do payroll, inventory or double-entry. It sends invoices, chases them, and gives clients
            somewhere to pay.
          </p>
          <nav aria-label="On this page" className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={`nb-btn nb-btn--sm nb-btn--${s.colour === "blue" ? "white" : s.colour}`}>
                    <s.Icon size={18} />
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#security" className="nb-btn nb-btn--sm nb-btn--white">
                  <IconLock size={18} />
                  Security
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {SECTIONS.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className={`border-t-[3px] border-ink ${i % 2 === 0 ? "bg-white" : "bg-cream"}`}
        >
          <div className="nb-container grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-20">
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <span className="nb-badge" style={{ "--badge-bg": `var(--${s.colour})` } as React.CSSProperties}>
                <s.Icon size={14} /> {s.label}
              </span>
              <h2 id={`${s.id}-title`} className="nb-h2 mt-5">
                {s.title}
              </h2>
              <p className="mt-5 max-w-[48ch]">{s.body}</p>
              <ul className="mt-6 grid gap-3">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-[3px] grid h-6 w-6 flex-none place-items-center rounded-full border-[3px] border-ink bg-yellow">
                      <IconCheck size={12} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-[var(--radius)] border-[3px] border-ink p-5 sm:p-8 md:p-10 ${i % 2 === 1 ? "lg:order-1" : ""}`} style={{ background: `var(--${s.colour})` }}>
              <s.Mock />
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="integrations-title" className="nb-section border-t-[3px] border-ink">
        <div className="nb-container">
          <p className="nb-label">Integrations</p>
          <h2 id="integrations-title" className="nb-h2 mt-3 max-w-2xl">
            Plays nicely with the tools you already pay for.
          </h2>
          <div className="mt-10">
            <Tabs
              label="Integrations"
              tabs={[
                {
                  id: "payments",
                  label: "Payments",
                  content: (
                    <div className="grid gap-6 md:grid-cols-3">
                      {[
                        ["Stripe", "Cards, Apple Pay and Google Pay. Connect in two clicks; payouts follow your Stripe schedule."],
                        ["PayPal", "For clients who live in PayPal. Paid invoices are matched automatically."],
                        ["Wise", "Local bank transfers in 30 currencies, at the mid-market rate."],
                      ].map(([name, body]) => (
                        <div key={name}>
                          <h3 className="nb-h3">{name}</h3>
                          <p className="mt-2">{body}</p>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "accounting",
                  label: "Accounting",
                  content: (
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="nb-h3">Xero</h3>
                        <p className="mt-2">
                          Paid invoices sync within five minutes, matched to the right contact, account code and tax type.
                          Available on Solo and Studio.
                        </p>
                      </div>
                      <div>
                        <h3 className="nb-h3">Everything else</h3>
                        <p className="mt-2">
                          QuickBooks, FreeAgent and spreadsheets import our CSV directly. Column names match what
                          accountants expect.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "exports",
                  label: "Exports",
                  content: (
                    <div>
                      <p className="max-w-[60ch]">
                        Every plan, any time, no request needed. This is the CSV your accountant gets:
                      </p>
                      <div className="nb-table-wrap mt-5 !shadow-none" role="region" aria-label="Example CSV export" tabIndex={0}>
                        <table className="nb-table !min-w-[560px] font-mono text-sm">
                          <thead>
                            <tr>
                              {["invoice", "client", "date", "net", "tax", "currency"].map((h) => (
                                <th key={h} scope="col">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ["INV-0042", "Northwind Coffee", "2026-09-28", "1041.67", "208.33", "GBP"],
                              ["INV-0041", "Folio Press", "2026-09-25", "716.67", "143.33", "GBP"],
                            ].map((row) => (
                              <tr key={row[0]}>
                                {row.map((c, i) => (
                                  <td key={i}>{c}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section id="security" aria-labelledby="security-title" className="nb-section border-t-[3px] border-ink bg-white">
        <div className="nb-container">
          <p className="nb-label">Security</p>
          <h2 id="security-title" className="nb-h2 mt-3 max-w-2xl">
            Loud design. Boring security.
          </h2>
          <p className="mt-5 max-w-[56ch]">
            It&rsquo;s your income, so here is exactly what we do with it, in plain words.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            {SECURITY.map((item) => (
              <li key={item.title} className="nb-card nb-card--static flex gap-5">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-[var(--radius)] border-[3px] border-ink bg-yellow">
                  <item.Icon size={24} />
                </span>
                <div>
                  <h3 className="nb-h3">{item.title}</h3>
                  <p className="mt-2">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBlock placement="features-final" title="See it on your own invoices." />
    </>
  );
}

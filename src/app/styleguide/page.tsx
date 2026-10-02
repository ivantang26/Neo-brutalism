import type { Metadata } from "next";
import { IconArrowRight, IconCheck, IconCross, IconMenu, IconWarn } from "@/components/Icons";
import { Marquee } from "@/components/Marquee";
import { Sticker } from "@/components/Sticker";
import { Tabs } from "@/components/Tabs";

// Hidden page: not linked anywhere and kept out of search engines.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const COLOURS = [
  { token: "--ink", hex: "#000000", use: "Outlines, shadows, text", ratio: "—" },
  { token: "--cream", hex: "#FFF4E0", use: "Page background", ratio: "19.3:1" },
  { token: "--yellow", hex: "#FFD23F", use: "Primary buttons, highlights", ratio: "14.5:1" },
  { token: "--pink", hex: "#FF6B9D", use: "Feature card 1, badges", ratio: "7.8:1" },
  { token: "--blue", hex: "#4D9DE0", use: "Feature card 2, link hover, focus", ratio: "7.2:1" },
  { token: "--green", hex: "#3BCEAC", use: "Success, feature card 3", ratio: "10.6:1" },
  { token: "--white", hex: "#FFFFFF", use: "Card and input fills", ratio: "21:1" },
];

function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t-[3px] border-ink py-14 md:py-20">
      <h2 id={`${id}-title`} className="nb-h2">
        {title}
      </h2>
      {note ? <p className="mt-3 max-w-[64ch]">{note}</p> : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function State({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid justify-items-start gap-3">
      <span className="nb-label">{label}</span>
      {children}
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="nb-container pb-10 pt-12 md:pt-20">
      <span className="nb-badge nb-badge--yellow">Internal · not indexed</span>
      <h1 className="nb-display mt-5 !text-[clamp(2.75rem,1.4rem+4.6vw,5.5rem)]">Styleguide</h1>
      <p className="nb-lede mt-5">
        Every Stackd component in every state. Classes live in <code className="font-mono">globals.css</code>; tokens are
        CSS custom properties on <code className="font-mono">:root</code>, mirrored into the Tailwind theme.
      </p>

      <nav aria-label="Styleguide sections" className="mt-8">
        <ul className="flex flex-wrap gap-2">
          {["colour", "type", "shape", "buttons", "cards", "inputs", "badges", "tables", "tabs", "accordion", "stickers", "marquee"].map(
            (id) => (
              <li key={id}>
                <a href={`#${id}`} className="nb-badge nb-badge--white">
                  {id}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="mt-14">
        <Section id="colour" title="Colour" note="Text is always black. Colour only ever appears as a flat fill inside a black outline; contrast is black text on that fill.">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COLOURS.map((c) => (
              <li key={c.token} className="nb-card nb-card--static nb-card--flush overflow-hidden">
                <div className="h-24 border-b-[3px] border-ink" style={{ background: `var(${c.token})` }} />
                <div className="p-4">
                  <p className="font-mono font-bold">{c.token}</p>
                  <p className="text-[0.9375rem]">
                    {c.hex} · {c.use}
                  </p>
                  <p className="nb-label mt-2">Black text: {c.ratio}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="type" title="Type">
          <div className="grid gap-8">
            <State label="Display · Archivo Black · 44 → 104px">
              <p className="nb-display">Get paid.</p>
            </State>
            <State label="H2 · Archivo Black · 30 → 56px · line-height 1.0">
              <p className="nb-h2">Three jobs. Done properly.</p>
            </State>
            <State label="H3 · Archivo Black · 22 → 28px">
              <p className="nb-h3">Automatic reminders</p>
            </State>
            <State label="Body · Space Grotesk 500 · 17 → 19px · line-height 1.5">
              <p className="max-w-[60ch]">
                Polite nudges go out before, on and after the due date, from your name. They stop the second you&rsquo;re
                paid.
              </p>
            </State>
            <State label="Label · Space Mono 700 · 13 → 14px · uppercase · +0.04em">
              <p className="nb-label">Paid this month</p>
            </State>
            <State label="Highlight">
              <p className="nb-h2">
                Skip the <span className="nb-mark">boring</span> bit.
              </p>
            </State>
          </div>
        </Section>

        <Section
          id="shape"
          title="Shape"
          note="3px outlines everywhere (2px on mobile inputs). Hard shadows, never blurred: cards 4/5/6px and buttons 3/4/4px at mobile/tablet/desktop. Radius is 12px for cards and buttons, 0 for tables and inputs."
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="nb-card nb-card--static">
              <p className="nb-label">Card shadow</p>
              <p className="mt-2 font-mono font-bold">var(--sh-card)</p>
            </div>
            <div className="nb-card nb-card--static nb-card--yellow">
              <p className="nb-label">Lifted (hover)</p>
              <p className="mt-2 font-mono font-bold">+2px, 120ms</p>
            </div>
            <div className="border-[3px] border-ink bg-white p-6">
              <p className="nb-label">Radius 0</p>
              <p className="mt-2 font-mono font-bold">tables, inputs</p>
            </div>
          </div>
        </Section>

        <Section id="buttons" title="Buttons" note="Hover shifts 2px and the shadow shrinks; pressed shifts the full shadow offset and the shadow disappears (80ms ease-out). Keyboard Space/Enter shows the pressed state too.">
          <div className="grid gap-10">
            <div className="flex flex-wrap items-end gap-8">
              <State label="Default">
                <button type="button" className="nb-btn">Start free</button>
              </State>
              <State label="Hover">
                <button type="button" className="nb-btn is-hover" tabIndex={-1}>Start free</button>
              </State>
              <State label="Pressed">
                <button type="button" className="nb-btn is-pressed" tabIndex={-1}>Start free</button>
              </State>
              <State label="Focus">
                <button type="button" className="nb-btn outline-[3px] outline-offset-4 outline-blue outline-dashed" tabIndex={-1}>
                  Start free
                </button>
              </State>
              <State label="Disabled">
                <button type="button" className="nb-btn" disabled>Start free</button>
              </State>
            </div>
            <div className="flex flex-wrap items-end gap-8">
              <State label="White">
                <button type="button" className="nb-btn nb-btn--white">Log in</button>
              </State>
              <State label="Pink">
                <button type="button" className="nb-btn nb-btn--pink">Try it</button>
              </State>
              <State label="Green">
                <button type="button" className="nb-btn nb-btn--green">Pay now</button>
              </State>
              <State label="Small">
                <button type="button" className="nb-btn nb-btn--sm">Start free</button>
              </State>
              <State label="Large + icon">
                <button type="button" className="nb-btn nb-btn--lg">
                  Start free <IconArrowRight size={20} />
                </button>
              </State>
            </div>
            <div className="flex flex-wrap items-end gap-8">
              <State label="Icon button">
                <button type="button" className="nb-icon-btn" aria-label="Menu">
                  <IconMenu />
                </button>
              </State>
              <State label="Icon · expanded">
                <button type="button" className="nb-icon-btn" aria-expanded="true" aria-label="Menu, expanded" tabIndex={-1}>
                  <IconMenu />
                </button>
              </State>
              <State label="Icon · disabled">
                <button type="button" className="nb-icon-btn" aria-label="Previous" disabled>
                  <IconArrowRight className="rotate-180" />
                </button>
              </State>
              <State label="Text link">
                <a href="#buttons" className="nb-link">See full pricing</a>
              </State>
              <State label="Text link · hover">
                <a href="#buttons" className="nb-link is-hover" tabIndex={-1}>See full pricing</a>
              </State>
            </div>
          </div>
        </Section>

        <Section id="cards" title="Cards" note="White or colour fill, 3px outline, hard shadow, 24px padding. Cards lift on hover unless marked static.">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(["", "pink", "blue", "green"] as const).map((c) => (
              <div key={c || "white"} className={`nb-card ${c ? `nb-card--${c}` : ""}`}>
                <p className="nb-label">{c || "white"}</p>
                <p className="nb-h3 mt-3">Hover me</p>
                <p className="mt-2">Lifts 2px, shadow grows by 2px.</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div className="nb-card nb-card--yellow is-hover">
              <p className="nb-label">Forced hover state</p>
              <p className="nb-h3 mt-3">Lifted</p>
            </div>
            <div className="nb-card nb-card--static">
              <p className="nb-label">Static (no lift)</p>
              <p className="nb-h3 mt-3">For content that isn&rsquo;t a target</p>
            </div>
          </div>
        </Section>

        <Section id="inputs" title="Inputs" note="Square corners, white fill, 2px outline on mobile and 3px from tablet up. Focus adds the dashed blue ring; errors fill pink and always come with a text message.">
          <div className="grid max-w-3xl gap-8 sm:grid-cols-2">
            <div className="nb-field">
              <label htmlFor="sg-default" className="nb-label">Default</label>
              <input id="sg-default" className="nb-input" placeholder="Client name" />
            </div>
            <div className="nb-field">
              <label htmlFor="sg-filled" className="nb-label">Filled</label>
              <input id="sg-filled" className="nb-input" defaultValue="Northwind Coffee" />
            </div>
            <div className="nb-field">
              <label htmlFor="sg-focus" className="nb-label">Focus</label>
              <input id="sg-focus" className="nb-input is-focus" defaultValue="Folio Pr" />
            </div>
            <div className="nb-field">
              <label htmlFor="sg-error" className="nb-label">Error</label>
              <input id="sg-error" className="nb-input font-mono" defaultValue="12,50.x" aria-invalid="true" aria-describedby="sg-error-msg" />
              <p id="sg-error-msg" className="nb-error">
                <IconWarn size={18} className="flex-none translate-y-[3px]" />
                Numbers only, like 1250 or 1,250.50.
              </p>
            </div>
            <div className="nb-field">
              <label htmlFor="sg-disabled" className="nb-label">Disabled</label>
              <input id="sg-disabled" className="nb-input" defaultValue="Locked on Free" disabled />
            </div>
            <div className="nb-field">
              <label htmlFor="sg-select" className="nb-label">Select</label>
              <select id="sg-select" className="nb-input" defaultValue="14">
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
              </select>
            </div>
            <div className="nb-field sm:col-span-2">
              <label htmlFor="sg-textarea" className="nb-label">Textarea</label>
              <textarea id="sg-textarea" className="nb-input min-h-28" defaultValue="Thanks for your business!" />
              <p className="nb-hint">Shown at the bottom of every invoice.</p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-8">
            <State label="Segmented control">
              <fieldset className="nb-segmented">
                <legend className="sr-only">Billing period example</legend>
                <input type="radio" id="sg-m" name="sg-billing" defaultChecked />
                <label htmlFor="sg-m">Monthly</label>
                <input type="radio" id="sg-a" name="sg-billing" />
                <label htmlFor="sg-a">
                  Annual <span className="nb-badge nb-badge--green !text-[0.6875rem]">2 months free</span>
                </label>
              </fieldset>
            </State>
          </div>
        </Section>

        <Section id="badges" title="Badges" note="Pill with a mono label. Badges carry status, so their text always says the status — colour is a second signal, never the only one.">
          <div className="flex flex-wrap gap-4">
            <span className="nb-badge">New</span>
            <span className="nb-badge nb-badge--yellow">v2.4</span>
            <span className="nb-badge nb-badge--green">Paid</span>
            <span className="nb-badge nb-badge--blue">Sent</span>
            <span className="nb-badge">Overdue</span>
            <span className="nb-badge nb-badge--white">Draft</span>
            <span className="nb-badge nb-badge--cream">Fix</span>
            <a href="#badges" className="nb-badge nb-badge--white">Link badge →</a>
          </div>
        </Section>

        <Section id="tables" title="Tables" note="Square corners, yellow mono header, 3px rules. On narrow screens the table scrolls inside its outline; the first column stays put.">
          <div className="nb-table-wrap" role="region" aria-label="Example table" tabIndex={0}>
            <table className="nb-table">
              <thead>
                <tr>
                  <th scope="col" className="is-sticky">Invoice</th>
                  <th scope="col">Client</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="is-group">
                  <th scope="colgroup" colSpan={4} className="is-sticky">September</th>
                </tr>
                <tr>
                  <th scope="row" className="is-sticky">INV-0042</th>
                  <td>Northwind Coffee</td>
                  <td className="font-mono font-bold">£1,250.00</td>
                  <td>
                    <span className="nb-badge nb-badge--green">Paid</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="is-sticky">INV-0040</th>
                  <td>Kite &amp; Co.</td>
                  <td className="font-mono font-bold">£2,400.00</td>
                  <td>
                    <span className="nb-badge">Overdue</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="is-sticky">Included</th>
                  <td>
                    <span className="inline-grid h-8 w-8 place-items-center rounded-full border-[3px] border-ink bg-green">
                      <IconCheck size={16} />
                    </span>
                  </td>
                  <td>
                    <span className="inline-grid h-8 w-8 place-items-center">
                      <IconCross size={16} />
                    </span>
                  </td>
                  <td>Text value</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="tabs" title="Tabs" note="Arrow keys, Home and End move between tabs. The selected tab stays pressed in.">
          <Tabs
            label="Example tabs"
            tabs={[
              { id: "one", label: "Payments", content: <p>Stripe, PayPal and Wise.</p> },
              { id: "two", label: "Accounting", content: <p>Xero sync, plus CSV for everything else.</p> },
              { id: "three", label: "Exports", content: <p>PDF, CSV and JSON on every plan.</p> },
            ]}
          />
        </Section>

        <Section id="accordion" title="Accordion" note="Native details/summary. Any number can be open; height animates where the browser supports ::details-content.">
          <div className="nb-accordion max-w-2xl">
            <details className="nb-details">
              <summary>Closed row</summary>
              <div className="nb-details__body">
                <p>Hidden content.</p>
              </div>
            </details>
            <details className="nb-details" open>
              <summary>Open row</summary>
              <div className="nb-details__body">
                <p>Answers are plain sentences. No marketing in the FAQ.</p>
              </div>
            </details>
          </div>
        </Section>

        <Section id="stickers" title="Stickers" note="Decorative only, rotated −3° to +4°, wobble once on entering the viewport. Never the only place information appears.">
          <div className="relative flex min-h-[200px] flex-wrap items-center gap-10 p-6">
            <div className="relative h-[150px] w-[150px]">
              <Sticker rotate={-3}>Free for 14 days!</Sticker>
            </div>
            <div className="relative h-[150px] w-[150px]">
              <Sticker rotate={4} colour="pink">New!</Sticker>
            </div>
            <div className="relative h-[150px] w-[150px]">
              <Sticker rotate={2} colour="yellow">2 months free</Sticker>
            </div>
          </div>
        </Section>

        <Section id="marquee" title="Marquee" note="40px per second. Pauses on hover, on focus and with the pause button; with reduced motion it doesn't move and simply wraps.">
          <div className="-mx-[var(--gutter)]">
            <Marquee items={["Stripe", "PayPal", "Wise", "Xero", "CSV export", "30 currencies"]} label="Marquee example" />
          </div>
        </Section>
      </div>
    </div>
  );
}

const ROWS = [
  { id: "INV-0042", client: "Northwind Coffee", amount: "£1,250.00", status: "Paid", colour: "green" },
  { id: "INV-0041", client: "Folio Press", amount: "£860.00", status: "Sent", colour: "blue" },
  { id: "INV-0040", client: "Kite & Co.", amount: "£2,400.00", status: "Overdue", colour: "pink" },
  { id: "INV-0039", client: "Moss Studio", amount: "£540.00", status: "Paid", colour: "green" },
] as const;

/**
 * The hero "screenshot": a product UI drawn in HTML/CSS inside an outlined
 * browser window. It weighs a few hundred bytes instead of an AVIF, stays crisp
 * at every size and reads as one image to assistive tech.
 */
export function ProductShot() {
  return (
    <div
      role="img"
      aria-label="The Stackd dashboard: £12,480 paid this month, and a list of invoices marked paid, sent and overdue."
      className="nb-card nb-card--static nb-card--flush nb-window"
    >
      <div className="nb-window__bar">
        <span className="nb-window__dot" />
        <span className="nb-window__dot" />
        <span className="nb-window__dot" />
        <span className="nb-window__url">app.stackd.example/invoices</span>
      </div>

      <div className="grid gap-4 bg-cream p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="border-[3px] border-ink bg-yellow p-3 sm:p-4">
            <p className="nb-label">Paid this month</p>
            <p className="mt-1 font-display text-[clamp(1.4rem,1rem+2vw,2.25rem)] leading-none">£12,480</p>
          </div>
          <div className="border-[3px] border-ink bg-white p-3 sm:p-4">
            <p className="nb-label">Outstanding</p>
            <p className="mt-1 font-display text-[clamp(1.4rem,1rem+2vw,2.25rem)] leading-none">£3,260</p>
          </div>
        </div>

        <div className="border-[3px] border-ink bg-white">
          <div className="flex items-center justify-between border-b-[3px] border-ink px-3 py-2.5 sm:px-4">
            <p className="font-display text-base">Invoices</p>
            <span className="border-[3px] border-ink bg-yellow px-2.5 py-1 font-display text-xs">+ New</span>
          </div>
          <ul>
            {ROWS.map((row, i) => (
              <li
                key={row.id}
                className={`grid grid-cols-[1fr_auto] items-center gap-x-3 px-3 py-2.5 sm:grid-cols-[5.5rem_1fr_auto_auto] sm:px-4 ${
                  i < ROWS.length - 1 ? "border-b-[3px] border-ink" : ""
                }`}
              >
                <span className="nb-label hidden sm:block">{row.id}</span>
                <span className="truncate font-bold">{row.client}</span>
                <span className="hidden font-mono text-sm font-bold sm:block">{row.amount}</span>
                <span className={`nb-badge nb-badge--${row.colour} justify-self-end !text-[0.6875rem]`}>{row.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

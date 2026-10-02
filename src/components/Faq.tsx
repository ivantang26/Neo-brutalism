/** FR-3: native <details>/<summary>; any number can be open; height animates where supported. */
export function Faq({ items, title = "Questions, answered plainly.", id = "faq" }: { items: { q: string; a: string }[]; title?: string; id?: string }) {
  return (
    <section aria-labelledby={`${id}-title`} className="nb-section">
      <div className="nb-container grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <p className="nb-label">FAQ</p>
          <h2 id={`${id}-title`} className="nb-h2 mt-3">
            {title}
          </h2>
        </div>
        <div className="nb-accordion">
          {items.map((item) => (
            <details key={item.q} className="nb-details">
              <summary>{item.q}</summary>
              <div className="nb-details__body">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

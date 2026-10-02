import { STEPS } from "@/content/home";

function ThickArrow({ className = "" }: { className?: string }) {
  return (
    <svg width="56" height="36" viewBox="0 0 56 36" aria-hidden="true" focusable="false" className={className}>
      <path d="M0 12h34V0l22 18-22 18V24H0z" fill="var(--ink)" />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="nb-section">
      <div className="nb-container">
        <p className="nb-label">How it works</p>
        <h2 id="how-title" className="nb-h2 mt-3 max-w-2xl">
          From &ldquo;I should invoice&rdquo; to paid.
        </h2>

        <ol className="mt-10 flex flex-col items-stretch lg:mt-14 lg:flex-row">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col items-center lg:flex-1 lg:flex-row">
              <div className="nb-card nb-card--static w-full lg:h-full">
                <span className="grid h-14 w-14 place-items-center rounded-[var(--radius)] border-[3px] border-ink bg-yellow font-display text-2xl">
                  {i + 1}
                </span>
                <h3 className="nb-h3 mt-5">{step.title}</h3>
                <p className="mt-3">{step.body}</p>
              </div>
              {i < STEPS.length - 1 ? (
                <ThickArrow className="my-4 flex-none rotate-90 lg:mx-4 lg:my-0 lg:rotate-0" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

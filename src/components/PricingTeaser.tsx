import Link from "next/link";
import { PLANS } from "@/lib/pricing";
import { signupHref } from "@/lib/site";
import { IconCheck } from "./Icons";
import { Price } from "./Price";

export function PricingTeaser() {
  const plans = PLANS.filter((p) => p.id !== "free");
  return (
    <section aria-labelledby="teaser-title" className="nb-section">
      <div className="nb-container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="nb-label">Pricing</p>
            <h2 id="teaser-title" className="nb-h2 mt-3 max-w-xl">
              Costs less than one late invoice.
            </h2>
          </div>
          <Link href="/pricing/" className="nb-link self-start md:self-auto">
            See full pricing →
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8 lg:mt-14">
          {plans.map((plan) => (
            <li key={plan.id}>
              <article className={`nb-card nb-card--${plan.colour} flex h-full flex-col gap-5 !p-6 md:!p-8`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="nb-h3">{plan.name}</h3>
                  {plan.popular ? <span className="nb-badge nb-badge--yellow">Most popular</span> : null}
                </div>
                <Price plan={plan.id} />
                <ul className="grid gap-2.5">
                  {plan.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <IconCheck size={20} className="mt-[3px] flex-none" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={signupHref({ plan: plan.id, placement: "home-pricing", billing: "monthly" })}
                  className="nb-btn mt-auto self-start"
                  data-track="Signup Click"
                  data-track-plan={plan.id}
                  data-track-placement="home-pricing"
                >
                  Start free<span className="sr-only"> on {plan.name}</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

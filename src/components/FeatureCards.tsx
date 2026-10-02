import Link from "next/link";
import { FEATURES } from "@/content/home";
import { IconBell, IconBolt, IconPortal } from "./Icons";

const ICONS = { "quick-invoices": IconBolt, reminders: IconBell, "client-portal": IconPortal } as const;

/** Small, decorative drawings in the bottom of each card. */
function MiniIllustration({ id }: { id: (typeof FEATURES)[number]["id"] }) {
  if (id === "quick-invoices") {
    return (
      <div className="relative h-[92px]">
        <div className="absolute inset-x-0 bottom-0 top-2 border-[3px] border-ink bg-white p-3">
          <div className="h-2.5 w-1/3 bg-ink" />
          <div className="mt-2 h-2 w-2/3 border-2 border-ink" />
          <div className="mt-1.5 h-2 w-1/2 border-2 border-ink" />
        </div>
        <div className="absolute bottom-3 right-3 border-[3px] border-ink bg-yellow px-2 py-1 font-display text-sm">£480</div>
      </div>
    );
  }
  if (id === "reminders") {
    return (
      <div className="flex h-[92px] items-end gap-2">
        {["−3d", "Due", "+7d"].map((label, i) => (
          <div
            key={label}
            className={`flex-1 border-[3px] border-ink px-2 py-2 text-center ${i === 1 ? "bg-yellow" : "bg-white"}`}
            style={{ height: `${56 + i * 14}%` }}
          >
            <span className="nb-label">{label}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-[92px] flex-col border-[3px] border-ink bg-white">
      <div className="flex gap-1.5 border-b-[3px] border-ink px-2 py-1.5">
        <span className="h-2.5 w-2.5 rounded-full border-2 border-ink" />
        <span className="h-2.5 w-2.5 rounded-full border-2 border-ink" />
      </div>
      <div className="flex flex-1 items-center gap-2 px-2.5">
        <span className="h-7 w-7 flex-none rounded-full border-[3px] border-ink bg-pink" />
        <div className="flex-1">
          <div className="h-2 w-3/4 bg-ink" />
          <div className="mt-1.5 h-2 w-1/2 border-2 border-ink" />
        </div>
        <span className="border-[3px] border-ink bg-green px-1.5 py-0.5 font-display text-xs">Pay</span>
      </div>
    </div>
  );
}

export function FeatureCards() {
  return (
    <section aria-labelledby="features-title" className="nb-section">
      <div className="nb-container">
        <div className="max-w-2xl">
          <p className="nb-label">What it does</p>
          <h2 id="features-title" className="nb-h2 mt-3">
            Three jobs. Done properly.
          </h2>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8 lg:mt-14 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.id];
            return (
              <li key={f.id} className={i === 2 ? "md:col-span-2 lg:col-span-1" : undefined}>
                <article className={`nb-card nb-card--${f.colour} flex h-full flex-col gap-4`}>
                  <span className="grid h-14 w-14 place-items-center rounded-[var(--radius)] border-[3px] border-ink bg-white">
                    <Icon size={28} />
                  </span>
                  <h3 className="nb-h3">{f.title}</h3>
                  <p className="max-w-[34ch]">{f.body}</p>
                  <div className="mt-auto pt-2">
                    <MiniIllustration id={f.id} />
                  </div>
                  <Link href={`/features/#${f.id}`} className="nb-link self-start">
                    More on {f.title.toLowerCase()}
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

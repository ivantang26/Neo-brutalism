import { signupHref } from "@/lib/site";

export function CtaBlock({
  title = "Get paid. Skip the boring bit.",
  body = "Free for 14 days, no card needed. Your first invoice can go out in the next five minutes.",
  placement,
}: {
  title?: string;
  body?: string;
  placement: string;
}) {
  return (
    <section aria-labelledby={`cta-${placement}`} className="border-y-[3px] border-ink bg-yellow">
      <div className="nb-container flex flex-col items-start gap-8 py-16 md:py-24 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id={`cta-${placement}`} className="nb-display max-w-[13ch] !text-[clamp(2.5rem,1.2rem+4.6vw,5.5rem)]">
            {title}
          </h2>
          <p className="nb-lede mt-5">{body}</p>
        </div>
        <a
          href={signupHref({ placement })}
          className="nb-btn nb-btn--white nb-btn--lg flex-none"
          data-track="Signup Click"
          data-track-placement={placement}
        >
          Start free
        </a>
      </div>
    </section>
  );
}

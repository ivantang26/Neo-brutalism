import Link from "next/link";
import { CtaBlock } from "@/components/CtaBlock";
import { Faq } from "@/components/Faq";
import { FeatureCards } from "@/components/FeatureCards";
import { HowItWorks } from "@/components/HowItWorks";
import { IconArrowRight } from "@/components/Icons";
import { InvoiceDemo } from "@/components/InvoiceDemo";
import { Marquee } from "@/components/Marquee";
import { PricingTeaser } from "@/components/PricingTeaser";
import { ProductShot } from "@/components/ProductShot";
import { Sticker } from "@/components/Sticker";
import { Testimonials } from "@/components/Testimonials";
import { HOME_FAQ, MARQUEE_ITEMS } from "@/content/home";
import { getChangelog } from "@/lib/changelog";
import { SITE, signupHref } from "@/lib/site";

export default function Home() {
  const latest = getChangelog()[0];

  return (
    <>
      <section aria-labelledby="hero-title" className="overflow-x-clip">
        <div className="nb-container grid items-center gap-14 pb-16 pt-10 md:pb-20 md:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 lg:pb-28 lg:pt-20">
          <div>
            {latest ? (
              <Link href={`/changelog/#${latest.slug}`} className="nb-badge nb-badge--white max-w-full !whitespace-normal">
                <span className="-my-1 -ml-2 rounded-full border-[3px] border-ink bg-green px-2 py-1">New</span>
                v{latest.version}: {latest.title}
                <IconArrowRight size={14} />
              </Link>
            ) : null}
            <h1 id="hero-title" className="nb-display mt-6 md:mt-8">
              Get paid. Skip the <span className="nb-mark">boring</span> bit.
            </h1>
            <p className="nb-lede mt-6">
              Invoices, automatic reminders and a client portal for freelancers. None of the accounting-software feel.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={signupHref({ placement: "hero" })}
                className="nb-btn nb-btn--lg"
                data-track="Signup Click"
                data-track-placement="hero"
              >
                Start free
                <IconArrowRight size={20} />
              </a>
              <p className="text-[0.9375rem] font-bold">
                {SITE.trialDays}-day free trial · No card needed
              </p>
            </div>
          </div>

          <div className="hero-shot relative">
            <Sticker rotate={-3} colour="green" className="-left-3 -top-10 md:-left-8 md:-top-14">
              Free for {SITE.trialDays} days!
            </Sticker>
            <ProductShot />
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE_ITEMS} label="Works with" />
      <FeatureCards />
      <InvoiceDemo />
      <HowItWorks />
      <Testimonials />
      <PricingTeaser />
      <Faq items={HOME_FAQ} />
      <CtaBlock placement="home-final" title="Your next invoice could be paid by Friday." />
    </>
  );
}

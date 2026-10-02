import type { Metadata } from "next";
import { IconRss } from "@/components/Icons";
import { formatDate, getChangelog } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Everything new in Stackd, newest first. Subscribe by RSS.",
};

const TAG_COLOUR: Record<string, string> = { NEW: "green", IMPROVED: "blue", FIX: "white" };

export default function ChangelogPage() {
  const entries = getChangelog();

  return (
    <section aria-labelledby="changelog-title" className="nb-section !pt-12 md:!pt-20">
      <div className="nb-container max-w-[calc(860px+var(--gutter)*2)]">
        <p className="nb-label">Changelog</p>
        <h1 id="changelog-title" className="nb-display mt-4 !text-[clamp(2.75rem,1.4rem+4.6vw,5.5rem)]">
          Shipped lately.
        </h1>
        <p className="nb-lede mt-6">A new release roughly every three weeks. Small, useful, written down here.</p>
        <a href="/rss.xml" className="nb-btn nb-btn--white nb-btn--sm mt-8">
          <IconRss size={18} />
          Subscribe by RSS
        </a>

        <ol className="mt-14 grid gap-8 md:gap-10">
          {entries.map((entry) => (
            <li key={entry.slug} id={entry.slug}>
              <article aria-labelledby={`${entry.slug}-title`} className="nb-card nb-card--static md:!p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="nb-badge nb-badge--yellow">v{entry.version}</span>
                  <time dateTime={entry.date} className="nb-label">
                    {formatDate(entry.date)}
                  </time>
                  <span className="flex flex-wrap gap-2 md:ml-auto">
                    {entry.tags.map((tag) => (
                      <span key={tag} className={`nb-badge nb-badge--${TAG_COLOUR[tag] ?? "white"}`}>
                        {tag}
                      </span>
                    ))}
                  </span>
                </div>
                <h2 id={`${entry.slug}-title`} className="nb-h3 mt-5">
                  <a href={`#${entry.slug}`} className="no-underline hover:underline">
                    {entry.title}
                  </a>
                </h2>
                <div className="nb-prose mt-4" dangerouslySetInnerHTML={{ __html: entry.html }} />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

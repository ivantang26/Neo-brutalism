import { getChangelog } from "@/lib/changelog";
import { SITE } from "@/lib/site";

// FR-6: generated at build time from the same Markdown files as /changelog.
export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const entries = getChangelog();
  const items = entries
    .map((e) => {
      const link = `${SITE.url}/changelog/#${e.slug}`;
      return `    <item>
      <title>${escape(`v${e.version}: ${e.title}`)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">stackd-${e.slug}</guid>
      <pubDate>${new Date(`${e.date}T09:00:00Z`).toUTCString()}</pubDate>
      ${e.tags.map((t) => `<category>${escape(t)}</category>`).join("")}
      <description>${escape(e.html)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Stackd changelog</title>
    <link>${SITE.url}/changelog/</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escape(SITE.tagline)} New releases, newest first.</description>
    <language>en-gb</language>
    ${entries[0] ? `<lastBuildDate>${new Date(`${entries[0].date}T09:00:00Z`).toUTCString()}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

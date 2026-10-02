import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type ChangelogEntry = {
  slug: string;
  version: string;
  date: string; // yyyy-mm-dd
  title: string;
  tags: string[];
  html: string;
};

const DIR = path.join(process.cwd(), "content", "changelog");

/** FR-6: entries are Markdown files with front matter, returned newest first. */
export function getChangelog(): ChangelogEntry[] {
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
      return {
        slug: `v${String(data.version).replace(/\./g, "-")}`,
        version: String(data.version),
        date,
        title: String(data.title),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        html: marked.parse(content, { async: false }) as string,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

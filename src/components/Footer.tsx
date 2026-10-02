import Link from "next/link";
import { loginHref, signupHref } from "@/lib/site";
import { Logo } from "./Icons";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/features/", label: "Features" },
      { href: "/pricing/", label: "Pricing" },
      { href: "/changelog/", label: "Changelog" },
      { href: "/rss.xml", label: "RSS feed", external: true },
    ],
  },
  {
    title: "Get started",
    links: [
      { href: signupHref({ placement: "footer" }), label: "Start free", external: true, track: true },
      { href: loginHref, label: "Log in", external: true },
      { href: "/features/#security", label: "Security" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/#terms", label: "Terms" },
      { href: "/legal/#privacy", label: "Privacy" },
      { href: "/legal/#cookies", label: "Cookies" },
    ],
  },
] as const;

const linkClass =
  "inline-block py-1 font-bold text-cream underline decoration-[3px] underline-offset-4 hover:bg-yellow hover:text-ink";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="nb-container grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:py-20">
        <div className="max-w-xs">
          <Logo inverted />
          <p className="mt-5">Invoicing that doesn&rsquo;t feel like accounting. Made for freelancers and tiny studios.</p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="nb-label mb-4 text-yellow">{col.title}</h2>
            <ul className="grid gap-2">
              {col.links.map((link) =>
                "external" in link && link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={linkClass}
                      {...("track" in link && link.track
                        ? { "data-track": "Signup Click", "data-track-placement": "footer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t-[3px] border-cream">
        <div className="nb-container flex flex-col gap-2 py-6 text-[0.9375rem] md:flex-row md:justify-between">
          <p>© 2026 Stackd Ltd. All prices include VAT where it applies.</p>
          <p>Stackd is a fictional product, built as a design portfolio piece.</p>
        </div>
      </div>
    </footer>
  );
}

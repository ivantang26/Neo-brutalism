import Link from "next/link";

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="nb-section">
      <div className="nb-container flex flex-col items-start">
        <span className="nb-badge nb-badge--yellow">Error 404</span>
        <h1 id="nf-title" className="nb-display mt-6 max-w-[12ch]">
          This page went unpaid.
        </h1>
        <p className="nb-lede mt-6">We couldn&rsquo;t find it. The invoice is probably in someone&rsquo;s spam folder.</p>
        <Link href="/" className="nb-btn nb-btn--lg mt-10">
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}

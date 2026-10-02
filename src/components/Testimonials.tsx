"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/content/home";
import { signupHref } from "@/lib/site";
import { IconArrowLeft, IconArrowRight } from "./Icons";

function initials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/**
 * Mobile: horizontal swipe carousel with snap points and real prev/next buttons.
 * Tablet: two-column masonry. Desktop: three-column masonry, gently rotated.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false, scrollable: true });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      scrollable: el.scrollWidth > el.clientWidth + 4,
    });
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-labelledby="wall-title" className="nb-section overflow-x-clip border-y-[3px] border-ink bg-blue">
      <div className="nb-container">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="nb-label">The wall</p>
            <h2 id="wall-title" className="nb-h2 mt-3 max-w-2xl">
              People who stopped chasing invoices.
            </h2>
          </div>
          <div className="flex gap-3 md:hidden">
            <button
              type="button"
              className="nb-icon-btn"
              aria-label="Previous testimonial"
              aria-controls="testimonial-track"
              disabled={edge.start}
              onClick={() => step(-1)}
            >
              <IconArrowLeft />
            </button>
            <button
              type="button"
              className="nb-icon-btn"
              aria-label="Next testimonial"
              aria-controls="testimonial-track"
              disabled={edge.end}
              onClick={() => step(1)}
            >
              <IconArrowRight />
            </button>
          </div>
        </div>

        <ul
          id="testimonial-track"
          ref={trackRef}
          // Focusable only while it scrolls, so keyboard users can scroll it too.
          tabIndex={edge.scrollable ? 0 : undefined}
          aria-label="Testimonials"
          className="testimonial-wall mt-10 lg:mt-14"
        >
          {TESTIMONIALS.map((t) => (
            <li key={t.name} className="testimonial-wall__item" style={{ "--rot": `${t.rotate}deg` } as React.CSSProperties}>
              <figure className={`nb-card nb-card--${t.colour} nb-card--static flex h-full flex-col gap-5`}>
                <blockquote className="text-[1.125rem] leading-[1.45]">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 flex-none place-items-center rounded-full border-[3px] border-ink bg-white font-display"
                  >
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block font-bold">{t.name}</span>
                    <span className="block text-[0.9375rem]">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
          <li className="testimonial-wall__item" style={{ "--rot": "1deg" } as React.CSSProperties}>
            <div className="nb-card nb-card--static flex h-full flex-col items-start gap-5 !bg-yellow">
              <p className="nb-h3">Your quote could go here.</p>
              <p>Send your first invoice today and tell us how it went.</p>
              <a
                href={signupHref({ placement: "testimonial-wall" })}
                className="nb-btn nb-btn--white"
                data-track="Signup Click"
                data-track-placement="testimonial-wall"
              >
                Start free
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

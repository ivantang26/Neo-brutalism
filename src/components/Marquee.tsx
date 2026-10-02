"use client";

import { useEffect, useRef, useState } from "react";

const SPEED_PX_PER_SECOND = 40;

/**
 * FR-8: black band, yellow mono text, 40px/s. Pauses on hover and on focus,
 * has an explicit pause button (WCAG 2.2.2), and doesn't move at all with
 * reduced motion — the list wraps instead (see .nb-marquee in globals.css).
 */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  const groupRef = useRef<HTMLUListElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const group = groupRef.current;
    const track = trackRef.current;
    if (!group || !track) return;
    // One group's width is the distance travelled per loop (the track holds two copies).
    const sync = () => {
      const seconds = group.getBoundingClientRect().width / SPEED_PX_PER_SECOND;
      track.style.setProperty("--marquee-duration", `${seconds.toFixed(2)}s`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(group);
    return () => ro.disconnect();
  }, []);

  // Repeat the list so one group is always wider than the widest screen.
  const repeated = [...items, ...items];

  return (
    <section aria-label={label} className={`nb-marquee ${paused ? "is-paused" : ""}`}>
      <div className="nb-marquee__viewport">
        <div ref={trackRef} className="nb-marquee__track">
          <ul ref={groupRef} className="nb-marquee__group">
            {repeated.map((item, i) => (
              <li key={i} className="nb-marquee__item" aria-hidden={i >= items.length ? true : undefined}>
                {item}
              </li>
            ))}
          </ul>
          <ul className="nb-marquee__group" aria-hidden="true">
            {repeated.map((item, i) => (
              <li key={i} className="nb-marquee__item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        className="nb-marquee__toggle"
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? "Play" : "Pause"}
      </button>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  /** Rotation in degrees. Stickers stay within −3° to +4°. */
  rotate?: number;
  colour?: "green" | "pink" | "yellow" | "blue" | "white";
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Decorative rotated badge. Wobbles once (±3° over 600ms) the first time it enters
 * the viewport; reduced-motion users get no wobble. Rotated elements carry no
 * essential information, so the sticker is hidden from assistive tech — its copy
 * must also appear in plain text nearby.
 */
export function Sticker({ children, rotate = -3, colour = "green", className = "", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const clamped = Math.max(-3, Math.min(4, rotate));

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-wobbling");
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    const done = () => el.classList.remove("is-wobbling");
    el.addEventListener("animationend", done);
    return () => {
      io.disconnect();
      el.removeEventListener("animationend", done);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`nb-sticker ${className}`}
      style={{ "--rot": `${clamped}deg`, "--sticker-bg": `var(--${colour})`, ...style } as React.CSSProperties}
    >
      <span>{children}</span>
    </div>
  );
}

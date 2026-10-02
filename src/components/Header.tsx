"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV, loginHref, signupHref } from "@/lib/site";
import { IconClose, IconMenu, Logo } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu on navigation, Escape, or when the full link row appears.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-cream">
      <div className="nb-container flex h-[72px] items-center gap-3 lg:h-[84px] lg:gap-8">
        <Link href="/" className="mr-auto rounded-sm no-underline" aria-label="Stackd home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="block rounded-[var(--radius)] border-[3px] border-transparent px-3.5 py-2 font-bold no-underline hover:border-ink hover:bg-blue aria-[current=page]:border-ink aria-[current=page]:bg-yellow"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 lg:gap-6">
          <a href={loginHref} className="nb-link hidden lg:inline">
            Log in
          </a>
          <a
            href={signupHref({ placement: "header" })}
            className="nb-btn nb-btn--sm"
            data-track="Signup Click"
            data-track-placement="header"
          >
            Start free
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="nb-icon-btn lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div id={menuId} hidden={!open} className="border-t-[3px] border-ink bg-cream lg:hidden">
        <nav aria-label="Mobile" className="nb-container py-5">
          <ul className="grid gap-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="nb-card nb-card--static flex items-center justify-between !py-4 font-display text-xl no-underline aria-[current=page]:!bg-yellow"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a href={loginHref} className="nb-link text-lg">
                Log in
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

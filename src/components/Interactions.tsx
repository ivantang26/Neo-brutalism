"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const PRESSABLE = ".nb-btn, .nb-icon-btn, .nb-tab";

/**
 * Site-wide behaviour that would otherwise be repeated in every component:
 *  - FR-7: keyboard presses (Space / Enter) show the same pressed state as :active,
 *    and Space activates link-styled buttons, which browsers don't do natively.
 *  - iOS Safari only applies :active when a touchstart listener exists.
 *  - Analytics click delegation via data-track attributes, so server components
 *    can declare events without becoming client components.
 */
export function Interactions() {
  useEffect(() => {
    const noop = () => {};
    const pressed = new Set<HTMLElement>();

    const release = () => {
      pressed.forEach((el) => el.classList.remove("is-pressed"));
      pressed.clear();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== " " && e.key !== "Enter") return;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(PRESSABLE);
      if (!el || (el as HTMLButtonElement).disabled) return;
      el.classList.add("is-pressed");
      pressed.add(el);
      if (e.key === " " && el.tagName === "A") e.preventDefault(); // don't scroll the page
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key !== " " && e.key !== "Enter") return;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(PRESSABLE);
      if (el && pressed.has(el) && e.key === " " && el.tagName === "A") el.click();
      // Keep the pressed frame visible for one press duration so a quick tap still reads.
      window.setTimeout(release, 80);
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const props: Record<string, string> = {};
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key.startsWith("track") && key !== "track" && value) {
          props[key.slice(5, 6).toLowerCase() + key.slice(6)] = value;
        }
      }
      track(el.dataset.track!, props);
    };

    document.addEventListener("touchstart", noop, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("focusout", release);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("touchstart", noop);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("focusout", release);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}

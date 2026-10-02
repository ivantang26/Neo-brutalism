/**
 * Privacy-friendly analytics (Plausible-compatible). Events: "Pricing Toggle",
 * "Currency Switch", "Demo Used", "Signup Click". Without a configured script
 * (NEXT_PUBLIC_PLAUSIBLE_DOMAIN unset) every call is a no-op.
 */
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, props ?? "");
}

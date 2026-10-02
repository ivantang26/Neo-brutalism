import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Svg>
);
export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 5l14 14M19 5L5 19" />
  </Svg>
);
export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 12h16M13 6l6 6-6 6" />
  </Svg>
);
export const IconArrowLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 12H5M11 6l-6 6 6 6" />
  </Svg>
);
export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12.5l5 5L20 6.5" />
  </Svg>
);
export const IconCross = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
export const IconBolt = (p: IconProps) => (
  <Svg {...p} strokeLinejoin="round">
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" stroke="none" />
  </Svg>
);
export const IconBell = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 17V11a6 6 0 0112 0v6l2 2H4l2-2z" />
    <path d="M10 21h4" />
  </Svg>
);
export const IconPortal = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" />
    <path d="M3 9h18M8 14h8" />
  </Svg>
);
export const IconLock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="10" width="16" height="11" />
    <path d="M8 10V7a4 4 0 018 0v3" />
  </Svg>
);
export const IconDownload = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3v12M6 10l6 6 6-6M4 21h16" />
  </Svg>
);
export const IconCard = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2" y="5" width="20" height="14" />
    <path d="M2 10h20M6 15h4" />
  </Svg>
);
export const IconRss = (p: IconProps) => (
  <Svg {...p} strokeLinecap="round">
    <path d="M5 11a8 8 0 018 8M5 5a14 14 0 0114 14" />
    <circle cx="6" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </Svg>
);
export const IconWarn = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3L2 21h20L12 3z" />
    <path d="M12 10v5M12 17.5v.5" />
  </Svg>
);

/** Logo mark: three stacked, offset slabs — "Stackd". */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      <rect x="8" y="2.5" width="21" height="8" fill="var(--pink)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="5.5" y="12" width="21" height="8" fill="var(--blue)" stroke="var(--ink)" strokeWidth="3" />
      <rect x="3" y="21.5" width="21" height="8" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="3" />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className={`font-display text-[1.6rem] leading-none tracking-tight ${inverted ? "text-cream" : "text-ink"}`}>
        Stackd
      </span>
    </span>
  );
}

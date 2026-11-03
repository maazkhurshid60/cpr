import Link from "next/link";

/**
 * Logo: a navy shield (protection) holding a red heart with a white pulse
 * line (CPR), beside a "DRZ" wordmark, in the brand navy, red and white.
 *
 * The client says the logo "was already sent", but no file is in the
 * project. When it arrives, put it in /public and swap this component's
 * contents for an <Image>; every header and footer picks it up.
 */
export function LogoMark({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 48 52" className={className} aria-hidden="true">
      <path
        d="M24 2 44 9.5v14.7c0 12.4-8.3 21.6-20 25.8C12.3 45.8 4 36.6 4 24.2V9.5z"
        fill={light ? "#fff" : "#0b1b36"}
      />
      <path
        d="M24 6.4 40 12.4v11.8c0 10.3-6.7 18-16 21.6-9.3-3.6-16-11.3-16-21.6V12.4z"
        fill="none"
        stroke={light ? "#0b1b36" : "#fff"}
        strokeOpacity={light ? 0.12 : 0.14}
        strokeWidth="1.2"
      />
      <path
        d="M24 37.5 14.6 28.4c-2.6-2.5-3.9-4.6-3.9-7.2 0-3.6 2.8-6.4 6.3-6.4 2.4 0 4.4 1.3 7 3.9 2.6-2.6 4.6-3.9 7-3.9 3.5 0 6.3 2.8 6.3 6.4 0 2.6-1.3 4.7-3.9 7.2z"
        fill="#d62832"
      />
      <path
        d="M9.5 24.5h8.2l2.2-4.6 3.6 9 2.6-6.4 1.4 2h11"
        fill="none"
        stroke={light ? "#0b1b36" : "#fff"}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="DRZ Emergency Response Training, home">
      <LogoMark light={light} className="h-12 w-auto shrink-0 transition-transform group-hover:scale-105" />
      <span className="flex items-center gap-3 leading-none">
        <span className={`font-heading text-[28px] font-extrabold tracking-tight ${light ? "text-white" : "text-navy-900"}`}>
          DRZ
        </span>
        <span className="h-8 w-[3px] rounded-full bg-brand-red" aria-hidden="true" />
        <span
          className={`font-heading text-[10.5px] font-bold uppercase leading-[1.35] tracking-[0.16em] ${
            light ? "text-white/80" : "text-navy-700"
          }`}
        >
          Emergency
          <br />
          Response Training
        </span>
      </span>
    </Link>
  );
}

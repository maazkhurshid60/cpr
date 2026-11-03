import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { priceLabel, type Course } from "@/lib/courses";
import { SITE } from "@/lib/site";
import type { Faq } from "@/lib/faqs";
import { ArrowRightIcon, CheckIcon, ClockIcon, PhoneIcon } from "./Icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Small red pill above a section heading, like the mockup's "Our Services". */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
        light ? "bg-white/10 text-white" : "bg-brand-red-50 text-brand-red"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  center = true,
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div data-reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2 className={`mt-4 text-3xl font-extrabold leading-tight sm:text-4xl ${light ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {intro && <p className={`mt-4 text-[17px] leading-relaxed ${light ? "text-white/75" : "text-slate-600"}`}>{intro}</p>}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "red",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "red" | "navy" | "outline" | "outline-light" | "white";
  className?: string;
}) {
  const styles = {
    red: "bg-brand-red text-white hover:bg-brand-red-dark",
    navy: "bg-navy-900 text-white hover:bg-navy-800",
    outline: "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
    "outline-light": "border border-white/60 text-white hover:bg-white hover:text-navy-900",
    white: "bg-white text-navy-900 hover:bg-navy-50",
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${styles} ${className}`;
  return href.startsWith("tel:") || href.startsWith("mailto:") ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/**
 * Course card. A teaser for the course's own page, which carries the full
 * "what you'll learn" list and formats, so the card keeps to the essentials.
 */
export function CourseCard({ course }: { course: Course }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 transition-all duration-300 hover:-translate-y-1.5 ${
        course.popular
          ? "shadow-[0_1px_3px_rgba(11,27,54,0.06),0_18px_40px_-14px_rgba(220,38,38,0.35)] ring-brand-red/35 hover:shadow-[0_28px_56px_-18px_rgba(220,38,38,0.45)]"
          : "shadow-[0_1px_3px_rgba(11,27,54,0.06),0_12px_32px_-12px_rgba(11,27,54,0.18)] ring-navy-100 hover:shadow-[0_28px_56px_-18px_rgba(11,27,54,0.32)]"
      }`}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/25 to-transparent" />
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-900 shadow-sm backdrop-blur">
            <CheckIcon className="size-3 text-brand-red" strokeWidth={3.5} />
            AHA Certified
          </span>
          {course.popular && (
            <span className="rounded-full bg-brand-red px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
              Most Popular
            </span>
          )}
        </div>

        {/* Title over the photo */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-[13px] font-semibold leading-5 text-white/80">
            For {course.audience.charAt(0).toLowerCase() + course.audience.slice(1)}
          </p>
          <h3 className="mt-1.5 text-2xl font-extrabold leading-tight text-white">
            {/* The link covers the whole card, so anywhere on it opens the course. */}
            <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0">
              {course.name}
            </Link>
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-navy-700">
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="size-4 text-brand-red" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckIcon className="size-4 text-brand-red" strokeWidth={3} />
            {course.formats.join(" · ")}
          </span>
        </div>

        <p className="mt-4 line-clamp-2 text-[15px] leading-6 text-slate-600">{course.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Individual price</p>
            <p className="font-heading text-2xl font-extrabold text-navy-900">{priceLabel(course)}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-all group-hover:bg-brand-red group-hover:shadow-md">
            View Course
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

/** Navy banner at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900">
        {image && (
          <>
            <Image src={image} alt="" fill sizes="100vw" fetchPriority="high" loading="eager" className="animate-slow-zoom -z-20 object-cover" />
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
          </>
        )}
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="animate-rise">
              <Eyebrow light>{eyebrow}</Eyebrow>
            </div>
            <h1 className="animate-rise mt-5 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl" style={{ "--d": "90ms" } as CSSProperties}>
              {title}
            </h1>
            <p className="animate-rise mt-5 text-lg leading-relaxed text-white/80" style={{ "--d": "180ms" } as CSSProperties}>
              {intro}
            </p>
            {children && (
              <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ "--d": "270ms" } as CSSProperties}>
                {children}
              </div>
            )}
          </div>
        </Container>
        <EcgLine className="absolute inset-x-0 bottom-6 -z-10 h-16 w-full opacity-60" />
      </div>
    </section>
  );
}

/** Closing call to action, used at the foot of most pages. */
export function CtaBand({
  title = "Ready to get certified?",
  text = "Book a seat in an upcoming class, or tell us about your team and we'll bring the training to you.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-3xl bg-brand-red">
        {/* Pulse rings behind the copy */}
        <div className="pointer-events-none absolute -right-16 -top-16 size-80" aria-hidden="true">
          <span className="animate-ping-ring absolute inset-0 rounded-full border-2 border-white/30" />
          <span className="animate-ping-ring absolute inset-0 rounded-full border-2 border-white/20 [animation-delay:1.3s]" />
          <span className="absolute inset-16 rounded-full bg-white/10" />
        </div>
        <div className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-navy-950/15" aria-hidden="true" />
        <Container className="relative flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <div className="max-w-2xl" data-reveal>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-white/85">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/schedule#reserve" variant="white">
              Book a Class
            </ButtonLink>
            <ButtonLink href={SITE.phoneHref} variant="outline-light">
              <PhoneIcon className="size-4" />
              {SITE.phone}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </section>
  );
}

/**
 * FAQ accordion on native <details>: works without JavaScript, is keyboard
 * accessible, and animates open where the browser supports it (globals.css).
 * The first item can start open so the list never looks empty.
 */
export function FaqList({ items, openFirst = false, start = 1 }: { items: Faq[]; openFirst?: boolean; start?: number }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details
          key={f.q}
          open={openFirst && i === 0}
          data-reveal
          style={{ "--reveal-delay": `${Math.min(i, 6) * 60}ms` } as CSSProperties}
          className="faq-item group relative overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-[0_1px_2px_rgba(11,27,54,0.04)] transition-[border-color,box-shadow] duration-300 open:border-brand-red/30 open:shadow-[0_18px_40px_-20px_rgba(11,27,54,0.35)] hover:border-navy-700/30"
        >
          {/* Red accent bar on the open item */}
          <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand-red transition-transform duration-300 group-open:scale-y-100" aria-hidden="true" />
          <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="hidden size-9 shrink-0 place-items-center rounded-xl bg-navy-50 font-heading text-sm font-extrabold text-navy-700 transition-colors group-open:bg-brand-red group-open:text-white sm:grid">
              {String(start + i).padStart(2, "0")}
            </span>
            <span className="flex-1 font-heading text-[16px] font-bold leading-snug text-navy-900 sm:text-[17px]">{f.q}</span>
            {/* Plus that turns into a minus */}
            <span className="relative grid size-9 shrink-0 place-items-center rounded-full border border-navy-100 transition-colors group-open:border-brand-red group-open:bg-brand-red" aria-hidden="true">
              <span className="absolute h-0.5 w-3.5 rounded-full bg-navy-900 transition-colors group-open:bg-white" />
              <span className="absolute h-3.5 w-0.5 rounded-full bg-navy-900 transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <div className="px-5 pb-6 sm:pl-[4.75rem] sm:pr-16">
            <p className="text-[15px] leading-relaxed text-slate-600">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const faqSchema = (items: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/** A heartbeat trace that draws itself across the bottom of a hero. */
export function EcgLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className={`pointer-events-none ${className}`} aria-hidden="true">
      <path
        className="ecg-line"
        pathLength={1}
        d="M0 50h300l14-22 16 44 20-70 18 60 12-12h120l10-10 10 10h160l14-22 16 44 20-70 18 60 12-12h420"
        fill="none"
        stroke="#d62832"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Wraps children in a scroll-reveal, staggered by `delay` milliseconds. */
export function Reveal({
  children,
  delay = 0,
  from,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  from?: "left" | "right" | "zoom";
  className?: string;
}) {
  return (
    <div data-reveal={from ?? ""} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties} className={className}>
      {children}
    </div>
  );
}

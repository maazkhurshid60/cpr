import Image from "next/image";
import Link from "next/link";
import { COURSES } from "@/lib/courses";
import { FAQS } from "@/lib/faqs";
import { SITE } from "@/lib/site";
import ScheduleList from "./components/ScheduleList";
import type { CSSProperties } from "react";
import { ButtonLink, Container, CourseCard, CtaBand, EcgLine, Eyebrow, FaqList, Reveal, SectionHead } from "./components/ui";
import {
  ArrowRightIcon,
  AwardIcon,
  BuildingIcon,
  CheckIcon,
  LaptopIcon,
  ShieldIcon,
  TruckIcon,
  UsersIcon,
} from "./components/Icons";

const HIGHLIGHTS = [
  { icon: AwardIcon, title: "AHA-certified instructor", text: "Official American Heart Association courses and cards." },
  { icon: TruckIcon, title: "We come to you", text: "Onsite training at your workplace, school or clinic." },
  { icon: UsersIcon, title: "Small, hands-on classes", text: `Up to ${SITE.maxGroupPerDay} people a day, so everyone practices.` },
  { icon: LaptopIcon, title: "Blended options", text: "Do the theory online, then a short skills session." },
];

const FORMATS = [
  {
    icon: BuildingIcon,
    title: "Classroom",
    text: "The full course in person with our instructor: video, practice on manikins and AED trainers, and your skills test in one visit.",
  },
  {
    icon: LaptopIcon,
    title: "Blended learning",
    text: "Complete the AHA online portion at your own pace, then book a shorter hands-on skills session with us.",
  },
  {
    icon: TruckIcon,
    title: "Onsite at your workplace",
    text: "We bring every manikin, AED trainer and supply to you, and train your team on the day that suits your schedule.",
  },
];

const INDUSTRIES = [
  "Healthcare & clinics",
  "Schools & childcare",
  "Construction & trades",
  "Gyms & fitness",
  "Corporate offices",
  "Restaurants & hospitality",
  "Manufacturing & warehouses",
  "Government & municipal",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900">
          <Image
            src="/images/hero.webp"
            alt=""
            fill
            sizes="100vw"
            fetchPriority="high"
            loading="eager"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950/80 via-navy-950/50 to-brand-red/25" />
          <Container className="py-20 sm:py-28 lg:py-32">
            <div className="max-w-2xl">
              <div className="animate-rise">
                <Eyebrow light>American Heart Association Courses</Eyebrow>
              </div>
              <h1 style={{ "--d": "100ms" } as CSSProperties} className="animate-rise mt-6 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                CPR, First Aid &amp; BLS Training in Los Angeles County
              </h1>
              <p style={{ "--d": "200ms" } as CSSProperties} className="animate-rise mt-5 font-heading text-lg font-bold uppercase tracking-wider text-brand-red brightness-125">{SITE.tagline}</p>
              <p style={{ "--d": "300ms" } as CSSProperties} className="animate-rise mt-4 max-w-xl text-lg leading-relaxed text-white/85">
                Get certified in CPR and AED for adults, children and infants, basic first aid and BLS, in a small hands-on class
                or onsite with your whole team.
              </p>
              <div style={{ "--d": "400ms" } as CSSProperties} className="animate-rise mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/schedule#reserve">Book a Class</ButtonLink>
                <ButtonLink href="/group-training" variant="outline-light">
                  Group &amp; Onsite Training
                </ButtonLink>
              </div>
              <ul style={{ "--d": "500ms" } as CSSProperties} className="animate-rise mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
                {["AHA course completion cards", "Classroom, blended or onsite", `Serving ${SITE.serviceArea}`].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckIcon className="size-4 text-brand-red brightness-125" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
          <EcgLine className="absolute inset-x-0 bottom-8 -z-10 h-20 w-full opacity-70" />
        </div>
      </section>

      {/* Highlights */}
      <section className="py-14">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                className="group flex gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-red-50 text-brand-red transition-colors duration-300 group-hover:bg-brand-red group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <div>
                  <p className="font-heading font-bold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Courses */}
      <section className="bg-navy-50 py-20">
        <Container>
          <SectionHead
            eyebrow="Our Courses"
            title="Life-saving training for every setting"
            intro="Three American Heart Association courses, each taught hands-on by a certified instructor. Pick the one your job or family needs."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 120}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-600">
            Not sure which course you need?{" "}
            <Link href="/faq" className="font-semibold text-brand-red underline">
              See how to choose
            </Link>{" "}
            or call{" "}
            <a href={SITE.phoneHref} className="font-semibold text-navy-900 underline">
              {SITE.phone}
            </a>
            .
          </p>
        </Container>
      </section>

      {/* Group training */}
      <section className="px-3 py-3 sm:px-4">
        <div className="overflow-hidden rounded-3xl bg-navy-900">
          <div className="grid lg:grid-cols-2">
            <div data-reveal="left" className="relative min-h-72 overflow-hidden lg:min-h-full">
              <Image src="/images/team.webp" alt="A team of healthcare workers making heart shapes with their hands" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div data-reveal="right" className="px-6 py-14 sm:px-12 lg:py-20">
              <Eyebrow light>For Businesses &amp; Groups</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">Train your whole team in a single day</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/75">
                We come to your workplace with everything needed and certify up to {SITE.maxGroupPerDay} people in a day. Simple
                per-person pricing, discounts for larger groups, and invoicing for businesses.
              </p>
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {INDUSTRIES.map((i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[15px] text-white/90">
                    <ShieldIcon className="size-5 shrink-0 text-brand-red brightness-125" />
                    {i}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/group-training#quote">Request a Group Quote</ButtonLink>
                <ButtonLink href="/group-training" variant="outline-light">
                  How Group Training Works
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-20">
        <Container>
          <SectionHead
            eyebrow="How You Learn"
            title="Train the way that fits your schedule"
            intro="Every format ends with the same hands-on skills test and the same AHA card."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FORMATS.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                data-reveal
                style={{ "--reveal-delay": `${i * 120}ms` } as CSSProperties}
                className="group relative overflow-hidden rounded-3xl border border-navy-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Navy wash that rises on hover */}
                <span className="absolute inset-0 -z-0 translate-y-full bg-navy-900 transition-transform duration-500 ease-out group-hover:translate-y-0" aria-hidden="true" />
                <span className="absolute right-6 top-5 font-heading text-6xl font-extrabold text-navy-50 transition-colors duration-500 group-hover:text-white/10" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="relative grid size-14 place-items-center rounded-2xl bg-brand-red text-white shadow-lg shadow-brand-red/30">
                  <Icon className="size-7" />
                </span>
                <h3 className="relative mt-6 text-xl font-bold transition-colors duration-500 group-hover:text-white">{title}</h3>
                <p className="relative mt-3 text-[15px] leading-relaxed text-slate-600 transition-colors duration-500 group-hover:text-white/75">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why DRZ */}
      <section className="bg-navy-50 py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal="left" className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl">
            <Image src="/images/cpr-practice.webp" alt="Hands giving chest compressions on a CPR training manikin" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHead
              center={false}
              eyebrow="Why DRZ"
              title="Real practice, not just a video"
              intro="Small, hands-on AHA classes taught by a certified instructor, at our site or yours, on a schedule that works for you."
            />
            <ul className="mt-8 space-y-4">
              {[
                ["Everyone gets time on the manikins.", `Classes stay small, and onsite sessions top out at ${SITE.maxGroupPerDay} people a day.`],
                ["Clear, upfront pricing.", "Per-person pricing with no hidden fees, and discounts for larger groups."],
                ["Flexible for busy teams.", "Classroom, blended or onsite, with invoicing available for businesses."],
                ["The right course the first time.", "Tell us your job or licensing requirement and we will confirm the course you need."],
              ].map(([lead, rest], i) => (
                <li key={lead} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties} className="flex gap-3">
                  <CheckIcon className="mt-1 size-5 shrink-0 text-brand-red" />
                  <p className="text-[15px] leading-relaxed text-slate-700">
                    <strong className="text-navy-900">{lead}</strong> {rest}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/about" variant="navy">
                About DRZ
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Upcoming classes */}
      <section className="py-20">
        <Container className="max-w-4xl">
          <SectionHead eyebrow="Class Schedule" title="Upcoming classes" intro="Reserve a seat in a public class, or ask for a date that suits you." />
          <div className="mt-10">
            <Reveal>
              <ScheduleList limit={3} />
            </Reveal>
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/schedule" variant="outline">
              Full Schedule
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-navy-50 py-20">
        <Container className="max-w-3xl">
          <SectionHead eyebrow="FAQ" title="Common questions" />
          <div className="mt-10">
            <FaqList items={FAQS.slice(0, 5)} openFirst />
          </div>
          <p className="mt-6 text-center text-sm">
            <Link href="/faq" className="font-semibold text-brand-red underline">
              See all questions
            </Link>
          </p>
        </Container>
      </section>

      <div className="pt-3 sm:pt-4">
        <CtaBand />
      </div>
    </>
  );
}

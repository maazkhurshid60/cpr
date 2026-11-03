import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { SITE } from "@/lib/site";
import { AwardIcon, HeartPulseIcon, UsersIcon } from "../components/Icons";
import { ButtonLink, Container, CtaBand, PageHero, SectionHead } from "../components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE.name} teaches American Heart Association CPR, First Aid, AED and BLS courses across ${SITE.serviceArea}.`,
  alternates: { canonical: "/about" },
};

/* The questionnaire says the business has "just started" and has trained 19
   students so far. The copy below leans on the AHA credential and the way
   classes are run rather than on years or volume. Instructor name and photo
   to be added when the client sends them. */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About DRZ"
        title="Be ready. Act fast. Save lives."
        intro="We teach everyday people, healthcare workers and whole teams how to respond in the first minutes of an emergency, when it matters most."
        image="/images/instructor.webp"
      />

      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead center={false} eyebrow="Our Mission" title="Confident responders, not just card holders" />
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-slate-700">
              <p>
                {SITE.name} is a new, independent training provider serving {SITE.serviceArea}. Our instructor is certified
                through the American Heart Association, and every class we teach is an official AHA course.
              </p>
              <p>
                We keep classes small and practical. You will spend most of your time on the floor with a manikin and an AED
                trainer, practicing until the steps feel natural, because that is what you will rely on in a real emergency.
              </p>
              <p>
                We train individuals at our classes and bring the same training to workplaces, schools, clinics and gyms, so
                whole teams can certify together on the same day.
              </p>
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
            <Image src="/images/cpr-hands.webp" alt="A student positioning a CPR manikin during hands-on practice" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20">
        <Container>
          <SectionHead eyebrow="What We Stand For" title="How we teach" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: AwardIcon, title: "AHA standards", text: "Official American Heart Association courses, materials and skills tests, taught by a certified instructor." },
              { icon: HeartPulseIcon, title: "Hands-on first", text: "Most of every class is practice. You leave knowing what to do, not just what you watched." },
              { icon: UsersIcon, title: "Built around you", text: "Classroom, blended or onsite, on the days that work for you and your team." },
            ].map(({ icon: Icon, title, text }, i) => (
              <li key={title} data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as CSSProperties} className="rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-red text-white">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <ButtonLink href="/courses" variant="navy">
              Explore Our Courses
            </ButtonLink>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

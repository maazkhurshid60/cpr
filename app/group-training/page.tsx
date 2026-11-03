import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import { COURSES } from "@/lib/courses";
import { SITE } from "@/lib/site";
import EnquiryForm from "../components/EnquiryForm";
import { BuildingIcon, CheckIcon, ShieldIcon, TruckIcon, UsersIcon } from "../components/Icons";
import { ButtonLink, Container, CtaBand, PageHero, SectionHead } from "../components/ui";

export const metadata: Metadata = {
  title: "Onsite CPR & First Aid Training for Businesses and Groups",
  description: `Onsite AHA CPR, First Aid, AED and BLS training for workplaces, schools, clinics and gyms in ${SITE.serviceArea}. Up to ${SITE.maxGroupPerDay} people a day. Request a quote.`,
  alternates: { canonical: "/group-training" },
};

const INDUSTRIES = [
  ["Healthcare & clinics", "BLS for nurses, medical assistants and front-desk staff."],
  ["Schools & childcare", "Pediatric First Aid, CPR & AED for teachers and caregivers."],
  ["Construction & trades", "First aid, CPR and AED for crews and site supervisors."],
  ["Gyms & fitness", "CPR and AED cards for trainers and front-desk teams."],
  ["Corporate offices", "Heartsaver for designated responders and safety teams."],
  ["Restaurants & hospitality", "Choking, burns and cardiac emergencies for front and back of house."],
  ["Manufacturing & warehouses", "First aid and CPR for shift leads and floor staff."],
  ["Government & municipal", "Training for staff, volunteers and public-facing teams."],
];

const STEPS = [
  ["Tell us about your group", "Course, number of people, location and a few dates that work."],
  ["Get a written quote", "Per-person pricing, any group discount and travel, in one clear number."],
  ["We train onsite", `We bring every manikin, AED trainer and supply, and train up to ${SITE.maxGroupPerDay} people in a day.`],
  ["Your team is certified", "Everyone who passes receives an AHA course completion card."],
];

export default function GroupTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Business & Group Training"
        title="CPR & first aid training at your workplace"
        intro={`We bring AHA training to your team, anywhere in ${SITE.serviceArea}. One day, one invoice, and everyone leaves certified.`}
        image="/images/group-cpr.webp"
      >
        <ButtonLink href="#quote">Request a Quote</ButtonLink>
        <ButtonLink href={SITE.phoneHref} variant="outline-light">
          Call {SITE.phone}
        </ButtonLink>
      </PageHero>

      {/* Benefits */}
      <section className="py-16">
        <Container>
          <ul className="grid gap-4 md:grid-cols-3">
            {[
              { icon: TruckIcon, title: "We come to you", text: "No travel for your staff. We set up in a conference room, classroom or break room." },
              { icon: UsersIcon, title: `Up to ${SITE.maxGroupPerDay} people a day`, text: "Small enough that everyone practices on the manikins. Larger teams train over several sessions." },
              { icon: BuildingIcon, title: "Easy for your office", text: "Pay by card or invoice. One contact handles scheduling, rosters and cards." },
            ].map(({ icon: Icon, title, text }, i) => (
              <li key={title} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties} className="group rounded-3xl border border-navy-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-red-50 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold">{title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Industries */}
      <section className="bg-navy-50 py-20">
        <Container>
          <SectionHead
            eyebrow="Who We Train"
            title="Training matched to your industry"
            intro="Many workplaces need trained responders on site to meet OSHA, state licensing or insurance requirements. Tell us yours and we will match the course to it."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map(([name, text], i) => (
              <li key={name} data-reveal style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as CSSProperties} className="rounded-2xl border border-transparent bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/25 hover:shadow-lg">
                <ShieldIcon className="size-7 text-brand-red" />
                <p className="mt-4 font-heading font-bold">{name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead center={false} eyebrow="How It Works" title="From quote to certified in four steps" />
            <ol className="mt-8 space-y-6">
              {STEPS.map(([title, text], i) => (
                <li key={title} data-reveal style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-900 font-heading font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="font-heading text-lg font-bold">{title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
            <Image src="/images/cpr-manikin.webp" alt="A trainee practicing CPR on a manikin during a group session" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      {/* Pricing + courses */}
      <section className="px-3 sm:px-4">
        <div className="rounded-3xl bg-navy-900 py-16">
          <Container className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHead
                center={false}
                light
                eyebrow="Group Pricing"
                title="Simple per-person pricing"
                intro="Group training is priced per person, with discounts for larger groups. Travel within Los Angeles County is included; training outside the county may add a travel fee. Every quote is in writing before you book."
              />
            </div>
            <ul className="grid gap-3 self-center">
              {COURSES.map((c) => (
                <li key={c.slug} className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-4 text-white">
                  <CheckIcon className="size-5 shrink-0 text-brand-red brightness-125" />
                  <span className="font-heading font-semibold">{c.name}</span>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="scroll-mt-32 py-20">
        <Container className="max-w-3xl">
          <SectionHead
            eyebrow="Request a Quote"
            title="Tell us about your group"
            intro="We reply with a written quote within one business day."
          />
          <div data-reveal className="mt-10 rounded-3xl border border-navy-100 bg-white p-6 shadow-sm sm:p-10">
            <EnquiryForm kind="group" />
          </div>
        </Container>
      </section>

      <CtaBand title="Questions about training your team?" text="Call us and we'll talk through the course, the day and the price." />
    </>
  );
}

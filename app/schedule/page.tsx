import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import EnquiryForm from "../components/EnquiryForm";
import ScheduleList from "../components/ScheduleList";
import { Container, CtaBand, PageHero, SectionHead } from "../components/ui";

export const metadata: Metadata = {
  title: "CPR & First Aid Class Schedule",
  description:
    "Upcoming AHA CPR, First Aid, AED and BLS classes in Los Angeles County. Reserve a seat or request a date that works for you.",
  alternates: { canonical: "/schedule" },
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        eyebrow="Class Schedule"
        title="Upcoming classes"
        intro="Reserve a seat in a public class. Don't see a date that works? Ask for one, and we'll fit you in or set up a class for your group."
        image="/images/first-aid-kit.webp"
      />

      <section className="py-20">
        <Container className="max-w-4xl">
          <ScheduleList />
        </Container>
      </section>

      <section id="reserve" className="scroll-mt-32 bg-navy-50 py-20">
        <Container className="max-w-3xl">
          <SectionHead
            eyebrow="Reserve a Seat"
            title="Request your seat"
            intro={`We confirm every request by phone or email within one business day. Pay by ${SITE.payment.toLowerCase()}.`}
          />
          <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <EnquiryForm kind="seat" />
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            Booking for six or more?{" "}
            <Link href="/group-training#quote" className="font-semibold text-brand-red underline">
              Request a group quote
            </Link>
            . Need to change a booking? See our{" "}
            <Link href="/cancellation-policy" className="font-semibold text-navy-900 underline">
              cancellation and rescheduling policy
            </Link>
            .
          </p>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

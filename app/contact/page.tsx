import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import EnquiryForm from "../components/EnquiryForm";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "../components/Icons";
import { Container, PageHero } from "../components/ui";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call ${SITE.phone} or send a message to book CPR, First Aid or BLS training in ${SITE.serviceArea}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const items = [
    { icon: PhoneIcon, label: "Phone", value: SITE.phone, href: SITE.phoneHref },
    { icon: MailIcon, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: ClockIcon, label: "Hours", value: SITE.hours },
    { icon: MapPinIcon, label: "Service area", value: `${SITE.serviceArea}. We train at your location or ours.` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's get you certified"
        intro="Questions about a course, a date or training your team? Call, email or send a message and we'll reply within one business day."
      />

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {items.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-red-50 text-brand-red">
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
                  {href ? (
                    <a href={href} className="mt-1 block break-words font-heading font-bold hover:text-brand-red">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-heading font-bold">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="rounded-2xl bg-navy-900 p-6 text-white">
              <p className="font-heading text-lg font-bold">Training a team?</p>
              <p className="mt-2 text-sm text-white/75">Use the group form so we can quote the right course, size and location.</p>
              <Link href="/group-training#quote" className="mt-4 inline-flex rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold hover:bg-brand-red-dark">
                Request a Group Quote
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm sm:p-10 lg:col-span-3">
            <h2 className="text-2xl font-extrabold">Send us a message</h2>
            <div className="mt-8">
              <EnquiryForm kind="contact" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

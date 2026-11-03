import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, priceLabel } from "@/lib/courses";
import { SITE } from "@/lib/site";
import EnquiryForm from "../components/EnquiryForm";
import { AwardIcon, CheckIcon, ClockIcon, LaptopIcon, UsersIcon } from "../components/Icons";
import { ButtonLink, Container, CtaBand, JsonLd, PageHero, SectionHead } from "../components/ui";

/**
 * One course page. Each course has its own route folder (courses/bls, …) that
 * renders this with its slug, which keeps every page fully static.
 */
export function courseMetadata(slug: string): Metadata {
  const c = getCourse(slug);
  if (!c) return {};
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: `/courses/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDescription, images: [{ url: c.image, width: 1600, height: 1067, alt: c.imageAlt }] },
  };
}

export default function CoursePage({ slug }: { slug: string }) {
  const c = getCourse(slug);
  if (!c) notFound();
  const others = COURSES.filter((o) => o.slug !== c.slug);

  const facts = [
    { icon: ClockIcon, label: "Length", value: c.duration },
    { icon: AwardIcon, label: "Certification", value: c.card },
    { icon: LaptopIcon, label: "Formats", value: c.formats.join(", ") },
    { icon: UsersIcon, label: "Price", value: priceLabel(c) },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: c.name,
          description: c.summary,
          url: `${SITE.url}/courses/${c.slug}`,
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
        }}
      />

      <PageHero eyebrow="AHA Course" title={c.name} intro={c.summary} image={c.image}>
        <ButtonLink href="#reserve">Reserve a Seat</ButtonLink>
        <ButtonLink href="/group-training#quote" variant="outline-light">
          Train a Group
        </ButtonLink>
      </PageHero>

      <section className="py-14">
        <Container>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-red-50 text-brand-red">
                  <Icon className="size-5" />
                </span>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</dt>
                  <dd className="mt-1 font-heading font-bold">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
          {c.price == null && (
            <p className="mt-4 text-sm text-slate-600">
              Call{" "}
              <a href={SITE.phoneHref} className="font-semibold text-navy-900 underline">
                {SITE.phone}
              </a>{" "}
              for the current class price. Groups are quoted per person. AHA course manuals are available to buy.
            </p>
          )}
        </Container>
      </section>

      <section className="pb-20">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold">What you&rsquo;ll learn</h2>
            <ul className="mt-6 space-y-3">
              {c.learn.map((l) => (
                <li key={l} className="flex gap-3 text-[16px] text-slate-700">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand-red" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-navy-900 p-8 text-white shadow-sm">
            <h2 className="text-2xl font-extrabold">Who it&rsquo;s for</h2>
            <ul className="mt-6 space-y-3">
              {c.whoFor.map((w) => (
                <li key={w} className="flex gap-3 text-[16px] text-white/85">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand-red brightness-125" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20">
        <Container className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHead
              center={false}
              eyebrow="Formats"
              title="Classroom, blended or onsite"
              intro="All three end with the same hands-on skills test and AHA card."
            />
            <ul className="mt-8 space-y-5 text-[15px] leading-relaxed text-slate-700">
              <li>
                <strong className="text-navy-900">Classroom.</strong> The whole course in one visit with our instructor.
              </li>
              <li>
                <strong className="text-navy-900">Blended.</strong> Finish the AHA online portion first, then a shorter in-person
                skills session.
              </li>
              <li>
                <strong className="text-navy-900">Onsite.</strong> We train your group at your workplace.{" "}
                <Link href="/group-training" className="font-semibold text-brand-red underline">
                  Group training
                </Link>
              </li>
            </ul>
          </div>
          <div id="reserve" className="scroll-mt-36 rounded-3xl bg-white p-6 shadow-sm sm:p-10 lg:col-span-3">
            <h2 className="text-2xl font-extrabold">Reserve a seat</h2>
            <p className="mt-2 text-[15px] text-slate-600">
              Send your details and we&rsquo;ll confirm your class by phone or email. Pay by {SITE.payment.toLowerCase()}.
            </p>
            <div className="mt-8">
              <EnquiryForm kind="seat" defaultCourse={c.name} />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-2xl font-extrabold sm:text-3xl">Other courses</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/courses/${o.slug}`}
                className="group flex items-center gap-5 rounded-2xl border border-navy-100 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
                  <Image src={o.image} alt="" fill sizes="96px" className="object-cover" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold group-hover:text-brand-red">{o.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{o.audience}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

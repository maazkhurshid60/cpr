import type { Metadata } from "next";
import Link from "next/link";
import { FAQS, FAQ_TOPICS } from "@/lib/faqs";
import { SITE } from "@/lib/site";
import { AwardIcon, CalendarIcon, MailIcon, PhoneIcon, UsersIcon } from "../components/Icons";
import { Container, CtaBand, FaqList, JsonLd, PageHero, faqSchema } from "../components/ui";

export const metadata: Metadata = {
  title: "CPR & First Aid Class FAQ",
  description:
    "Answers about AHA CPR, First Aid and BLS classes: which course you need, blended learning, group pricing, payment, certification cards and rescheduling.",
  alternates: { canonical: "/faq" },
};

const TOPIC_ICONS = { "Courses & Certification": AwardIcon, "Booking & Payment": CalendarIcon, "Group & Onsite Training": UsersIcon };
const slug = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, "-");

const GROUPS = FAQ_TOPICS.map((t) => ({ topic: t, items: FAQS.filter((f) => f.topic === t) }));
/** Each topic's first question number, so numbering runs on across topics. */
const STARTS = GROUPS.map((_, i) => 1 + GROUPS.slice(0, i).reduce((sum, g) => sum + g.items.length, 0));

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="Everything you need to know before your class, from choosing a course to booking your team. Still have a question? We're a phone call away."
        image="/images/cpr-hands.webp"
      />

      <section className="bg-navy-50 py-20">
        <Container className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-14">
          {/* Topic links and help, sticky on desktop */}
          <aside className="lg:sticky lg:top-36 lg:self-start">
            <nav aria-label="FAQ topics" className="rounded-3xl bg-white p-3 shadow-sm">
              <p className="px-3 pb-2 pt-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Topics</p>
              <ul>
                {FAQ_TOPICS.map((t) => {
                  const Icon = TOPIC_ICONS[t];
                  const count = FAQS.filter((f) => f.topic === t).length;
                  return (
                    <li key={t}>
                      <a
                        href={`#${slug(t)}`}
                        className="group flex items-center gap-3 rounded-2xl px-3 py-3 font-heading text-[15px] font-semibold text-navy-900 transition-colors hover:bg-navy-50 hover:text-brand-red"
                      >
                        <span className="grid size-9 place-items-center rounded-xl bg-brand-red-50 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                          <Icon className="size-[18px]" />
                        </span>
                        <span className="flex-1">{t}</span>
                        <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs text-slate-500">{count}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative mt-5 overflow-hidden rounded-3xl bg-navy-900 p-7 text-white">
              <div className="absolute -right-10 -top-10 size-36 rounded-full bg-brand-red/25 blur-2xl" aria-hidden="true" />
              <p className="relative font-heading text-xl font-extrabold">Still have questions?</p>
              <p className="relative mt-2 text-sm leading-relaxed text-white/75">Talk to our instructor. We&rsquo;ll help you pick the right course.</p>
              <div className="relative mt-5 grid gap-2.5">
                <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-semibold transition-colors hover:bg-brand-red-dark">
                  <PhoneIcon className="size-4" />
                  {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-navy-900">
                  <MailIcon className="size-4" />
                  Email Us
                </a>
              </div>
            </div>
          </aside>

          <div className="space-y-14">
            {GROUPS.map(({ topic: t, items }, gi) => {
              const start = STARTS[gi];
              const Icon = TOPIC_ICONS[t];
              return (
                <div key={t} id={slug(t)} className="scroll-mt-36">
                  <div className="mb-5 flex items-center gap-3" data-reveal>
                    <span className="grid size-11 place-items-center rounded-2xl bg-navy-900 text-white">
                      <Icon className="size-5" />
                    </span>
                    <h2 className="text-2xl font-extrabold">{t}</h2>
                  </div>
                  <FaqList items={items} start={start} openFirst={t === FAQ_TOPICS[0]} />
                </div>
              );
            })}
            <p className="text-sm text-slate-600" data-reveal>
              Looking for our rules on changes and refunds? Read the{" "}
              <Link href="/cancellation-policy" className="font-semibold text-brand-red underline">
                cancellation and rescheduling policy
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

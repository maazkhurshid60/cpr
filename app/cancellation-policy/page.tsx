import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Container, PageHero } from "../components/ui";

export const metadata: Metadata = {
  title: "Cancellation & Rescheduling Policy",
  description: `Cancellation, rescheduling and refund policy for ${SITE.name} classes and onsite group training.`,
  alternates: { canonical: "/cancellation-policy" },
};

/* The client asked for this to be written ("We need one written"). It is a
   draft for the owner to approve: the notice periods and fees are common
   industry terms, not figures the client supplied. */
export default function CancellationPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        title="Cancellation & rescheduling policy"
        intro="Plans change. Here is how to move or cancel a class, and what happens if we have to."
      />

      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="prose-site">
            <h2>Individual classes</h2>
            <ul>
              <li>
                <strong>3 or more days before class:</strong> reschedule for free, or cancel for a full refund.
              </li>
              <li>
                <strong>1 to 3 days before class:</strong> reschedule once for free. Cancellations in this window are not
                refunded.
              </li>
              <li>
                <strong>Less than 24 hours before class, or no-show:</strong> no refund. You may reschedule for a $25 fee.
              </li>
              <li>
                <strong>Late arrival:</strong> AHA courses require you to attend the whole class. If you arrive more than 15
                minutes late, we may ask you to reschedule, and the rules above apply.
              </li>
            </ul>

            <h2>Blended learning</h2>
            <p>
              Once an AHA online course key has been issued to you, its cost cannot be refunded, because the key cannot be
              reused. You can still reschedule your in-person skills session under the rules above.
            </p>

            <h2>Group and onsite training</h2>
            <ul>
              <li>
                <strong>7 or more days before the session:</strong> reschedule or cancel at no charge.
              </li>
              <li>
                <strong>2 to 7 days before:</strong> reschedule once at no charge. If you cancel, any non-refundable costs
                already paid, such as travel or course materials, will be billed.
              </li>
              <li>
                <strong>Less than 48 hours before:</strong> 50% of the quoted session price is due.
              </li>
              <li>
                <strong>Fewer people on the day:</strong> group quotes are per person. We bill for the number confirmed 48 hours
                before the session.
              </li>
            </ul>

            <h2>If we cancel</h2>
            <p>
              If we have to cancel a class because of illness, emergency or low enrollment, we will contact you as soon as
              possible and offer a new date or a full refund, whichever you prefer.
            </p>

            <h2>How to cancel or reschedule</h2>
            <p>
              Call <a href={SITE.phoneHref}>{SITE.phone}</a> or email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your
              name, course and class date. The time we receive your message is the time we use for this policy.
            </p>
            <p>
              Questions? <Link href="/contact">Contact us</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

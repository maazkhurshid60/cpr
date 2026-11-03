import Link from "next/link";
import { SITE } from "@/lib/site";
import { COURSES } from "@/lib/courses";
import CurrentYear from "./CurrentYear";
import Logo from "./Logo";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            American Heart Association CPR, First Aid, AED and BLS training for individuals and teams across{" "}
            {SITE.serviceArea}.
          </p>
          <p className="mt-4 font-heading text-sm font-bold uppercase tracking-wider text-white">{SITE.tagline}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Courses</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {COURSES.map((c) => (
              <li key={c.slug}>
                <Link href={`/courses/${c.slug}`} className="hover:text-white">
                  {c.short}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/group-training" className="hover:text-white">
                Group &amp; Onsite Training
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["Class Schedule", "/schedule"],
              ["About", "/about"],
              ["FAQ", "/faq"],
              ["Contact", "/contact"],
              ["Cancellation & Rescheduling Policy", "/cancellation-policy"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Get in Touch</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-2.5 hover:text-white">
                <PhoneIcon className="size-4 text-brand-red" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 break-all hover:text-white">
                <MailIcon className="size-4 shrink-0 text-brand-red" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <ClockIcon className="size-4 text-brand-red" />
              {SITE.hours}
            </li>
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-brand-red" />
              We train at your location or ours, across {SITE.serviceArea}.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs leading-relaxed text-white/60 sm:px-6">
          <p>
            <span className="font-semibold text-white/80">CPR and first aid classes near you:</span>{" "}
            {SITE.cities.join(" · ")}, and across {SITE.counties.slice(1).join(", ")} counties.
          </p>
          <p className="mt-3">
            © <CurrentYear /> {SITE.legalName}. Courses are taught by an American Heart Association certified instructor.
            The AHA strongly promotes knowledge and proficiency in all AHA courses and has developed instructional materials for this
            purpose. Use of these materials in an educational course does not represent course sponsorship by the AHA.
          </p>
        </div>
      </div>
    </footer>
  );
}

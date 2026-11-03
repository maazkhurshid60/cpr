"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "@/lib/enquiry";
import { COURSES } from "@/lib/courses";
import { SCHEDULE } from "@/lib/schedule";
import { SITE } from "@/lib/site";

type Kind = "seat" | "group" | "contact";

const INDUSTRIES = [
  "Healthcare or clinic",
  "School or childcare",
  "Construction or trades",
  "Gym or fitness",
  "Corporate office",
  "Restaurant or hospitality",
  "Manufacturing or warehouse",
  "Government or municipal",
  "Other",
];

const input =
  "w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-[15px] text-navy-900 placeholder:text-slate-400 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/15";
const label = "mb-1.5 block text-sm font-semibold text-navy-900";

function Field({ id, text, required, children }: { id: string; text: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function EnquiryForm({ kind, defaultCourse = "" }: { kind: Kind; defaultCourse?: string }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, null);
  const id = (f: string) => `${kind}-${f}`;

  if (state?.ok) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <p className="font-heading text-lg font-bold">Request received</p>
        <p className="mt-2 text-[15px] leading-relaxed">{state.message}</p>
      </div>
    );
  }

  // Classes with seats left. An empty schedule asks for preferred dates instead.
  const sessions = SCHEDULE.filter((s) => s.seats > 0);

  return (
    <form action={action} className="relative grid gap-5">
      <input type="hidden" name="kind" value={kind} />
      {/* Honeypot, hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} text={kind === "group" ? "Your name" : "Full name"} required>
          <input id={id("name")} name="name" required autoComplete="name" className={input} />
        </Field>
        {kind === "group" ? (
          <Field id={id("company")} text="Organization">
            <input id={id("company")} name="company" autoComplete="organization" className={input} />
          </Field>
        ) : (
          <Field id={id("phone")} text="Phone" required={kind === "seat"}>
            <input id={id("phone")} name="phone" type="tel" required={kind === "seat"} autoComplete="tel" className={input} />
          </Field>
        )}
        <Field id={id("email")} text="Email" required>
          <input id={id("email")} name="email" type="email" required autoComplete="email" className={input} />
        </Field>
        {kind === "group" && (
          <Field id={id("phone")} text="Phone" required>
            <input id={id("phone")} name="phone" type="tel" required autoComplete="tel" className={input} />
          </Field>
        )}
        {kind !== "contact" && (
          <Field id={id("course")} text="Course" required>
            <select id={id("course")} name="course" required defaultValue={defaultCourse} className={input}>
              <option value="" disabled>
                Choose a course
              </option>
              {COURSES.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
              <option value="Not sure yet">Not sure yet, please advise</option>
            </select>
          </Field>
        )}

        {kind === "seat" &&
          (sessions.length ? (
            <Field id={id("session")} text="Class date" required>
              <select id={id("session")} name="session" required defaultValue="" className={input}>
                <option value="" disabled>
                  Choose a date
                </option>
                {sessions.map((s) => (
                  <option key={s.id} value={`${s.dateLabel}, ${s.time}, ${s.location}`}>
                    {s.dateLabel} · {s.time} · {s.location}
                  </option>
                ))}
                <option value="Another date">None of these, I need another date</option>
              </select>
            </Field>
          ) : (
            <Field id={id("dates")} text="Preferred dates">
              <input id={id("dates")} name="dates" placeholder="e.g. weekends in December" className={input} />
            </Field>
          ))}
        {kind === "seat" && (
          <Field id={id("seats")} text="Number of seats">
            <input id={id("seats")} name="seats" type="number" min={1} max={SITE.maxGroupPerDay} defaultValue={1} className={input} />
          </Field>
        )}

        {kind === "group" && (
          <>
            <Field id={id("groupSize")} text="Number of people" required>
              <input id={id("groupSize")} name="groupSize" type="number" min={1} required className={input} />
            </Field>
            <Field id={id("industry")} text="Industry">
              <select id={id("industry")} name="industry" defaultValue="" className={input}>
                <option value="">Choose one</option>
                {INDUSTRIES.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </Field>
            <Field id={id("location")} text="Where should we train?">
              <select id={id("location")} name="location" defaultValue="At our workplace" className={input}>
                <option>At our workplace</option>
                <option>At your training site</option>
                <option>Not sure yet</option>
              </select>
            </Field>
            <Field id={id("city")} text="City">
              <input id={id("city")} name="city" placeholder="e.g. Pasadena" autoComplete="address-level2" className={input} />
            </Field>
            <Field id={id("dates")} text="Preferred dates">
              <input id={id("dates")} name="dates" placeholder="e.g. a weekday in mid-January" className={input} />
            </Field>
            <Field id={id("payment")} text="How would you like to pay?">
              <select id={id("payment")} name="payment" defaultValue="" className={input}>
                <option value="">No preference</option>
                <option>Invoice</option>
                <option>Card</option>
              </select>
            </Field>
          </>
        )}
      </div>

      <Field id={id("message")} text={kind === "contact" ? "How can we help?" : "Anything else we should know?"} required={kind === "contact"}>
        <textarea
          id={id("message")}
          name="message"
          rows={kind === "contact" ? 5 : 3}
          required={kind === "contact"}
          placeholder={kind === "group" ? "e.g. requirements from your licensing agency or insurer" : undefined}
          className={input}
        />
      </Field>

      {state && !state.ok && (
        <p role="alert" className="rounded-xl border border-brand-red/30 bg-brand-red-50 px-4 py-3 text-sm text-brand-red-dark">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-red-dark disabled:opacity-60"
        >
          {pending ? "Sending…" : kind === "group" ? "Request a Quote" : kind === "seat" ? "Request My Seat" : "Send Message"}
        </button>
        <p className="text-sm text-slate-500">
          Prefer to talk?{" "}
          <a href={SITE.phoneHref} className="font-semibold text-navy-900 underline">
            {SITE.phone}
          </a>
        </p>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCourse } from "@/lib/courses";
import { SCHEDULE, type ClassSession } from "@/lib/schedule";
import { CalendarIcon, ClockIcon, MapPinIcon } from "./Icons";

/**
 * Upcoming classes from lib/schedule.ts.
 *
 * Past classes are hidden after mount rather than during render: today's date
 * differs between the build and the visitor, and reading it while rendering
 * would fail the prerender with Cache Components on.
 */
export default function ScheduleList({ limit }: { limit?: number }) {
  const [sessions, setSessions] = useState<ClassSession[]>(SCHEDULE);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hiding past dates needs the visitor's clock
    setSessions(SCHEDULE.filter((s) => s.date >= today).sort((a, b) => a.date.localeCompare(b.date)));
  }, []);

  const shown = limit ? sessions.slice(0, limit) : sessions;

  if (!shown.length) {
    return (
      <div className="rounded-2xl border border-dashed border-navy-100 bg-navy-50 p-8 text-center">
        <CalendarIcon className="mx-auto size-10 text-navy-700" />
        <p className="mt-4 font-heading text-lg font-bold">New class dates are being scheduled</p>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-slate-600">
          Tell us which course you need and the dates that suit you. We&rsquo;ll fit you into the next class or set one up for
          your group.
        </p>
        <Link
          href="/schedule#reserve"
          className="mt-6 inline-flex rounded-full bg-brand-red px-6 py-3 font-semibold text-white hover:bg-brand-red-dark"
        >
          Request a Date
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-4">
      {shown.map((s) => {
        const course = getCourse(s.course);
        const full = s.seats <= 0;
        return (
          <li
            key={s.id}
            className="flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-heading text-lg font-bold">{course?.name ?? s.course}</p>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="size-4 text-brand-red" />
                  {s.dateLabel}
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="size-4 text-brand-red" />
                  {s.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="size-4 text-brand-red" />
                  {s.location}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm font-semibold ${full ? "text-slate-500" : s.seats <= 3 ? "text-brand-red" : "text-emerald-700"}`}>
                {full ? "Class full" : `${s.seats} seat${s.seats === 1 ? "" : "s"} left`}
              </span>
              {!full && (
                <Link href="/schedule#reserve" className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
                  Reserve
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

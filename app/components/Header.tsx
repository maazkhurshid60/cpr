"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { COURSES } from "@/lib/courses";
import Logo from "./Logo";
import { ChevronDownIcon, ClockIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "./Icons";

const NAV = [
  { label: "Courses", href: "/courses", sub: COURSES.map((c) => ({ label: c.short, href: `/courses/${c.slug}` })) },
  { label: "Group Training", href: "/group-training" },
  { label: "Class Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Stop the page scrolling under the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40">
      {/* Utility bar */}
      <div className="bg-navy-950 text-[13px] text-white/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <div className="flex items-center gap-5">
            <a href={SITE.phoneHref} className="flex items-center gap-1.5 hover:text-white">
              <PhoneIcon className="size-3.5" />
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="hidden items-center gap-1.5 hover:text-white sm:flex">
              <MailIcon className="size-3.5" />
              {SITE.email}
            </a>
          </div>
          <div className="hidden items-center gap-1.5 md:flex">
            <ClockIcon className="size-3.5" />
            {SITE.hours} · AHA-certified instructor
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-navy-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors ${
                      isActive(item.href) ? "text-brand-red" : "text-navy-900 hover:text-brand-red"
                    }`}
                  >
                    {item.label}
                    {item.sub && <ChevronDownIcon className="size-4" />}
                  </Link>
                  {item.sub && (
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="w-72 rounded-2xl border border-navy-100 bg-white p-2 shadow-xl">
                        {item.sub.map((s) => (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-navy-900 hover:bg-navy-50 hover:text-brand-red"
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/schedule#reserve"
              className="hidden rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-red-dark sm:inline-flex"
            >
              Book a Class
            </Link>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full text-navy-900 hover:bg-navy-50 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[104px] overflow-y-auto bg-white lg:hidden">
          {/* Any link click closes the menu (clicks bubble up from the links). */}
          <nav aria-label="Mobile" className="px-4 pb-10 pt-4" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
            <ul className="divide-y divide-navy-100">
              {NAV.map((item) => (
                <li key={item.href} className="py-1">
                  <Link href={item.href} className="block py-3 font-heading text-lg font-semibold text-navy-900">
                    {item.label}
                  </Link>
                  {item.sub && (
                    <ul className="mb-2 border-l-2 border-brand-red/30 pl-4">
                      {item.sub.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href} className="block py-2 text-[15px] text-navy-700">
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3">
              <Link href="/schedule#reserve" className="rounded-full bg-brand-red px-5 py-3.5 text-center font-semibold text-white">
                Book a Class
              </Link>
              <a href={SITE.phoneHref} className="rounded-full border border-navy-900 px-5 py-3.5 text-center font-semibold text-navy-900">
                Call {SITE.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

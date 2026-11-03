"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal for any element marked `data-reveal`.
 *
 * Only elements that start BELOW the fold are hidden (by adding
 * `reveal-pending`), then revealed as they scroll into view. Content already
 * on screen is never hidden, nothing is hidden without JavaScript, and nothing
 * animates for visitors who ask for reduced motion. A `--reveal-delay` style
 * on an element staggers it after its neighbours.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Also reveal anything already scrolled past (a fast fling or an
          // anchor jump can skip an element without it ever intersecting).
          if (!e.isIntersecting && e.boundingClientRect.top > 0) continue;
          e.target.classList.add("is-revealed");
          e.target.classList.remove("reveal-pending");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) continue;
      el.classList.add("reveal-pending");
      io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

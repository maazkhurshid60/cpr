import type { MetadataRoute } from "next";

// Written to a file at build time, as the static export requires.
export const dynamic = "force-static";
import { COURSES } from "@/lib/courses";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/courses",
    ...COURSES.map((c) => `/courses/${c.slug}`),
    "/group-training",
    "/schedule",
    "/about",
    "/faq",
    "/contact",
    "/cancellation-policy",
  ];
  return paths.map((p) => ({ url: `${SITE.url}${p}` }));
}

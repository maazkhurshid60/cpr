import type { MetadataRoute } from "next";
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

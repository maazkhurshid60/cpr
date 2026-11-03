import type { MetadataRoute } from "next";

// Written to a file at build time, as the static export requires.
export const dynamic = "force-static";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

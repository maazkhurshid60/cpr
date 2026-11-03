import type { NextConfig } from "next";

/* GitHub Pages serves a project site from a sub-path (username.github.io/cpr),
   so every route and asset needs that prefix. The deploy workflow sets
   NEXT_PUBLIC_BASE_PATH from the Pages settings; it is empty locally and once
   a custom domain is attached, which serves from the root. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML in out/, which is all GitHub Pages can host.
  output: "export",
  basePath,
  images: {
    // Pages has no image optimizer. The loader just adds the base path.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  experimental: {
    agentFeedback: true,
  },
  /* Cache Components and partial prefetching were on here. They are server
     features, they have nothing to do on a static host, and Cache Components
     rejects the `dynamic = "force-static"` that the export needs on
     robots.txt and sitemap.xml. */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  "",
  "/about",
  "/bnys",
  "/admissions",
  "/campus",
  "/gallery",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until actual content revision dates are maintained.
  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
  }));
}

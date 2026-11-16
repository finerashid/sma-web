import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

const routes = [
  "",
  "/about",
  "/bnys",
  "/admissions",
  "/campus",
  "/gallery",
  "/news",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 || route === "/admissions" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route === "/bnys" || route === "/admissions" ? 0.9 : 0.7,
  }));
}

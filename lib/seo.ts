import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = `${title} | ${siteConfig.shortName}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical },
    robots: {
      index,
      follow: true,
      googleBot: { index, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.shortName,
      title: fullTitle,
      description,
      images: [
        {
          url: absoluteUrl("/og.png"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.shortName} — BNYS in Bhopal`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/og.png")],
    },
  };
}

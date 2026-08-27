import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  "img-src 'self' data: blob:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  `connect-src 'self'${isDevelopment ? " ws: wss:" : ""} https://www.google-analytics.com https://region1.google-analytics.com`,
  "frame-src https://www.google.com",
  "font-src 'self' data:",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  ...(isDevelopment ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/aboutus.php", destination: "/about", permanent: true },
      { source: "/services.php", destination: "/bnys", permanent: true },
      { source: "/registration.php", destination: "/admissions", permanent: true },
      { source: "/gallery.php", destination: "/gallery", permanent: true },
      { source: "/contact.php", destination: "/contact", permanent: true },
      { source: "/service1.php", destination: "/campus", permanent: true },
      { source: "/colleg.php", destination: "/campus", permanent: true },
      { source: "/lib.php", destination: "/campus", permanent: true },
      { source: "/hostal.php", destination: "/campus", permanent: true },
      { source: "/hospital.php", destination: "/campus", permanent: true },
      { source: "/on.php", destination: "/campus", permanent: true },
      { source: "/digi.php", destination: "/campus", permanent: true },
      { source: "/dirc.php", destination: "/about", permanent: true },
      { source: "/dirc1.php", destination: "/about", permanent: true },
      { source: "/dirc2.php", destination: "/about", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

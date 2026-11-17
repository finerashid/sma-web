import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SMA Medical College of Naturopathy & Yogic Sciences",
    short_name: "SMA Medical College",
    description: "BNYS programme and admissions information in Bhopal.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5ee",
    theme_color: "#124c3f",
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }],
  };
}

import { GalleryGrid } from "@/components/gallery-grid";
import { PageHero } from "@/components/page-hero";
import { getGalleryAlbums } from "@/lib/gallery";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata = createMetadata({
  title: "Bhopal Campus Photos & Student Activities",
  description: "See SMA Medical College in Bhopal through campus photos, BNYS laboratory and clinical training, yoga activities and student events.",
  path: "/gallery",
});

export default function GalleryPage() {
  const albums = getGalleryAlbums();
  const photoCount = albums.reduce((total, album) => total + album.images.length, 0);

  return (
    <>
      <PageHero path="/gallery" eyebrow="Campus gallery" title="Learning and life at SMA" description={`${albums.length} albums and ${photoCount} photographs from the college campus, practical learning and community activities.`} />
      <section className="section gallery-page"><div className="container"><GalleryGrid albums={albums} /></div></section>
    </>
  );
}

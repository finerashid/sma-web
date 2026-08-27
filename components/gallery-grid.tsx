"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryAlbum } from "@/lib/gallery";

type SelectedImage = {
  src: string;
  alt: string;
  album: string;
  index: number;
};

function albumId(name: string) {
  return `album-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export function GalleryGrid({ albums }: { albums: GalleryAlbum[] }) {
  const allImages = useMemo(
    () =>
      albums.flatMap((album) =>
        album.images.map((image) => ({ ...image, album: album.name })),
      ),
    [albums],
  );
  const [selected, setSelected] = useState<SelectedImage | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const move = useCallback((direction: number) => {
    setSelected((current) => {
      if (!current || allImages.length < 2) return current;
      const nextIndex = (current.index + direction + allImages.length) % allImages.length;
      const next = allImages[nextIndex];
      return { ...next, index: nextIndex };
    });
  }, [allImages]);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "Tab") {
        const dialog = closeButtonRef.current?.closest<HTMLElement>("[role='dialog']");
        const controls = dialog?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [move, selected]);

  const openImage = (src: string, alt: string, album: string, trigger: HTMLElement) => {
    const index = allImages.findIndex((image) => image.src === src);
    returnFocusRef.current = trigger;
    setSelected({ src, alt, album, index });
  };

  if (albums.length === 0) {
    return (
      <div className="gallery-empty">
        <h2>Gallery albums will appear here</h2>
        <p>Add a folder inside <code>public/gallery</code> and place images inside it.</p>
      </div>
    );
  }

  return (
    <>
      <div className="album-list">
        {albums.map((album) => (
          <section className="album-section" key={album.name} aria-labelledby={albumId(album.name)}>
            <div className="album-heading">
              <h2 id={albumId(album.name)}>{album.name}</h2>
              <span>{album.images.length} {album.images.length === 1 ? "photo" : "photos"}</span>
            </div>
            {album.images.length ? (
              <div className="photo-grid">
                {album.images.map((image) => (
                  <button
                    key={image.src}
                    className="photo-button"
                    type="button"
                    onClick={(event) => openImage(image.src, image.alt, album.name, event.currentTarget)}
                    aria-label={`Open ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={760}
                      height={520}
                      sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                    />
                    <span>{image.alt}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="album-empty">No supported images are inside this folder yet.</p>
            )}
          </section>
        ))}
      </div>

      {selected ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-caption"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <button ref={closeButtonRef} className="lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close image">
            <X aria-hidden="true" />
          </button>
          <button className="lightbox-nav lightbox-prev" type="button" onClick={() => move(-1)} aria-label="Previous image">
            <ChevronLeft aria-hidden="true" />
          </button>
          <figure>
            <Image src={selected.src} alt={selected.alt} width={1500} height={1000} sizes="95vw" priority />
            <figcaption id="lightbox-caption"><strong>{selected.alt}</strong><span>{selected.album}</span></figcaption>
          </figure>
          <button className="lightbox-nav lightbox-next" type="button" onClick={() => move(1)} aria-label="Next image">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}

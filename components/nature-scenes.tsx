"use client";

import Image from "next/image";
import { Droplets, Leaf, Wind } from "lucide-react";
import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";
import { siteConfig } from "@/content/site";

function usePerspectiveMotion() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const updatePerspective = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const scene = sceneRef.current;
    if (
      !scene ||
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const bounds = scene.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    scene.style.setProperty("--scene-rotate-x", `${vertical * -8}deg`);
    scene.style.setProperty("--scene-rotate-y", `${horizontal * 10}deg`);
    scene.style.setProperty("--scene-shift-x", `${horizontal * 18}px`);
    scene.style.setProperty("--scene-shift-y", `${vertical * 14}px`);
  }, []);

  const resetPerspective = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.style.setProperty("--scene-rotate-x", "0deg");
    scene.style.setProperty("--scene-rotate-y", "0deg");
    scene.style.setProperty("--scene-shift-x", "0px");
    scene.style.setProperty("--scene-shift-y", "0px");
  }, []);

  return { sceneRef, updatePerspective, resetPerspective };
}

function FloatingLeaves() {
  return (
    <div className="floating-leaves" aria-hidden="true">
      <i className="nature-leaf nature-leaf-one" />
      <i className="nature-leaf nature-leaf-two" />
      <i className="nature-leaf nature-leaf-three" />
      <i className="nature-leaf nature-leaf-four" />
    </div>
  );
}

export function NatureHeroScene() {
  const { sceneRef, updatePerspective, resetPerspective } = usePerspectiveMotion();

  return (
    <div
      ref={sceneRef}
      className="hero-image-wrap nature-hero-scene"
      onPointerMove={updatePerspective}
      onPointerLeave={resetPerspective}
    >
      <div className="water-platform" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="hero-image-card">
        <Image
          src="/images/campus-hero.webp"
          alt="High-angle view of SMA Medical College campus in Bhopal"
          width={1088}
          height={816}
          priority
          sizes="(max-width: 900px) 100vw, 48vw"
        />
        <div className="hero-image-shade" />
        <span className="hero-image-label">SMA campus, Bhopal</span>
      </div>

      <div className="water-orb" aria-hidden="true">
        <span className="water-orb-glint" />
        <span className="water-orb-core" />
      </div>
      <FloatingLeaves />

      <div className="floating-fact floating-fact-one">
        <strong>{siteConfig.programme.duration}</strong>
        <span>Programme duration</span>
      </div>
      <div className="floating-fact floating-fact-two">
        <strong>{siteConfig.programme.internship}</strong>
        <span>Compulsory internship</span>
      </div>
      <p className="scene-instruction">Move to explore</p>
    </div>
  );
}

export function NatureElementScene() {
  const { sceneRef, updatePerspective, resetPerspective } = usePerspectiveMotion();

  return (
    <div
      ref={sceneRef}
      className="element-scene"
      onPointerMove={updatePerspective}
      onPointerLeave={resetPerspective}
      aria-label="The natural elements explored through BNYS learning"
    >
      <div className="element-scene-depth" aria-hidden="true">
        <div className="element-pool">
          <span />
          <span />
          <span />
        </div>
        <div className="element-sphere">
          <Leaf aria-hidden="true" />
        </div>
        <i className="nature-leaf element-leaf-one" />
        <i className="nature-leaf element-leaf-two" />
      </div>

      <article className="element-card element-card-water">
        <Droplets aria-hidden="true" />
        <span>Water</span>
        <strong>Hydrotherapy</strong>
      </article>
      <article className="element-card element-card-earth">
        <Leaf aria-hidden="true" />
        <span>Earth</span>
        <strong>Nature cure</strong>
      </article>
      <article className="element-card element-card-air">
        <Wind aria-hidden="true" />
        <span>Breath</span>
        <strong>Yoga practice</strong>
      </article>
    </div>
  );
}

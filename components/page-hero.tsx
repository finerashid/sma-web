import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-nature" aria-hidden="true">
        <i className="page-hero-leaf page-hero-leaf-one" />
        <i className="page-hero-leaf page-hero-leaf-two" />
        <span className="page-hero-orb" />
        <span className="page-hero-ripple page-hero-ripple-one" />
        <span className="page-hero-ripple page-hero-ripple-two" />
      </div>
      <div className="container page-hero-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-lead">{description}</p>
        {children}
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <section className="page-hero"><div className="page-botanical" aria-hidden="true"><span /><span /><i /></div><div className="container page-hero-inner"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-lead">{description}</p>{children}</div></section>;
}

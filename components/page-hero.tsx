import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function PageHero({ eyebrow, title, description, path, breadcrumb, children }: { eyebrow: string; title: string; description: string; path: string; breadcrumb?: string; children?: ReactNode }) {
  return <section className="page-hero"><div className="page-botanical" aria-hidden="true"><span /><span /><i /></div><div className="container page-hero-inner"><Breadcrumbs name={breadcrumb || eyebrow} path={path} /><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-lead">{description}</p>{children}</div></section>;
}

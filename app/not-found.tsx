import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found container">
      <p className="eyebrow">404</p>
      <h1>We couldn’t find that page</h1>
      <p>The page may have moved during the website migration.</p>
      <Link className="button button-primary" href="/">Return to homepage</Link>
    </section>
  );
}

"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { publishedLeadership } from "@/content/site";

export function LeadershipMessages() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const selected = selectedIndex === null ? null : publishedLeadership[selectedIndex];

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [selected]);

  const openMessage = (index: number, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger;
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="leadership-grid">
        {publishedLeadership.map((leader, index) => (
          <article key={leader.name}>
            <div className="leadership-portrait">
              <Image
                src={leader.image}
                alt={leader.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <span className="leadership-number">0{index + 1}</span>
            </div>
            <div className="leadership-copy">
              <p className="leadership-role">{leader.publishedTitle}</p>
              <h3>{leader.name}</h3>
              <strong>{leader.focus}</strong>
              <p>{leader.summary}</p>
              <button
                className="leadership-read-more"
                type="button"
                onClick={(event) => openMessage(index, event.currentTarget)}
                aria-haspopup="dialog"
              >
                Read full message
                <ArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selected ? (
        <div
          className="leadership-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedIndex(null);
          }}
        >
          <div
            className="leadership-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leadership-dialog-title"
          >
            <button
              ref={closeButtonRef}
              className="leadership-modal-close"
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close leadership message"
            >
              <X aria-hidden="true" />
            </button>

            <aside className="leadership-modal-profile">
              <div className="leadership-modal-image">
                <Image src={selected.image} alt={selected.imageAlt} fill sizes="320px" />
              </div>
              <p>{selected.publishedTitle}</p>
              <h3>{selected.name}</h3>
              <span>{selected.focus}</span>
            </aside>

            <div className="leadership-modal-content">
              <p className="leadership-modal-kicker">A message from</p>
              <h2 id="leadership-dialog-title">{selected.name}</h2>
              <p className="leadership-modal-salutation">{selected.salutation}</p>
              {selected.quote ? <blockquote>{selected.quote}</blockquote> : null}
              <div className="leadership-modal-message">
                {selected.message.map((paragraph, index) => (
                  <p
                    className="leadership-animated-line"
                    style={{ animationDelay: `${220 + index * 85}ms` }}
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="leadership-modal-signoff">
                <p>{selected.closing}</p>
                <strong>{selected.name}</strong>
                {selected.credentials ? <span>{selected.credentials}</span> : null}
                <span>{selected.publishedTitle}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

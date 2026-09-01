"use client";

import { useEffect, useRef, useState } from "react";
import { lifecycle } from "@/data/site";

export default function LifecyclePath() {
  const wrapRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        setActive(lifecycle.length - 1);
        return;
      }
      const r = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const p = (anchor - r.top) / r.height;
      setProgress(Math.max(0, Math.min(1, p)));
      setActive(Math.max(0, Math.min(lifecycle.length - 1, Math.floor(p * lifecycle.length))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={wrapRef} className="relative ps-0 list-none">
      {/* rail */}
      <div className="absolute top-2 bottom-2 start-[13px] w-px bg-rule" aria-hidden="true">
        <div
          className="absolute top-0 inset-x-0 bg-brand origin-top"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {lifecycle.map((s, i) => {
        const on = i <= active;
        return (
          <li key={s.step} className="relative ps-12 pb-12 last:pb-0">
            <span
              className={`absolute start-[6px] top-1 w-4 h-4 rounded-full border-2 transition-colors duration-500 ${
                on ? "bg-brand border-brand" : "bg-paper border-rule"
              }`}
              aria-hidden="true"
            />
            <div
              className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-45"}`}
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className={`label ${on ? "text-brand-light" : "text-ink-3"}`}>{s.step}</span>
                <h3 className="text-[19px] md:text-[21px] font-semibold">{s.label}</h3>
              </div>
              <p className="mt-1 label text-ink-3">{s.company}</p>
              <p className="mt-3 text-ink-2 leading-relaxed measure">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || open
          ? "bg-paper/95 backdrop-blur border-b border-rule"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="flex items-center justify-between h-[68px] gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="פורמולה תשתיות — לעמוד הבית">
            <Image
              src={scrolled || open ? "/brand/logo-dark.png" : "/brand/logo-light.png"}
              alt="פורמולה תשתיות"
              width={742}
              height={226}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="ניווט ראשי">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-[15px] rounded transition-colors ${
                    scrolled
                      ? active
                        ? "text-brand font-medium"
                        : "text-ink-2 hover:text-ink"
                      : active
                        ? "text-white font-medium"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden -me-2 p-2 ${scrolled || open ? "text-ink" : "text-white"}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "סגירת התפריט" : "פתיחת התפריט"}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              {open ? (
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.6" fill="none" />
              ) : (
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" fill="none" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden bg-paper border-t border-rule"
          aria-label="ניווט ראשי — מובייל"
        >
          <ul className="mx-auto max-w-[1180px] px-5 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[16px] text-ink border-b border-rule-soft last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

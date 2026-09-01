import Link from "next/link";
import Image from "next/image";
import { site, pillars, companies } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="bg-night text-white/80 mt-24">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/logo-light.png"
              alt="פורמולה תשתיות"
              width={742}
              height={226}
              className="h-9 w-auto opacity-95"
            />
            <p className="label text-white/40 mt-4">{site.tagline}</p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/60 max-w-[34ch]">
              חברת החזקות בתחום התשתיות, מקבוצת{" "}
              <a
                href={site.parent.url}
                className="text-white/80 underline underline-offset-4 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.parent.name}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="label text-white/40 mb-4">תחומי פעילות</h2>
            <ul className="space-y-2 text-[14.5px]">
              {pillars.map((p) => (
                <li key={p.slug}>
                  <Link href={`/pillars/${p.slug}`} className="text-white/70 hover:text-white">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label text-white/40 mb-4">חברות הקבוצה</h2>
            <ul className="space-y-2 text-[14.5px]">
              {companies.map((c) => (
                <li key={c.slug}>
                  <Link href={`/companies/${c.slug}`} className="text-white/70 hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label text-white/40 mb-4">יצירת קשר</h2>
            <ul className="space-y-2 text-[14.5px] text-white/70">
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-white" dir="ltr">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone}`} className="hover:text-white" dir="ltr">
                  {site.contact.phone}
                </a>
              </li>
              <li className="pt-2">
                <Link href="/careers" className="hover:text-white">
                  דרושים
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white">
                  חדשות ומדיה
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-3 justify-between items-center text-[13px] text-white/45">
          <span>© {new Date().getFullYear()} {site.name}. כל הזכויות שמורות.</span>
          <nav aria-label="עמודים משפטיים" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/legal/privacy" className="hover:text-white/80">מדיניות פרטיות</Link>
            <Link href="/legal/accessibility" className="hover:text-white/80">הצהרת נגישות</Link>
            <Link href="/legal/terms" className="hover:text-white/80">תנאי שימוש</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { pillars, companiesOfPillar, site } from "@/data/site";

export const metadata: Metadata = {
  title: "קריירה",
  description:
    "משרות ומסלולי התפתחות בקבוצת פורמולה תשתיות — מהנדסים, מודדים, טכנאים ומנהלי פרויקטים בשמונה חברות.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="קריירה"
        title="שמונה חברות, שמונה מסלולים"
        lead="מהנדסים, מודדים, טכנאים ומנהלי פרויקטים — הקבוצה מציעה מגוון תחומים תחת גג אחד, ואפשרות לעבור ביניהם."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20">
          <Reveal>
            <h2 className="text-[24px] md:text-[28px]">איפה עובדים אצלנו</h2>
            <p className="mt-4 text-[16.5px] leading-relaxed text-ink-2 measure">
              העבודה בקבוצה נעה בין המשרד לשטח: מודלים תלת־ממדיים ותכנון הנדסי מצד אחד,
              ועבודת ביצוע, פיקוח והתקנה בפרויקטים לאומיים מצד שני.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <div className="h-full bg-paper-2 border border-rule rounded-sm p-6">
                  <span className="label text-brand">{p.num}</span>
                  <h3 className="mt-4 text-[19px] leading-snug">{p.title}</h3>
                  <ul className="mt-4 space-y-1.5">
                    {companiesOfPillar(p.slug).map((c) => (
                      <li key={c.slug} className="text-[14.5px] text-ink-2">
                        <Link href={`/companies/${c.slug}`} className="hover:text-brand">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 bg-slate-deep text-white rounded-sm p-8 md:p-12">
              <h2 className="text-[23px] md:text-[27px]">משרות פתוחות</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/70 max-w-[52ch]">
                לוח המשרות של הקבוצה נמצא בהקמה. בינתיים אפשר לשלוח קורות חיים ישירות
                לכתובת הדוא״ל של הקבוצה — נעביר אותם לחברה הרלוונטית.
              </p>
              <p className="mt-6">
                <a
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent("הגשת מועמדות")}`}
                  className="inline-flex px-6 py-3 bg-brand hover:bg-brand-deep rounded-sm transition-colors font-medium"
                >
                  שליחת קורות חיים
                </a>
              </p>
              <p className="mt-6 text-[13.5px] leading-relaxed text-white/50 max-w-[58ch]">
                שימו לב: קורות חיים שנשלחים אלינו נשמרים לצורך בחינת התאמה למשרות בקבוצה
                בלבד. פירוט מלא, לרבות משך השמירה וזכות המחיקה, מופיע ב
                <Link
                  href="/legal/privacy"
                  className="underline underline-offset-4 hover:text-white/80"
                >
                  מדיניות הפרטיות
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

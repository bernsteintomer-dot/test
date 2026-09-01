import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { site, pillars, companies, companiesOfPillar } from "@/data/site";

export const metadata: Metadata = {
  title: "אודות הקבוצה",
  description:
    "פורמולה תשתיות היא חברת החזקות בתחום התשתיות מקבוצת פורמולה מערכות, המאגדת שמונה חברות בשלושה תחומי פעילות.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="אודות"
        title="פלטפורמת תשתיות מקצה לקצה"
        lead="פורמולה תשתיות בונה ומנהלת פורטפוליו של חברות תשתית, ויוצרת ביניהן סינרגיה שמאפשרת להן לעבוד יחד ולספק פתרון משולב לפרויקטים מורכבים."
      />

      <section className="bg-paper-2 border-b border-rule">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20 grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="text-[24px] md:text-[28px]">מי אנחנו</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
              פורמולה תשתיות היא חברת החזקות המתמחה בתחום התשתיות, וחברת בת של{" "}
              <a
                href={site.parent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-4"
              >
                פורמולה מערכות
              </a>
              , אחת מקבוצות הטכנולוגיה המובילות בישראל.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
              הקבוצה מאגדת שמונה חברות המכסות יחד את מחזור החיים המלא של פרויקט תשתית:
              איסוף וניתוח המידע המרחבי, התכנון ההנדסי, ניהול הפרויקט ובקרת האיכות,
              והביצוע והאינטגרציה בשטח — כולל שירות ותחזוקה לאורך חיי המערכת.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="text-[24px] md:text-[28px]">למה זה משנה למזמין</h2>
            <ul className="mt-5 space-y-4">
              {[
                ["רציפות מידע", "המודל המרחבי שנוצר בשלב הסקר הוא אותו מודל שמנחה את התכנון ואת הביצוע. אין אובדן מידע בין ספקים."],
                ["אחריות אחת", "ממשק אחד מול הקבוצה במקום ניהול של שישה ספקים נפרדים וחיכוכים ביניהם."],
                ["עומק מקצועי", "כל חברה היא מומחית בתחומה — הסינרגיה לא באה על חשבון ההתמחות."],
                ["יציבות", "גב של קבוצה ציבורית, שמאפשר עמידה בפרויקטים לאומיים ארוכי טווח."],
              ].map(([t, d]) => (
                <li key={t} className="border-s-2 border-brand ps-4">
                  <h3 className="text-[17px] font-semibold">{t}</h3>
                  <p className="mt-1 text-[15.5px] leading-relaxed text-ink-2">{d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20">
          <Reveal>
            <p className="label text-brand">מבנה הקבוצה</p>
            <h2 className="mt-4 text-[24px] md:text-[30px]">שלושה עוגנים, שמונה חברות</h2>
          </Reveal>
          <div className="mt-10 space-y-px bg-rule border border-rule">
            {pillars.map((p) => (
              <div key={p.slug} className="bg-paper-2 p-6 md:p-8">
                <div className="grid gap-5 md:grid-cols-[220px_1fr] md:gap-10">
                  <div>
                    <span className="label text-brand">{p.num}</span>
                    <h3 className="mt-2 text-[19px] leading-snug">
                      <Link href={`/pillars/${p.slug}`} className="hover:text-brand">
                        {p.title}
                      </Link>
                    </h3>
                  </div>
                  <div>
                    <p className="text-[15.5px] leading-relaxed text-ink-2 measure">{p.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {companiesOfPillar(p.slug).map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/companies/${c.slug}`}
                            className="inline-block px-3 py-1 border border-rule rounded-sm text-[14px] text-ink-2 hover:border-brand hover:text-brand transition-colors"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-ink-3">
            סך הכל {companies.length} חברות בקבוצה.
          </p>
        </div>
      </section>
    </>
  );
}

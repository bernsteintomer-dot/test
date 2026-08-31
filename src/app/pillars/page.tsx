import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { pillars, companiesOfPillar } from "@/data/site";

export const metadata: Metadata = {
  title: "תחומי פעילות",
  description:
    "שלושה תחומי פעילות המכסים את מחזור החיים המלא של פרויקט תשתית: מידע וטכנולוגיה, תכנון הנדסי ובקרת איכות, וביצוע ואינטגרציית מערכות.",
};

export default function PillarsPage() {
  return (
    <>
      <PageHeader
        eyebrow="תחומי פעילות"
        title="שלושה עוגנים, פרויקט אחד שלם"
        lead="הקבוצה בנויה סביב שלושה תחומי פעילות שמכסים יחד את כל מסלול הפרויקט — מהמידע הגולמי ועד המערכת הפועלת בשטח."
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20 space-y-5">
          {pillars.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <Link
                href={`/pillars/${p.slug}`}
                className="group block bg-paper-2 border border-rule rounded-sm p-7 md:p-10 hover:border-brand transition-colors"
              >
                <div className="grid gap-6 md:grid-cols-[130px_1fr] md:gap-10">
                  <span className="label text-brand text-[13px]">{p.num}</span>
                  <div>
                    <h2 className="text-[23px] md:text-[27px] group-hover:text-brand transition-colors">
                      {p.title}
                    </h2>
                    <p className="mt-1 label text-ink-3">{p.titleEn}</p>
                    <p className="mt-5 text-[16.5px] leading-relaxed text-ink-2 measure">{p.body}</p>
                    <p className="mt-6 pt-5 border-t border-rule-soft text-[14.5px] text-ink-3">
                      {companiesOfPillar(p.slug).map((c) => c.name).join(" · ")}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

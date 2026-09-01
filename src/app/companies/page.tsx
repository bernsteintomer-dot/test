import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { pillars, companiesOfPillar } from "@/data/site";

export const metadata: Metadata = {
  title: "חברות הקבוצה",
  description:
    "שמונה חברות בקבוצת פורמולה תשתיות: אופק, יונה, גיאופויינט, אדוונס, דוד ברהום, שמרד, השחר טלקום ומ.ל.ב.ס.",
};

export default function CompaniesPage() {
  return (
    <>
      <PageHeader
        eyebrow="הפורטפוליו"
        title="שמונה חברות, התמחות אחת בכל אחת"
        lead="כל חברה בקבוצה עצמאית בתחומה ומובילה בו — והצירוף ביניהן הוא מה שמאפשר לקחת פרויקט מקצה לקצה."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20 space-y-16">
          {pillars.map((p) => (
            <div key={p.slug}>
              <Reveal>
                <div className="flex flex-wrap items-baseline gap-4 pb-5 border-b border-rule">
                  <span className="label text-brand">{p.num}</span>
                  <h2 className="text-[22px] md:text-[26px]">{p.title}</h2>
                </div>
              </Reveal>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {companiesOfPillar(p.slug).map((c, i) => (
                  <Reveal key={c.slug} delay={i * 80}>
                    <Link
                      href={`/companies/${c.slug}`}
                      className="group flex h-full flex-col bg-paper-2 border border-rule rounded-sm p-6 hover:border-brand transition-colors"
                    >
                      <h3 className="text-[19px] leading-snug group-hover:text-brand transition-colors">
                        {c.name}
                      </h3>
                      <p className="mt-1 label text-ink-3">{c.nameEn}</p>
                      <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2 flex-1">
                        {c.lead}
                      </p>
                      {c.parentSlug && (
                        <p className="mt-4 text-[13px] text-ink-3">חברת בת של אופק</p>
                      )}
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

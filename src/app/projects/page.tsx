import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { projects, companyBySlug } from "@/data/site";

export const metadata: Metadata = {
  title: "פרויקטים",
  description:
    "פרויקטים נבחרים של קבוצת פורמולה תשתיות בתחומי תחבורה, נמלים, אנרגיה, תעשייה ומבני ציבור.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="פרויקטים"
        title="מה בנינו"
        lead="מבחר מפרויקטי הקבוצה — בתחבורה, בנמלים, באנרגיה, בתעשייה ובמבני ציבור."
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20">
          <div className="grid gap-px bg-rule border border-rule md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 90}>
                <article className="bg-paper-2 h-full p-7 md:p-9">
                  <p className="label text-brand">{p.sector}</p>
                  <h2 className="mt-4 text-[21px] md:text-[23px] leading-snug">{p.name}</h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">{p.body}</p>
                  <p className="mt-6 pt-5 border-t border-rule-soft text-[14px] text-ink-3">
                    ביצוע:{" "}
                    {p.companies.map((slug, k) => {
                      const c = companyBySlug(slug);
                      if (!c) return null;
                      return (
                        <span key={slug}>
                          {k > 0 && " · "}
                          <Link href={`/companies/${c.slug}`} className="hover:text-brand">
                            {c.name}
                          </Link>
                        </span>
                      );
                    })}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-[15px] text-ink-2 measure">
              תיק הפרויקטים המלא, כולל תמונות מהשטח, נמצא בהכנה.{" "}
              <Link href="/contact" className="text-brand underline underline-offset-4">
                לפרטים על פרויקט מסוים
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

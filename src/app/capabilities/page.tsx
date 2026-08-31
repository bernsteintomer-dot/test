import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { companies, pillarBySlug } from "@/data/site";

export const metadata: Metadata = {
  title: "יכולות",
  description:
    "מדד היכולות של קבוצת פורמולה תשתיות: סריקת LiDAR, מדידות קדסטר, תכנון חשמל ותקשורת, בקרת איכות, פריסת סיבים, קידוח אופקי מכוון ומערכות ביטחון ובקרה.",
};

export default function CapabilitiesPage() {
  const rows = companies.flatMap((c) =>
    c.capabilities.map((cap) => ({ cap, company: c }))
  );

  return (
    <>
      <PageHeader
        eyebrow="יכולות"
        title="מה אנחנו יודעים לעשות"
        lead="מדד רוחבי של כל יכולות הקבוצה. מחפשים יכולת מסוימת? כאן תמצאו איזו חברה מספקת אותה."
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20">
          <Reveal>
            <div className="border border-rule bg-paper-2 rounded-sm overflow-hidden">
              <ul className="divide-y divide-rule-soft">
                {rows.map(({ cap, company }, i) => {
                  const pillar = pillarBySlug(company.pillar);
                  return (
                    <li key={`${company.slug}-${i}`}>
                      <Link
                        href={`/companies/${company.slug}`}
                        className="group grid gap-2 md:grid-cols-[1fr_220px_120px] md:gap-6 px-5 md:px-7 py-4 hover:bg-paper transition-colors items-baseline"
                      >
                        <span className="text-[16px] leading-relaxed">{cap}</span>
                        <span className="text-[14.5px] text-ink-2 group-hover:text-brand transition-colors">
                          {company.name}
                        </span>
                        <span className="label text-ink-3">{pillar?.num}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
          <p className="mt-6 text-[14px] text-ink-3">
            {rows.length} יכולות · {companies.length} חברות
          </p>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { companies, companyBySlug, pillarBySlug } from "@/data/site";

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = companyBySlug(slug);
  if (!c) return {};
  return { title: c.name, description: c.lead };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = companyBySlug(slug);
  if (!company) notFound();
  const pillar = pillarBySlug(company.pillar);
  const parent = company.parentSlug ? companyBySlug(company.parentSlug) : undefined;

  return (
    <>
      <PageHeader
        eyebrow={pillar ? `${pillar.num} · ${pillar.title}` : "חברת קבוצה"}
        title={company.name}
        lead={company.lead}
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr] md:gap-16">
            <Reveal>
              <h2 className="text-[22px] md:text-[26px]">יכולות מרכזיות</h2>
              <ul className="mt-7 divide-y divide-rule-soft border-t border-rule">
                {company.capabilities.map((cap, i) => (
                  <li key={cap} className="flex gap-5 py-4">
                    <span className="label text-brand pt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[16px] leading-relaxed text-ink">{cap}</span>
                  </li>
                ))}
              </ul>

              {company.projects && company.projects.length > 0 && (
                <>
                  <h2 className="mt-14 text-[22px] md:text-[26px]">פרויקטים נבחרים</h2>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {company.projects.map((pr) => (
                      <li
                        key={pr}
                        className="bg-paper-2 border border-rule rounded-sm px-5 py-4 text-[15.5px]"
                      >
                        {pr}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Reveal>

            <Reveal delay={120}>
              <aside className="bg-paper-2 border border-rule rounded-sm p-6 md:sticky md:top-28">
                <h2 className="label text-ink-3">פרטי החברה</h2>
                <dl className="mt-4 space-y-4 text-[15px]">
                  <div>
                    <dt className="text-ink-3 text-[13.5px]">שם באנגלית</dt>
                    <dd className="mt-0.5" dir="ltr">{company.nameEn}</dd>
                  </div>
                  {pillar && (
                    <div>
                      <dt className="text-ink-3 text-[13.5px]">תחום פעילות</dt>
                      <dd className="mt-0.5">
                        <Link href={`/pillars/${pillar.slug}`} className="text-brand underline underline-offset-4">
                          {pillar.title}
                        </Link>
                      </dd>
                    </div>
                  )}
                  {parent && (
                    <div>
                      <dt className="text-ink-3 text-[13.5px]">מבנה החזקה</dt>
                      <dd className="mt-0.5">
                        חברת בת של{" "}
                        <Link href={`/companies/${parent.slug}`} className="text-brand underline underline-offset-4">
                          {parent.name}
                        </Link>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-ink-3 text-[13.5px]">אתר החברה</dt>
                    <dd className="mt-0.5">
                      {company.url ? (
                        <a
                          href={company.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand underline underline-offset-4 break-all"
                          dir="ltr"
                        >
                          {company.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </a>
                      ) : (
                        <span className="text-ink-2">פנייה דרך הקבוצה</span>
                      )}
                    </dd>
                  </div>
                </dl>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex w-full justify-center px-5 py-3 bg-brand hover:bg-brand-deep text-white rounded-sm transition-colors"
                >
                  פנייה לחברה
                </Link>
              </aside>
            </Reveal>
          </div>

          <div className="mt-16 pt-10 border-t border-rule">
            <Link href="/companies" className="text-[15px] text-brand underline underline-offset-4">
              → לכל חברות הקבוצה
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

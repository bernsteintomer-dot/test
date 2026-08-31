import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { pillars, pillarBySlug, companiesOfPillar } from "@/data/site";

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = pillarBySlug(slug);
  if (!p) return {};
  return { title: p.title, description: p.short };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = pillarBySlug(slug);
  if (!pillar) notFound();
  const list = companiesOfPillar(pillar.slug);

  return (
    <>
      <PageHeader eyebrow={`תחום פעילות ${pillar.num}`} title={pillar.title} lead={pillar.body} />

      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20">
          <Reveal>
            <h2 className="text-[24px] md:text-[28px]">החברות בתחום</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {list.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90}>
                <Link
                  href={`/companies/${c.slug}`}
                  className="group block h-full bg-paper-2 border border-rule rounded-sm p-7 hover:border-brand transition-colors"
                >
                  <h3 className="text-[20px] group-hover:text-brand transition-colors">{c.name}</h3>
                  <p className="mt-1 label text-ink-3">{c.nameEn}</p>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">{c.lead}</p>
                  <ul className="mt-5 pt-5 border-t border-rule-soft space-y-1.5">
                    {c.capabilities.slice(0, 3).map((cap) => (
                      <li key={cap} className="text-[14.5px] text-ink-2 flex gap-2">
                        <span className="text-brand shrink-0" aria-hidden="true">—</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-rule flex flex-wrap gap-4 justify-between items-center">
            <Link href="/pillars" className="text-[15px] text-brand underline underline-offset-4">
              → לכל תחומי הפעילות
            </Link>
            <Link
              href="/contact"
              className="inline-flex px-6 py-3 bg-brand hover:bg-brand-deep text-white rounded-sm transition-colors"
            >
              דברו איתנו על פרויקט
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "חדשות ומדיה",
  description: "עדכונים, רכישות והודעות מקבוצת פורמולה תשתיות.",
};

const items = [
  {
    date: "2026",
    title: "השחר טלקום מרחיבה את יכולות הפריסה ברכישת א.א. תקשורת",
    body:
      "הרכישה מחזקת את יכולת הביצוע של הקבוצה בפריסות תשתית סיבים אופטיים בקנה מידה גדול.",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="חדשות ומדיה"
        title="מה חדש בקבוצה"
        lead="עדכונים על פרויקטים, רכישות והתפתחויות בחברות הקבוצה."
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20">
          <ul className="border-t border-rule">
            {items.map((n) => (
              <li key={n.title} className="border-b border-rule">
                <Reveal>
                  <article className="grid gap-3 md:grid-cols-[120px_1fr] md:gap-10 py-8">
                    <p className="label text-ink-3">{n.date}</p>
                    <div>
                      <h2 className="text-[20px] md:text-[22px] leading-snug">{n.title}</h2>
                      <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2 measure">
                        {n.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-ink-2">
            ארכיון ההודעות המלא יעלה עם השקת אזור המדיה.
          </p>
        </div>
      </section>
    </>
  );
}

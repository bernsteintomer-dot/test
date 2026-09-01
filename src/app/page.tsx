import Link from "next/link";
import Image from "next/image";
import Hero3D from "@/components/Hero3D";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import LifecyclePath from "@/components/LifecyclePath";
import { site, pillars, companies, companiesOfPillar } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="relative bg-night text-white overflow-hidden -mt-[68px] pt-[68px]">
        <div className="absolute inset-0">
          <Hero3D />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-l from-night via-night/70 to-night/5 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-night/75 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1180px] px-5 md:px-8">
          <div className="min-h-[78vh] md:min-h-[90vh] flex flex-col justify-center py-20 md:py-24">
            <p className="label text-white/45">{site.tagline}</p>
            <h1 className="mt-5 text-[40px] leading-[1.08] md:text-[68px] md:leading-[1.04] font-semibold max-w-[17ch]">
              בונים את התשתית של מחר
            </h1>
            <p className="mt-6 text-[18px] md:text-[21px] leading-relaxed text-white/70 max-w-[52ch] font-light">
              שמונה חברות. שלושה תחומי פעילות. מחזור חיים אחד שלם — ממידע גאו־מרחבי,
              דרך תכנון הנדסי ובקרת איכות, ועד ביצוע ואינטגרציה בשטח.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/pillars"
                className="inline-flex items-center px-6 py-3 bg-brand hover:bg-brand-deep transition-colors rounded-sm text-white font-medium"
              >
                תחומי הפעילות
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-white/25 hover:border-white/60 hover:bg-white/5 transition-colors rounded-sm"
              >
                צרו קשר
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- the equation ---------------- */}
      <section className="bg-paper-2 border-b border-rule">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1.15fr_1fr] md:gap-20 items-start">
            <Reveal>
              <p className="label text-brand">מי אנחנו</p>
              <h2 className="mt-4 text-[27px] md:text-[34px] leading-[1.22]">
                חברת החזקות בתחום התשתיות, שבנויה כדי לעבוד כגוף אחד
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-2 measure">
                פורמולה תשתיות היא חברת בת של{" "}
                <a
                  href={site.parent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand underline underline-offset-4"
                >
                  פורמולה מערכות
                </a>
                , אחת מקבוצות הטכנולוגיה המובילות בישראל. אנחנו בונים ומנהלים פורטפוליו של
                חברות תשתית, ויוצרים ביניהן סינרגיה שמאפשרת להן לעבוד יחד ולספק פתרון משולב
                לפרויקטי תשתית מורכבים.
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-2 measure">
                המשמעות המעשית: מזמין עבודה מקבל מגוף אחד את סקר הלייזר, את התכנון החשמלי,
                את הפיקוח ואת פריסת הסיבים — במקום לתפור שישה ספקים נפרדים.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="border border-rule bg-paper rounded-sm divide-y divide-rule-soft">
                <div className="grid grid-cols-3 divide-x divide-x-reverse divide-rule-soft">
                  <Stat n={8} label="חברות" />
                  <Stat n={3} label="תחומי פעילות" />
                  <Stat n={1} label="מחזור חיים" />
                </div>
                <div className="p-6">
                  <p className="label text-ink-3">המשוואה</p>
                  <p
                    dir="ltr"
                    className="mt-3 font-mono text-[26px] md:text-[30px] text-ink tracking-tight"
                  >
                    1 + 1 = <span className="text-brand">MORE</span>
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                    הערך של הקבוצה אינו סכום החברות שבה, אלא מה שהן מסוגלות לעשות יחד.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- pillars ---------------- */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-20 md:py-24">
          <Reveal>
            <p className="label text-brand">תחומי פעילות</p>
            <h2 className="mt-4 text-[27px] md:text-[34px] max-w-[20ch]">
              שלושה עוגנים שמכסים את הפרויקט מקצה לקצה
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.slug} delay={i * 110}>
                <Link
                  href={`/pillars/${p.slug}`}
                  className="group block h-full bg-paper-2 border border-rule rounded-sm p-7 hover:border-brand transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="label text-brand">{p.num}</span>
                    <span className="label text-ink-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      ←
                    </span>
                  </div>
                  <h3 className="mt-5 text-[21px] leading-snug">{p.title}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-2">{p.short}</p>
                  <p className="mt-6 pt-5 border-t border-rule-soft text-[14px] text-ink-3">
                    {companiesOfPillar(p.slug).map((c) => c.name).join(" · ")}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- lifecycle ---------------- */}
      <section className="bg-night text-white">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="label text-brand-light">מסלול הפרויקט</p>
              <h2 className="mt-4 text-[27px] md:text-[34px] leading-[1.22]">
                איך פרויקט אחד עובר דרך הקבוצה
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-white/60 max-w-[42ch]">
                כל שלב נשען על התוצר של הקודם. זה מה שמייצר את היתרון — המידע שנאסף
                בשלב הראשון הוא אותו מידע שמנחה את הביצוע בשטח.
              </p>
            </div>
            <div className="[&_.bg-rule]:bg-white/15 [&_.bg-paper]:bg-night [&_.border-rule]:border-white/25 [&_.text-ink-2]:text-white/65 [&_.text-ink-3]:text-white/55">
              <LifecyclePath />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- companies ---------------- */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-20 md:py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="label text-brand">הפורטפוליו</p>
                <h2 className="mt-4 text-[27px] md:text-[34px]">חברות הקבוצה</h2>
              </div>
              <Link
                href="/companies"
                className="text-[15px] text-brand hover:text-brand-deep underline underline-offset-4"
              >
                לכל החברות
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px bg-rule border border-rule sm:grid-cols-2 lg:grid-cols-4">
            {companies.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 70}>
                <Link
                  href={`/companies/${c.slug}`}
                  className="group flex h-full flex-col bg-paper-2 p-6 hover:bg-paper transition-colors"
                >
                  <span className="label text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[18px] leading-snug group-hover:text-brand transition-colors">
                    {c.name}
                  </h3>
                  <p className="mt-1 label text-ink-3">{c.nameEn}</p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2 line-clamp-4">
                    {c.lead}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- group ---------------- */}
      <section className="bg-paper border-t border-rule">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-20">
          <Reveal className="flex flex-col md:flex-row md:items-center gap-8 md:gap-14">
            <Image
              src="/brand/formula-systems.png"
              alt="פורמולה מערכות"
              width={246}
              height={100}
              className="h-12 w-auto shrink-0"
            />
            <div>
              <h2 className="text-[21px] md:text-[24px]">חלק מקבוצת פורמולה מערכות</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-2 measure">
                פורמולה מערכות היא קבוצת אחזקות ישראלית בתחום הטכנולוגיה, הנסחרת בבורסה
                בתל אביב ובנאסד״ק. הגב הקבוצתי הזה מאפשר לפורמולה תשתיות לפעול בפרויקטים
                לאומיים בקנה מידה גדול ולאורך זמן.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- cta ---------------- */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 pb-24">
          <div className="grid gap-5 md:grid-cols-2">
            <CtaCard
              href="/contact"
              label="לפרויקט חדש"
              title="יש לכם פרויקט תשתית?"
              body="ספרו לנו על הפרויקט ונחבר אתכם לחברה הנכונה בקבוצה — או לכמה מהן."
            />
            <CtaCard
              href="/careers"
              label="קריירה"
              title="מהנדסים, מודדים וטכנאים"
              body="שמונה חברות פירושן שמונה מסלולי התפתחות. נשמח להכיר."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="p-6 text-center">
      <p className="font-display text-[38px] leading-none font-semibold text-ink">
        <Counter to={n} />
      </p>
      <p className="mt-2 text-[13.5px] text-ink-2">{label}</p>
    </div>
  );
}

function CtaCard({
  href,
  label,
  title,
  body,
}: {
  href: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <Reveal>
      <Link
        href={href}
        className="group block h-full bg-slate-deep text-white rounded-sm p-8 md:p-10 hover:bg-night transition-colors"
      >
        <p className="label text-brand-light">{label}</p>
        <h2 className="mt-4 text-[23px] md:text-[26px]">{title}</h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-white/65 max-w-[38ch]">{body}</p>
        <span className="mt-6 inline-block text-[15px] text-white/80 group-hover:text-white">
          המשך ←
        </span>
      </Link>
    </Reveal>
  );
}

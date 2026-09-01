import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "צור קשר",
  description: "יצירת קשר עם קבוצת פורמולה תשתיות — פניות לפרויקטים, שיתופי פעולה ומידע כללי.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="צור קשר"
        title="ספרו לנו על הפרויקט"
        lead="נחבר אתכם לחברה הנכונה בקבוצה — או לכמה מהן, אם הפרויקט חוצה תחומים."
      />
      <section className="bg-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-[1.25fr_0.75fr] md:gap-16">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={120}>
              <aside className="space-y-8">
                <div>
                  <h2 className="label text-ink-3">פנייה ישירה</h2>
                  <dl className="mt-4 space-y-4 text-[16px]">
                    <div>
                      <dt className="text-[13.5px] text-ink-3">דוא״ל</dt>
                      <dd className="mt-0.5">
                        <a
                          href={`mailto:${site.contact.email}`}
                          className="text-brand underline underline-offset-4"
                          dir="ltr"
                        >
                          {site.contact.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[13.5px] text-ink-3">טלפון</dt>
                      <dd className="mt-0.5">
                        <a
                          href={`tel:${site.contact.phone}`}
                          className="text-brand underline underline-offset-4"
                          dir="ltr"
                        >
                          {site.contact.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[13.5px] text-ink-3">כתובת</dt>
                      <dd className="mt-0.5 text-ink-2">{site.contact.address}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-paper-2 border border-rule rounded-sm p-6">
                  <h2 className="text-[17px] font-semibold">מועמדים לעבודה</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                    הגשת מועמדות מתבצעת בעמוד הקריירה, ולא דרך טופס זה.
                  </p>
                  <a
                    href="/careers"
                    className="mt-4 inline-block text-[15px] text-brand underline underline-offset-4"
                  >
                    לעמוד הקריירה ←
                  </a>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

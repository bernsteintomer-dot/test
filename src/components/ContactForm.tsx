"use client";

import { useState } from "react";
import Link from "next/link";
import { companies } from "@/data/site";

type State = { status: "idle" | "sending" | "ok" | "error"; message?: string };

export default function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string };
      if (res.ok && body.ok) {
        setState({ status: "ok" });
        form.reset();
      } else {
        setState({ status: "error", message: body.error ?? "אירעה שגיאה. נסו שוב." });
      }
    } catch {
      setState({
        status: "error",
        message: "לא הצלחנו לשלוח את הפנייה. בדקו את החיבור לאינטרנט ונסו שוב.",
      });
    }
  }

  if (state.status === "ok") {
    return (
      <div
        role="status"
        className="bg-paper-2 border border-rule rounded-sm p-8 text-center"
      >
        <p className="text-[19px] font-semibold">הפנייה נשלחה</p>
        <p className="mt-3 text-[15.5px] text-ink-2 leading-relaxed">
          קיבלנו את הפרטים וניצור קשר בהקדם. אם העניין דחוף, אפשר גם להתקשר.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/*
        Honeypot — hidden from people, tempting to bots. Clipped rather than
        pushed off-canvas: an off-canvas offset extends the document box, and
        in an RTL document that leaves the viewport parked over empty space.
      */}
      <div
        aria-hidden="true"
        className="absolute w-px h-px overflow-hidden whitespace-nowrap"
        style={{ clipPath: "inset(50%)" }}
      >
        <label htmlFor="website">אל תמלאו שדה זה</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="שם מלא" required autoComplete="name" />
        <Field id="organization" label="ארגון" autoComplete="organization" />
        <Field id="email" label="דוא״ל" type="email" required autoComplete="email" dir="ltr" />
        <Field id="phone" label="טלפון" type="tel" autoComplete="tel" dir="ltr" />
      </div>

      <div>
        <label htmlFor="topic" className="block text-[14.5px] font-medium mb-1.5">
          נושא הפנייה
        </label>
        <select
          id="topic"
          name="topic"
          className="w-full bg-paper-2 border border-rule rounded-sm px-4 py-3 text-[16px] focus:border-brand outline-none"
        >
          <option value="general">פנייה כללית</option>
          <option value="project">פרויקט חדש</option>
          {companies.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-[13.5px] text-ink-3">
          בחירת נושא מנתבת את הפנייה ישירות לחברה הרלוונטית בקבוצה.
        </p>
      </div>

      <div>
        <label htmlFor="message" className="block text-[14.5px] font-medium mb-1.5">
          פרטי הפנייה <span className="text-brand">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full bg-paper-2 border border-rule rounded-sm px-4 py-3 text-[16px] leading-relaxed focus:border-brand outline-none resize-y"
        />
      </div>

      {/* Privacy Protection Law, Amendment 13 — notice at the point of collection */}
      <div className="bg-paper-2 border border-rule rounded-sm p-5">
        <p className="label text-ink-3">יידוע לפי חוק הגנת הפרטיות</p>
        <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">
          הפרטים שתמסרו נאספים על ידי פורמולה תשתיות בע״מ לצורך מענה לפנייתכם בלבד.
          מסירת הפרטים תלויה ברצונכם ואינכם חייבים למסור אותם על פי חוק, אך בלעדיהם
          לא נוכל לחזור אליכם. הפרטים עשויים להימסר לחברה הרלוונטית בקבוצה לצורך
          הטיפול בפנייה. פירוט מלא, לרבות משך השמירה וזכויות העיון, התיקון והמחיקה,
          מופיע ב
          <Link href="/legal/privacy" className="text-brand underline underline-offset-4">
            מדיניות הפרטיות
          </Link>
          .
        </p>
        <label className="mt-4 flex items-start gap-3 text-[14.5px] leading-relaxed">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 w-4 h-4 accent-[#a01915] shrink-0"
          />
          <span>
            קראתי את היידוע ואני מסכים/ה שהפרטים יישמרו וישמשו לצורך הטיפול בפנייה.
            <span className="text-brand"> *</span>
          </span>
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-[15px] text-brand bg-brand-soft border border-brand/30 rounded-sm px-4 py-3">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === "sending"}
        className="inline-flex px-7 py-3.5 bg-brand hover:bg-brand-deep disabled:opacity-60 text-white rounded-sm transition-colors font-medium"
      >
        {state.status === "sending" ? "שולח…" : "שליחת פנייה"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = false,
  autoComplete,
  dir,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14.5px] font-medium mb-1.5">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        dir={dir}
        className="w-full bg-paper-2 border border-rule rounded-sm px-4 py-3 text-[16px] focus:border-brand outline-none"
      />
    </div>
  );
}

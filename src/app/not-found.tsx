import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-night text-white -mt-[68px] pt-[68px]">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 min-h-[70vh] flex flex-col justify-center py-24">
        <p className="label text-brand-light">404</p>
        <h1 className="mt-4 text-[34px] md:text-[48px] leading-[1.1] max-w-[18ch]">
          העמוד המבוקש לא נמצא
        </h1>
        <p className="mt-5 text-[17px] text-white/65 max-w-[46ch] font-light">
          ייתכן שהכתובת השתנתה או שהעמוד הוסר. אפשר לחזור לעמוד הבית או לעבור ישירות
          לחברות הקבוצה.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-brand hover:bg-brand-deep rounded-sm transition-colors"
          >
            לעמוד הבית
          </Link>
          <Link
            href="/companies"
            className="inline-flex px-6 py-3 border border-white/25 hover:border-white/60 rounded-sm transition-colors"
          >
            חברות הקבוצה
          </Link>
        </div>
      </div>
    </section>
  );
}

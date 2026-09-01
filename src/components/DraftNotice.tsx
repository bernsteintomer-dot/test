export default function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="measure bg-brand-soft border border-brand/30 rounded-sm p-5 mb-10">
      <p className="label text-brand">לפני ההשקה</p>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{children}</p>
    </div>
  );
}

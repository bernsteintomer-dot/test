export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        measure
        [&_h2]:text-[21px] [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:font-semibold
        [&_h3]:text-[17px] [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-semibold
        [&_p]:text-[16px] [&_p]:leading-[1.75] [&_p]:text-ink-2 [&_p]:mb-4
        [&_ul]:list-disc [&_ul]:ps-6 [&_ul]:mb-5 [&_ul]:space-y-2
        [&_ol]:list-decimal [&_ol]:ps-6 [&_ol]:mb-5 [&_ol]:space-y-2
        [&_li]:text-[16px] [&_li]:leading-[1.7] [&_li]:text-ink-2
        [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4
        [&_strong]:text-ink [&_strong]:font-semibold
      "
    >
      {children}
    </div>
  );
}

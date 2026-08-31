import Reveal from "@/components/Reveal";

export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="bg-night text-white -mt-[68px] pt-[68px]">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-20 md:py-28">
        <Reveal>
          <p className="label text-brand-light">{eyebrow}</p>
          <h1 className="mt-4 text-[34px] md:text-[52px] leading-[1.08] max-w-[20ch]">{title}</h1>
          {lead && (
            <p className="mt-6 text-[17px] md:text-[19px] leading-relaxed text-white/65 max-w-[58ch] font-light">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

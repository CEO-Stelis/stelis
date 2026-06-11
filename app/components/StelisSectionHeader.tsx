type StelisSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function StelisSectionHeader({
  eyebrow,
  title,
  description,
}: StelisSectionHeaderProps) {
  return (
    <div>
      {eyebrow && (
        <p className="text-[13px] font-bold uppercase tracking-[0.45em] text-[#D62828]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-[13px] max-w-[610px] text-[34px] font-semibold leading-[1.05] tracking-tight text-[#07111F] md:text-[55px]">
        {title}
      </h2>

      {description && (
        <p className="mt-[21px] max-w-[610px] text-[21px] leading-[34px] text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}
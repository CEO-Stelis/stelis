type StelisKPIProps = {
  label: string;
  value: string;
  helper?: string;
  trend?: string;
  tone?: "neutral" | "positive" | "warning" | "danger";
};

export default function StelisKPI({
  label,
  value,
  helper,
  trend,
  tone = "neutral",
}: StelisKPIProps) {
  const toneStyles = {
    neutral: "text-[#07111F]",
    positive: "text-[#0B1F3A]",
    warning: "text-[#D62828]",
    danger: "text-[#D62828]",
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-[21px]">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>

          {helper && <p className="mt-[8px] text-[13px] text-slate-500">{helper}</p>}
        </div>

        {trend && (
          <div className="rounded-full bg-[#D62828] px-[13px] py-[8px] text-[13px] font-semibold text-white">
            {trend}
          </div>
        )}
      </div>

      <p
        className={`mt-[34px] text-[55px] font-semibold leading-none tracking-tight md:text-[89px] ${toneStyles[tone]}`}
      >
        {value}
      </p>
    </div>
  );
}
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
  const valueToneStyles = {
    neutral: "text-[#07111F]",
    positive: "text-[#07111F]",
    warning: "text-[#D62828]",
    danger: "text-[#D62828]",
  };

  const trendToneStyles = {
    neutral: "bg-[#07111F]/5 text-[#07111F] ring-1 ring-[#07111F]/10",
    positive: "bg-[#34C759]/10 text-[#1E9E45] ring-1 ring-[#34C759]/25",
    warning: "bg-[#D62828]/10 text-[#D62828] ring-1 ring-[#D62828]/20",
    danger: "bg-[#D62828] text-white ring-1 ring-[#D62828]",
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-[21px]">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#07111F]/75">
            {label}
          </p>

          {helper && (
            <p className="mt-[10px] text-[14px] leading-[22px] text-slate-500">
              {helper}
            </p>
          )}
        </div>

        {trend && (
          <div
            className={`rounded-full px-[14px] py-[8px] text-[13px] font-semibold leading-none ${trendToneStyles[tone]}`}
          >
            {trend}
          </div>
        )}
      </div>

      <p
        className={`mt-[28px] whitespace-nowrap font-sans text-[42px] font-semibold leading-none tracking-[-0.045em] [font-variant-numeric:tabular-nums] md:text-[48px] ${valueToneStyles[tone]}`}
      >
        {value}
      </p>
    </div>
  );
}
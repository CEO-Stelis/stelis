import StelisCard from "./StelisCard";

type StelisCashPositionProps = {
  availableCash: number;
  committedCash: number;
  freeCash: number;
  cashScore: number;
};

function formatMoney(amount: number) {
  return `L ${amount.toLocaleString("en-US")}`;
}

function getCashStatus(cashScore: number, freeCash: number) {
  if (freeCash <= 0 || cashScore < 60) return "Attention Required";
  if (cashScore >= 90) return "Healthy";
  if (cashScore >= 80) return "Stable";

  return "Review";
}

const metricNumberClass =
  "font-sans text-[32px] font-semibold leading-none tracking-[-0.04em] text-[#07111F] [font-variant-numeric:tabular-nums] md:text-[38px]";

export default function StelisCashPosition({
  availableCash,
  committedCash,
  freeCash,
  cashScore,
}: StelisCashPositionProps) {
  const status = getCashStatus(cashScore, freeCash);
  const isRisk = status === "Attention Required";

  return (
    <StelisCard className="border-[#07111F]/10 shadow-[0_21px_55px_rgba(7,17,31,0.08)]">
      <div className="grid gap-[34px] lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#07111F]/65">
            Cash Position
          </p>

          <h2
            className={`mt-[13px] font-serif text-[46px] font-medium leading-none tracking-[-0.03em] ${
              isRisk ? "text-[#D62828]" : "text-[#07111F]"
            }`}
          >
            {status}
          </h2>

          <p className="mt-[13px] max-w-[520px] text-[18px] leading-[28px] text-slate-500">
            {isRisk
              ? "Cash needs attention before new commitments are approved."
              : "No immediate cash risks detected."}
          </p>

          <div className="mt-[21px] flex flex-wrap gap-x-[34px] gap-y-[13px]">
            <div className="flex items-center gap-[10px]">
              <span className="h-[11px] w-[11px] rounded-full border border-[#34C759] bg-white shadow-[inset_0_0_0_3px_rgba(52,199,89,0.14)]" />
              <p className="text-[13px] font-semibold text-[#07111F]">
                Payroll: Covered
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <span className="h-[11px] w-[11px] rounded-full border border-[#34C759] bg-white shadow-[inset_0_0_0_3px_rgba(52,199,89,0.14)]" />
              <p className="text-[13px] font-semibold text-[#07111F]">
                Supplier Payments: Covered
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#07111F]/10 pt-[21px] lg:border-l lg:border-t-0 lg:pl-[34px] lg:pt-0">
          <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#07111F]/65">
            Cash Score
          </p>

          <p className={`mt-[13px] whitespace-nowrap ${metricNumberClass}`}>
            {cashScore} / 100
          </p>

          <div className="mt-[21px] h-[8px] overflow-hidden rounded-full bg-[#07111F]/10">
            <div
              className={`h-full rounded-full ${
                isRisk ? "bg-[#D62828]" : "bg-[#34C759]"
              }`}
              style={{ width: `${cashScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-[34px] border-t border-[#07111F]/10 pt-[34px]">
        <div className="grid gap-[34px] md:grid-cols-2">
          <div className="flex items-center gap-[21px]">
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#07111F] text-[13px] font-semibold text-white">
              A
            </div>

            <div className="min-w-0">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#07111F]/60">
                Available Cash
              </p>

              <p className={`mt-[10px] whitespace-nowrap ${metricNumberClass}`}>
                {formatMoney(availableCash)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[21px] md:border-l md:border-[#07111F]/10 md:pl-[34px]">
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#07111F] text-[13px] font-semibold text-white">
              C
            </div>

            <div className="min-w-0">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#07111F]/60">
                Committed Cash
              </p>

              <p className={`mt-[10px] whitespace-nowrap ${metricNumberClass}`}>
                {formatMoney(committedCash)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </StelisCard>
  );
}
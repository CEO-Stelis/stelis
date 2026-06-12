import StelisCard from "./StelisCard";

type HealthTrendDirection = "up" | "down" | "flat";
type HealthTone = "positive" | "neutral" | "risk";

type HealthFactor = {
  title: string;
  detail: string;
  impact: string;
};

type ImprovementPath = {
  title: string;
  detail: string;
  expectedImpact: string;
};

type StelisHealthIndexProps = {
  score: number;
  trendLabel: string;
  trendDirection: HealthTrendDirection;
  biggestPositiveFactor: HealthFactor;
  biggestNegativeFactor: HealthFactor;
  fastestPathToImprovement: ImprovementPath;
};

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getHealthStatus(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Strong";
  if (score >= 70) return "Stable";
  if (score >= 60) return "Attention Required";
  if (score >= 50) return "At Risk";

  return "Critical";
}

function getHealthTone(score: number): HealthTone {
  if (score >= 80) return "positive";
  if (score < 70) return "risk";

  return "neutral";
}

const labelClass =
  "text-[11px] font-bold uppercase tracking-[0.2em] text-[#07111F]/60";

const rowLabelClass =
  "text-[11px] font-bold uppercase tracking-[0.16em]";

const rowTitleClass =
  "mt-[8px] text-[17px] font-semibold leading-[22px] tracking-[-0.015em] text-[#07111F]";

const rowBodyClass = "mt-[6px] text-[14px] leading-[22px] text-slate-500";

const numberClass =
  "font-sans text-[21px] font-semibold leading-none tracking-[-0.035em] text-[#07111F]/80 [font-variant-numeric:tabular-nums]";

export default function StelisHealthIndex({
  score,
  trendLabel,
  trendDirection,
  biggestPositiveFactor,
  biggestNegativeFactor,
  fastestPathToImprovement,
}: StelisHealthIndexProps) {
  const safeScore = clampScore(score);
  const status = getHealthStatus(safeScore);
  const healthTone = getHealthTone(safeScore);

  const statusStyles: Record<HealthTone, string> = {
    positive: "text-[#07111F]",
    neutral: "text-[#07111F]",
    risk: "text-[#D62828]",
  };

  const scoreBarStyles: Record<HealthTone, string> = {
    positive: "bg-[#34C759]",
    neutral: "bg-[#07111F]",
    risk: "bg-[#D62828]",
  };

  const trendStyles: Record<HealthTrendDirection, string> = {
    up: "bg-[#34C759]/10 text-[#1E9E45] ring-[#34C759]/25",
    down: "bg-[#D62828]/10 text-[#D62828] ring-[#D62828]/25",
    flat: "bg-[#07111F]/5 text-[#07111F] ring-[#07111F]/10",
  };

  return (
    <StelisCard className="overflow-hidden">
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-start justify-between gap-[21px]">
          <div>
            <p className={labelClass}>STELIS Health Index™</p>

            <div className="mt-[13px] flex flex-wrap items-end gap-x-[14px] gap-y-[8px]">
              <h2
                className={`font-serif text-[46px] font-medium leading-none tracking-[-0.035em] ${statusStyles[healthTone]}`}
              >
                {status}
              </h2>

              <p className={`pb-[6px] ${numberClass}`}>{safeScore} / 100</p>
            </div>
          </div>

          <div className="text-right">
            <p className={labelClass}>Trend</p>

            <div
              className={`mt-[10px] inline-flex rounded-full px-[14px] py-[8px] text-[12px] font-semibold leading-none ring-1 ${trendStyles[trendDirection]}`}
            >
              {trendLabel}
            </div>
          </div>
        </div>

        <p className="max-w-[620px] text-[15px] leading-[24px] text-slate-500">
          A single operating signal across cash, sales momentum, inventory
          readiness, supplier standing, waste control, and execution.
        </p>

        <div className="h-[7px] overflow-hidden rounded-full bg-[#07111F]/10">
          <div
            className={`h-full rounded-full transition-all duration-300 ${scoreBarStyles[healthTone]}`}
            style={{ width: `${safeScore}%` }}
          />
        </div>

        <div className="border-t border-[#07111F]/10 pt-[24px]">
          <div className="space-y-[18px]">
            <div className="rounded-[16px] border border-[#07111F]/10 bg-[#F6F8FB] px-[18px] py-[16px]">
              <p className={`${rowLabelClass} text-[#1E9E45]`}>
                Biggest Positive
              </p>

              <p className={rowTitleClass}>{biggestPositiveFactor.title}</p>

              <p className={rowBodyClass}>{biggestPositiveFactor.detail}</p>

              <p className="mt-[10px] text-[13px] font-semibold leading-[20px] text-[#1E9E45]">
                {biggestPositiveFactor.impact}
              </p>
            </div>

            <div className="rounded-[16px] border border-[#D62828]/15 bg-[#D62828]/[0.03] px-[18px] py-[16px]">
              <p className={`${rowLabelClass} text-[#D62828]`}>
                Biggest Negative
              </p>

              <p className={rowTitleClass}>{biggestNegativeFactor.title}</p>

              <p className={rowBodyClass}>{biggestNegativeFactor.detail}</p>

              <p className="mt-[10px] text-[13px] font-semibold leading-[20px] text-[#D62828]">
                {biggestNegativeFactor.impact}
              </p>
            </div>

            <div className="rounded-[16px] border border-[#07111F]/10 bg-white px-[18px] py-[16px]">
              <p className={`${rowLabelClass} text-[#07111F]/65`}>
                Fastest Improvement
              </p>

              <p className={rowTitleClass}>{fastestPathToImprovement.title}</p>

              <p className={rowBodyClass}>
                {fastestPathToImprovement.detail}
              </p>

              <p className="mt-[10px] text-[13px] font-semibold leading-[20px] text-[#07111F]">
                {fastestPathToImprovement.expectedImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </StelisCard>
  );
}
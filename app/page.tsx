import StelisCard from "./components/StelisCard";
import StelisCashPosition from "./components/StelisCashPosition";
import StelisKPI from "./components/StelisKPI";
import StelisAttentionRequired from "./components/StelisAttentionRequired";
import StelisHealthIndex from "./components/StelisHealthIndex";
import StelisSidebar from "./components/StelisSidebar";

const availableCash = 180000;
const committedCash = 164171;
const freeCash = availableCash - committedCash;
const cashScore = 94;

const salesYesterday = 30347.25;
const salesLastYear = 26880.0;
const difference = salesYesterday - salesLastYear;
const percentChange = (difference / salesLastYear) * 100;

function formatMoney(amount: number) {
  return `L\u00A0${amount.toLocaleString("en-US")}`;
}

const smallMetricNumberClass =
  "mt-[13px] whitespace-nowrap font-sans text-[22px] font-semibold leading-none tracking-[-0.035em] text-[#07111F] [font-variant-numeric:tabular-nums]";

const attentionItems = [
  {
    title: "BELCA payment due Thursday",
    detail: "Payment should be protected to avoid supplier friction.",
    severity: "warning" as const,
  },
  {
    title: "Cheese inventory below target",
    detail: "Projected to fall below safe level within 2 days.",
    severity: "critical" as const,
  },
  {
    title: "Waste increased yesterday",
    detail: "Waste rose above target and should be reviewed by operations.",
    severity: "warning" as const,
  },
];

const healthIndex = {
  score: 91,
  trendLabel: "+2.4% versus previous period",
  trendDirection: "up" as const,
  biggestPositiveFactor: {
    title: "Cash obligations covered",
    detail:
      "Payroll and supplier payments remain protected after committed cash is removed.",
    impact: "+8 points from Cash Health",
  },
  biggestNegativeFactor: {
    title: "Cheese inventory pressure",
    detail:
      "Projected to fall below target within 2 days, increasing production risk.",
    impact: "-3 points from Inventory Health",
  },
  fastestPathToImprovement: {
    title: "Approve cheese purchase today",
    detail:
      "Protects high-demand items before the next service window and reduces stockout risk.",
    expectedImpact: "Expected to recover 3 Inventory Health points.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F8FB] text-[#07111F] lg:flex">
      <StelisSidebar />

      <section className="min-h-screen w-full flex-1 px-[21px] py-[34px] md:px-[34px]">
        <header className="flex items-start justify-between gap-[21px]">
          <div>
            <p className="font-serif text-[34px] font-medium leading-none tracking-tight text-[#07111F]">
              Good morning, Marvin.
            </p>

            <p className="mt-[8px] text-[13px] font-semibold uppercase tracking-[0.34em] text-[#07111F]/70">
              Friday, June 12, 2026
            </p>
          </div>

          <div className="rounded-full bg-[#07111F] px-[21px] py-[8px] text-[13px] font-medium text-white shadow-[0_13px_34px_rgba(7,17,31,0.16)]">
            Last update: 7:15 AM
          </div>
        </header>

        <div className="mt-[34px]">
          <StelisCashPosition
            availableCash={availableCash}
            committedCash={committedCash}
            freeCash={freeCash}
            cashScore={cashScore}
          />
        </div>

        <div className="mt-[34px] grid gap-[34px] xl:grid-cols-2">
          <StelisHealthIndex {...healthIndex} />
          <StelisAttentionRequired items={attentionItems} />
        </div>

        <div className="mt-[34px] grid gap-[34px] lg:grid-cols-[1.618fr_1fr]">
          <StelisCard>
            <StelisKPI
              label="Sales Yesterday"
              helper="Compared with same day last year"
              value={formatMoney(salesYesterday)}
              trend={`+${percentChange.toFixed(1)}%`}
              tone="positive"
            />

            <div className="mt-[34px] grid gap-[21px] md:grid-cols-2">
              <div className="rounded-[13px] border border-[#07111F]/10 bg-[#F6F8FB] p-[21px]">
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#07111F]/55">
                  Last Year Same Day
                </p>

                <p className={smallMetricNumberClass}>
                  {formatMoney(salesLastYear)}
                </p>
              </div>

              <div className="rounded-[13px] border border-[#07111F]/10 bg-[#F6F8FB] p-[21px]">
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#07111F]/55">
                  Difference
                </p>

                <p className={`${smallMetricNumberClass} text-[#1E9E45]`}>
                  +{formatMoney(difference)}
                </p>
              </div>
            </div>
          </StelisCard>

          <StelisCard>
            <p className="text-[13px] font-bold uppercase tracking-[0.34em] text-[#07111F]">
              STELIS Intelligence
            </p>

            <p className="mt-[21px] max-w-[610px] text-[21px] leading-[34px] text-[#07111F]">
              Payroll remains covered.
            </p>

            <p className="mt-[13px] text-[21px] leading-[34px] text-slate-500">
              Current free cash is positive after committed obligations.
              Continue protecting supplier payments and avoid non-essential
              purchases today.
            </p>
          </StelisCard>
        </div>
      </section>
    </main>
  );
}
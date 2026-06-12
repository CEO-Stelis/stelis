import StelisCard from "./components/StelisCard";
import StelisCashPosition from "./components/StelisCashPosition";
import StelisKPI from "./components/StelisKPI";
import StelisAttentionRequired from "./components/StelisAttentionRequired";

const availableCash = 180000;
const committedCash = 164171;
const freeCash = availableCash - committedCash;
const cashScore = 94;

const salesYesterday = 30347.25;
const salesLastYear = 26880.0;
const difference = salesYesterday - salesLastYear;
const percentChange = (difference / salesLastYear) * 100;
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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#07111F]">
      <section className="mx-auto max-w-[1320px] px-[34px] py-[34px]">
        <header className="flex items-center justify-between">
          <p className="text-[13px] font-bold uppercase tracking-[0.45em] text-[#07111F]">
            STELIS
          </p>

          <div className="rounded-full bg-[#07111F] px-[21px] py-[8px] text-[13px] text-white">
            Owner Morning Brief
          </div>
        </header>

        <div className="mt-[34px]">
          <p className="text-[21px] text-slate-500">Good morning, Marvin.</p>

          <h1 className="mt-[13px] max-w-[816px] text-[55px] font-semibold leading-[0.95] tracking-tight md:text-[89px]">
            Cash is safe. Business is moving.
          </h1>
        </div>

        <div className="mt-[55px]">
          <StelisCashPosition
            availableCash={availableCash}
            committedCash={committedCash}
            freeCash={freeCash}
            cashScore={cashScore}
          />
        </div>
<div className="mt-[34px]">
  <StelisAttentionRequired items={attentionItems} />
</div>
        <div className="mt-[34px] grid gap-[34px] lg:grid-cols-[1.618fr_1fr]">
          <StelisCard>
            <StelisKPI
              label="Sales Yesterday"
              helper="Compared with same day last year"
              value={`L ${salesYesterday.toLocaleString("en-US")}`}
              trend={`+${percentChange.toFixed(1)}%`}
              tone="positive"
            />

            <div className="mt-[55px] grid gap-[21px] md:grid-cols-2">
              <div className="rounded-[21px] bg-[#F5F7FA] p-[34px]">
                <p className="text-[13px] text-slate-500">
                  Last year same day
                </p>
                <p className="mt-[13px] text-[21px] font-semibold">
                  L {salesLastYear.toLocaleString("en-US")}
                </p>
              </div>

              <div className="rounded-[21px] bg-[#F5F7FA] p-[34px]">
                <p className="text-[13px] text-slate-500">Difference</p>
                <p className="mt-[13px] text-[21px] font-semibold text-[#34C759]">
                  +L {difference.toLocaleString("en-US")}
                </p>
              </div>
            </div>
          </StelisCard>

          <StelisCard variant="navy">
            <div className="mb-[34px] h-[8px] w-[89px] rounded-full bg-[#34C759]" />

            <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-300">
              STELIS Intelligence
            </p>

            <p className="mt-[34px] text-[34px] font-semibold leading-[1.05] tracking-tight">
              Payroll remains covered.
            </p>

            <p className="mt-[21px] text-[21px] leading-[34px] text-slate-300">
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
import StelisCard from "./components/StelisCard";
import StelisKPI from "./components/StelisKPI";

const salesYesterday = 30347.25;
const salesLastYear = 26880.0;
const difference = salesYesterday - salesLastYear;
const percentChange = (difference / salesLastYear) * 100;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#07111F]">
      <section className="mx-auto max-w-[1320px] px-[34px] py-[34px]">
        <header className="flex items-center justify-between">
          <p className="text-[13px] font-bold uppercase tracking-[0.45em] text-[#07111F]">
            STELIS
          </p>

          <div className="rounded-full bg-[#07111F] px-[21px] py-[8px] text-[13px] text-white">
            Owner Command Center
          </div>
        </header>

        <div className="mt-[34px] rounded-[34px] bg-[#07111F] px-[34px] py-[55px] text-white shadow-2xl md:px-[55px] md:py-[89px]">
          <div className="mb-[34px] h-[8px] w-[89px] rounded-full bg-[#D62828]" />

          <p className="text-[21px] text-slate-300">Good morning, Marvin.</p>

          <h1 className="mt-[21px] max-w-[816px] text-[55px] font-semibold leading-[0.95] tracking-tight md:text-[89px]">
            Your restaurant, understood.
          </h1>

          <p className="mt-[34px] max-w-[610px] text-[21px] leading-[34px] text-slate-300">
            Sales, inventory, cash, payments, and the next best action — clear
            in one executive view.
          </p>
        </div>

        <div className="mt-[34px] grid gap-[34px] lg:grid-cols-[1.618fr_1fr]">
          <StelisCard>
            <StelisKPI
              label="Sales Yesterday"
              helper="Compared with same day last year"
              value={`L ${salesYesterday.toLocaleString("en-US")}`}
              trend={`+${percentChange.toFixed(1)}%`}
              tone="neutral"
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
                <p className="mt-[13px] text-[21px] font-semibold text-[#D62828]">
                  +L {difference.toLocaleString("en-US")}
                </p>
              </div>
            </div>
          </StelisCard>

          <StelisCard variant="navy">
            <div className="mb-[34px] h-[8px] w-[89px] rounded-full bg-[#D62828]" />

            <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-300">
              AI Recommendation
            </p>

            <p className="mt-[34px] text-[34px] font-semibold leading-[1.05] tracking-tight">
              Sales are ahead of last year.
            </p>

            <p className="mt-[21px] text-[21px] leading-[34px] text-slate-300">
              Protect inventory today. Higher sales may increase pressure on
              beans, cheese, tortillas, and cash purchases.
            </p>
          </StelisCard>
        </div>
      </section>
    </main>
  );
}
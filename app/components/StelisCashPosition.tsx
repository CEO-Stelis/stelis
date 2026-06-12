import StelisCard from "./StelisCard";

type StelisCashPositionProps = {
  availableCash: number;
  committedCash: number;
  freeCash: number;
  cashScore: number;
};

export default function StelisCashPosition({
  availableCash,
  committedCash,
  freeCash,
  cashScore,
}: StelisCashPositionProps) {
  return (
    <StelisCard variant="navy" className="relative overflow-hidden">
      <div className="absolute right-[-89px] top-[-89px] h-[233px] w-[233px] rounded-full bg-[#34C759]/10" />

      <div className="relative">
        <p className="text-[13px] font-bold uppercase tracking-[0.45em] text-[#34C759]">
          Cash Position
        </p>

        <div className="mt-[34px] grid gap-[34px] lg:grid-cols-[1.618fr_1fr]">
          <div>
            <p className="text-[21px] text-slate-300">True Free Cash</p>

            <p className="mt-[13px] text-[55px] font-semibold leading-none tracking-tight text-white md:text-[89px]">
              L {freeCash.toLocaleString("en-US")}
            </p>

            <p className="mt-[21px] max-w-[610px] text-[21px] leading-[34px] text-slate-300">
              This is the cash truly available after subtracting committed
              obligations.
            </p>
          </div>

          <div className="rounded-[34px] bg-white/10 p-[34px]">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-300">
              Cash Score
            </p>

            <p className="mt-[21px] text-[55px] font-semibold leading-none text-[#34C759]">
              {cashScore} / 100
            </p>

            <div className="mt-[21px] h-[13px] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#34C759]"
                style={{ width: `${cashScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-[55px] grid gap-[21px] md:grid-cols-2">
          <div className="rounded-[21px] bg-white/10 p-[34px]">
            <p className="text-[13px] text-slate-300">Available Cash</p>
            <p className="mt-[13px] text-[34px] font-semibold text-white">
              L {availableCash.toLocaleString("en-US")}
            </p>
          </div>

          <div className="rounded-[21px] bg-white/10 p-[34px]">
            <p className="text-[13px] text-slate-300">Committed Cash</p>
            <p className="mt-[13px] text-[34px] font-semibold text-white">
              L {committedCash.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
    </StelisCard>
  );
}
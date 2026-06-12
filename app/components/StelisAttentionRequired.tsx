import StelisCard from "./StelisCard";

type AttentionItem = {
  title: string;
  detail: string;
  severity: "warning" | "critical";
};

type StelisAttentionRequiredProps = {
  items: AttentionItem[];
};

export default function StelisAttentionRequired({
  items,
}: StelisAttentionRequiredProps) {
  const visibleItems = items.slice(0, 3);

  return (
    <StelisCard className="border-[#D62828]/10">
      <div className="flex items-start justify-between gap-[21px]">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.45em] text-[#D62828]">
            Attention Required
          </p>

          <h2 className="mt-[13px] text-[34px] font-semibold leading-[1.05] tracking-tight text-[#07111F]">
            What can hurt the business today.
          </h2>
        </div>

        <div className="rounded-full border border-[#D62828]/20 px-[13px] py-[8px] text-[13px] font-semibold text-[#D62828]">
          {visibleItems.length} risks
        </div>
      </div>

      <div className="mt-[34px] space-y-[21px]">
        {visibleItems.map((item) => (
          <div
            key={item.title}
            className="rounded-[21px] border border-slate-200 bg-[#F5F7FA] p-[21px]"
          >
            <div className="flex gap-[13px]">
              <div className="mt-[8px] h-[8px] w-[8px] rounded-full bg-[#D62828]/70" />

              <div>
                <p className="text-[21px] font-semibold leading-[1.1] text-[#07111F]">
                  {item.title}
                </p>

                <p className="mt-[8px] text-[13px] leading-[21px] text-slate-500">
                  {item.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-[34px] rounded-full border border-[#07111F]/10 px-[21px] py-[13px] text-[13px] font-semibold text-[#07111F] transition hover:border-[#07111F]/25 hover:bg-[#07111F]/5">
  View risk details →
</button>
    </StelisCard>
  );
}
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
    <StelisCard className="border-[#07111F]/10">
      <div className="flex items-start justify-between gap-[21px]">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.34em] text-[#07111F]">
            Attention Required
          </p>

          <h2 className="mt-[13px] font-serif text-[34px] font-medium leading-[1.05] tracking-tight text-[#07111F]">
            What can hurt the business today.
          </h2>
        </div>

        <div className="rounded-full border border-[#07111F]/10 px-[21px] py-[8px] text-[13px] font-semibold uppercase tracking-[0.13em] text-[#07111F]">
          {visibleItems.length} risks
        </div>
      </div>

      <div className="mt-[21px] space-y-[13px]">
        {visibleItems.map((item) => (
          <div
            key={item.title}
            className="rounded-[13px] border border-[#07111F]/10 bg-[#F6F8FB] px-[21px] py-[13px]"
          >
            <div className="grid gap-[13px] md:grid-cols-[0.382fr_1fr] md:items-center">
              <div className="flex items-center gap-[13px]">
                <div className="h-[8px] w-[8px] rounded-full bg-[#D62828]" />

                <p className="text-[13px] font-semibold leading-[21px] text-[#07111F]">
                  {item.title}
                </p>
              </div>

              <p className="border-[#07111F]/10 text-[13px] leading-[21px] text-slate-500 md:border-l md:pl-[21px]">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-[21px] text-[13px] font-semibold text-[#07111F] underline decoration-[#00AEEF]/35 underline-offset-[8px] transition duration-150 hover:text-[#00AEEF]">
        View risk details
      </button>
    </StelisCard>
  );
}

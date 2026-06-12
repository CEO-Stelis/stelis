const navigationItems = [
  { label: "Morning Brief", active: true, alertCount: 3 },
  { label: "Cash Control", active: false },
  { label: "Inventory", active: false },
  { label: "Sales", active: false },
  { label: "Operations", active: false },
  { label: "Suppliers", active: false },
  { label: "Reports", active: false },
  { label: "Settings", active: false },
];

export default function StelisSidebar() {
  return (
    <aside className="hidden min-h-screen w-[276px] flex-col justify-between bg-[#06101D] px-[26px] py-[34px] text-white shadow-[13px_0_34px_rgba(7,17,31,0.12)] lg:flex">
      <div>
        <div>
          <p className="font-serif text-[34px] font-medium leading-none tracking-[0.24em]">
            STELIS
          </p>

          <p className="mt-[10px] text-[10px] font-bold uppercase tracking-[0.34em] text-slate-400">
            Executive Intelligence
          </p>
        </div>

        <nav className="mt-[55px] space-y-[11px]">
          {navigationItems.map((item) => {
            return (
              <div
                key={item.label}
                className={`flex min-h-[52px] items-center justify-between rounded-[16px] px-[18px] py-[13px] transition duration-150 ${
                  item.active
                    ? "bg-white/10 text-white shadow-[inset_3px_0_0_#00AEEF]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-[13px]">
                  <span
                    className={`h-[8px] w-[8px] shrink-0 rounded-full ${
                      item.active ? "bg-[#00AEEF]" : "bg-white/20"
                    }`}
                  />

                  <span className="text-[15px] font-semibold leading-none">
                    {item.label}
                  </span>
                </div>

                {item.alertCount ? (
                  <span className="rounded-full bg-[#D62828]/12 px-[10px] py-[5px] text-[12px] font-bold leading-none text-[#FF4A4A] ring-1 ring-[#D62828]/25">
                    {item.alertCount}
                  </span>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="space-y-[21px]">
        <div className="rounded-[18px] border border-[#D62828]/20 bg-[#D62828]/8 px-[18px] py-[16px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF4A4A]">
            Risk Watch
          </p>

          <p className="mt-[8px] text-[14px] font-semibold leading-[20px] text-white">
            3 items need attention today.
          </p>
        </div>

        <div className="border-t border-white/10 pt-[21px]">
          <div className="flex items-center gap-[13px]">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 text-[15px] font-semibold">
              MP
            </div>

            <div>
              <p className="text-[15px] font-semibold leading-none text-white">
                Marvin
              </p>
              <p className="mt-[6px] text-[13px] leading-none text-slate-400">
                Owner
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
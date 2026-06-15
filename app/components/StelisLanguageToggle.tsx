type StelisLanguage = "en" | "es";

type StelisLanguageToggleProps = {
  language: StelisLanguage;
  onChange: (language: StelisLanguage) => void;
};

export default function StelisLanguageToggle({
  language,
  onChange,
}: StelisLanguageToggleProps) {
  return (
    <div className="flex items-center rounded-full border border-[#07111F]/10 bg-white p-[4px] shadow-[0_13px_34px_rgba(7,17,31,0.08)]">
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`rounded-full px-[14px] py-[7px] text-[12px] font-semibold transition duration-150 ${
          language === "en"
            ? "bg-[#07111F] text-white"
            : "text-[#07111F]/60 hover:text-[#07111F]"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => onChange("es")}
        className={`rounded-full px-[14px] py-[7px] text-[12px] font-semibold transition duration-150 ${
          language === "es"
            ? "bg-[#07111F] text-white"
            : "text-[#07111F]/60 hover:text-[#07111F]"
        }`}
      >
        ES
      </button>
    </div>
  );
}
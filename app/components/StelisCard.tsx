type StelisCardProps = {
  children: React.ReactNode;
  variant?: "light" | "navy";
  className?: string;
};

export default function StelisCard({
  children,
  variant = "light",
  className = "",
}: StelisCardProps) {
  const baseStyles =
    "rounded-[34px] p-[34px] shadow-xl transition-all duration-300";

  const variantStyles =
    variant === "navy"
      ? "bg-[#0B1F3A] text-white"
      : "border border-slate-200 bg-white text-[#07111F]";

  return <div className={`${baseStyles} ${variantStyles} ${className}`}>{children}</div>;
}
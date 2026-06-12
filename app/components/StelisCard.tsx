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
    "rounded-[21px] p-[34px] shadow-[0_21px_55px_rgba(7,17,31,0.07)] transition-all duration-300";

  const variantStyles =
    variant === "navy"
      ? "border border-white/10 bg-[#07111F] text-white"
      : "border border-[#07111F]/10 bg-white text-[#07111F]";

  return <div className={`${baseStyles} ${variantStyles} ${className}`}>{children}</div>;
}

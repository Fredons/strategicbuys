interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  theme = "light",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div className={isCenter ? "text-center" : "text-left"}>
      <div
        className={`mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${
          isDark ? "text-gold-light" : "text-gold"
        } ${isCenter ? "justify-center" : ""}`}
      >
        <span
          className={`inline-block h-0.5 w-7 ${
            isDark ? "bg-gold-light" : "bg-gold"
          }`}
        />
        {label}
      </div>
      <h2
        className={`font-heading text-3xl font-bold lg:text-4xl ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 max-w-[600px] ${isCenter ? "mx-auto" : ""} ${
            isDark ? "text-white/70" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

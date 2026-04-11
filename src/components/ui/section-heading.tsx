import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  highlightColor?: "purple" | "green";
};

export default function SectionHeading({
  badge,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
  highlightColor = "purple",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-purple-light">
          {badge}
        </span>
      )}
      <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
        {title}{" "}
        {titleHighlight && (
          <span className={highlightColor === "green" ? "gradient-text-green" : "gradient-text"}>
            {titleHighlight}
          </span>
        )}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  highlight?: boolean;
  className?: string;
};

export default function StatCard({ value, label, highlight, className }: StatCardProps) {
  if (highlight) {
    return (
      <div
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl p-6 text-center",
          "bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-purple-500/20",
          "border border-purple-500/30",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        <span
          className="relative text-4xl font-bold gradient-text"
          style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
        >
          {value}
        </span>
        <span className="relative text-sm font-medium text-white/80">{label}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl p-6 text-center",
        "bg-card border border-border card-glow",
        className
      )}
    >
      <span
        className="text-4xl font-bold text-white"
        style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
      >
        {value}
      </span>
      <span className="text-sm font-medium text-muted">{label}</span>
    </div>
  );
}

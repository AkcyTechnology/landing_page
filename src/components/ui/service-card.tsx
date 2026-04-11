import Link from "next/link";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
  className?: string;
};

function ServiceIcon({ type }: { type: string }) {
  if (type === "code") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (type === "device") {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

export default function ServiceCard({ icon, title, description, href, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-5 rounded-2xl p-6 sm:p-7",
        "bg-card border border-border card-glow",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-light border border-purple-500/20">
        <ServiceIcon type={icon} />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>

      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-purple-light transition-all hover:gap-3 hover:text-white"
      >
        Detaylı İncele
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}

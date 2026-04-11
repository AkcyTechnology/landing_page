import { cn } from "@/lib/utils";
import Link from "next/link";

type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function PrimaryButton({
  href,
  children,
  className,
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition-all",
        "bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white",
        "shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(236,72,153,0.35)]",
        className
      )}
    >
      {children}
    </Link>
  );
}
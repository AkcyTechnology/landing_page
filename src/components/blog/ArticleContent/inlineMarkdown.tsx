import type { ReactNode } from "react";
import Link from "@/i18n/Link";

const TOKEN_PATTERN =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

export function parseInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(TOKEN_PATTERN).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }

    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);

    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
            <span aria-hidden="true"> ↗</span>
          </a>
        );
      }

      return (
        <Link key={index} href={href}>
          {label}
        </Link>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

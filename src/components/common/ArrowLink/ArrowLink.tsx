import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./ArrowLink.module.scss";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function ArrowLink({
  href,
  children,
  className,
}: ArrowLinkProps) {
  return (
    <Link href={href} className={`${styles.link} ${className ?? ""}`}>
      <span>{children}</span>
      <b aria-hidden="true">↗</b>
    </Link>
  );
}

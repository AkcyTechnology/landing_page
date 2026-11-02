import Link from "@/i18n/Link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";

interface BaseProps {
  children: ReactNode;
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  type?: undefined;
}

interface SubmitButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: undefined;
}

type ButtonProps = LinkButtonProps | SubmitButtonProps;

export default function Button({
  children,
  className,
  href,
  ...rest
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <b aria-hidden="true">↗</b>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.button} ${className ?? ""}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${styles.button} ${className ?? ""}`}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}

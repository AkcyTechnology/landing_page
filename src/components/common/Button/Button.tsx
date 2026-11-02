import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import Link from "@/i18n/Link";

import styles from "./Button.module.scss";

/*
  Ortak buton bileşeni (stil: src/styles/_buttons.scss).
  Yönlendirme için href verilir (bağlantı), işlem için verilmez (gerçek <button>).
*/
export type ButtonVariant = "primary" | "secondary" | "on-dark" | "ghost-dark" | "text" | "text-on-dark";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "default" | "small";
  /** Metnin sonunda gösterilecek ikon (18 px) */
  icon?: ReactNode;
  className?: string;
}

type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & { href: string };

type ActionButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    /** Yükleniyor: genişlik korunur, tekrar tıklama engellenir */
    loading?: boolean;
  };

export type ButtonProps = LinkButtonProps | ActionButtonProps;

export default function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "default", icon, className } = props;
  const classes = [styles.button, styles[variant], size === "small" ? styles.small : "", className ?? ""].join(" ");
  const content = (
    <>
      <span>{children}</span>
      {icon && <span aria-hidden="true">{icon}</span>}
    </>
  );

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children: _c, variant: _v, size: _s, icon: _i, className: _cn, href, ...rest } = props;
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children: _c, variant: _v, size: _s, icon: _i, className: _cn, loading, type, onClick, ...rest } = props;
  return (
    <button
      type={type ?? "button"}
      className={classes}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...rest}
    >
      {content}
    </button>
  );
}

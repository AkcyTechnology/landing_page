"use client";

import { useT } from "@/i18n/LocaleProvider";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  const t = useT().blog.listing;
  return (
    <label className={styles.search}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="7"
          cy="7"
          r="5.25"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M11 11L14.5 14.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? t.searchPlaceholder}
        aria-label={t.searchLabel}
      />
    </label>
  );
}

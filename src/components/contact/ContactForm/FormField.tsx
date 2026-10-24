import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import styles from "./ContactForm.module.scss";

interface BaseFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

interface InputFieldProps
  extends BaseFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  as?: "input";
}

interface TextareaFieldProps
  extends BaseFieldProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  as: "textarea";
}

interface SelectFieldProps
  extends BaseFieldProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  as: "select";
  options: { value: string; label: string }[];
  placeholder?: string;
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export default function FormField(props: FormFieldProps) {
  const { id, label, error, required, as = "input", ...rest } = props;

  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div
      className={`${styles.field} ${error ? styles.fieldError : ""}`}
    >
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      {as === "textarea" && (
        <textarea
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )}

      {as === "select" && (
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {(props as SelectFieldProps).placeholder && (
            <option value="">{(props as SelectFieldProps).placeholder}</option>
          )}
          {(props as SelectFieldProps).options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {as === "input" && (
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <span id={`${id}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

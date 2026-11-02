"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

import { services } from "@/data/services";
import FormField from "./FormField";
import TurnstileWidget, {
  TURNSTILE_SITE_KEY,
  type TurnstileHandle,
} from "./TurnstileWidget";
import styles from "./ContactForm.module.scss";

const projectTypes = [...services.map(service => service.title), "Diğer"];

const budgetRanges = [
  "Henüz belirlenmedi",
  "25.000 TL – 50.000 TL",
  "50.000 TL – 100.000 TL",
  "100.000 TL – 250.000 TL",
  "250.000 TL+",
  "Görüşelim",
];

const startTimelines = [
  "En kısa sürede",
  "1 ay içinde",
  "1–3 ay",
  "Henüz planlama aşamasında",
];

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  startTimeline: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budget: "",
  startTimeline: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Lütfen adınızı ve soyadınızı girin.";
  }

  if (!values.email.trim()) {
    errors.email = "Lütfen e-posta adresinizi girin.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Geçerli bir e-posta adresi girin.";
  }

  if (!values.message.trim()) {
    errors.message = "Lütfen projeniz hakkında birkaç bilgi paylaşın.";
  }

  return errors;
}

interface SpamGuard {
  // Botlar için tuzak alan; gerçek kullanıcıda her zaman boş kalır.
  website: string;
  // Formun açılmasından gönderime kadar geçen süre (çok hızlıysa bot).
  elapsedMs: number;
  turnstileToken: string;
}

async function submitContactForm(
  values: FormValues,
  guard: SpamGuard
): Promise<void> {
  const response = await fetch("/api/contact.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, ...guard }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    throw new Error(data?.error ?? "Mail gönderilemedi.");
  }
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [website, setWebsite] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const startedAt = useRef(0);
  const turnstile = useRef<TurnstileHandle>(null);

  // Form her görünür olduğunda süre sayacı yeniden başlar.
  useEffect(() => {
    if (status === "idle") startedAt.current = Date.now();
  }, [status]);

  const isSubmitting = status === "submitting";
  const awaitingVerification = Boolean(TURNSTILE_SITE_KEY) && !turnstileToken;

  const setField = <K extends keyof FormValues>(
    key: K,
    value: FormValues[K]
  ) => {
    setValues((previous) => ({
      ...previous,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((previous) => ({
        ...previous,
        [key]: undefined,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    const validationErrors = validate(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (awaitingVerification) return;

    setStatus("submitting");

    try {
      await submitContactForm(values, {
        website,
        elapsedMs: Date.now() - startedAt.current,
        turnstileToken,
      });

      setValues(initialValues);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "");
      setStatus("error");
    } finally {
      turnstile.current?.reset();
    }
  };

  if (status === "success") {
    return (
      <motion.div
        className={styles.success}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 0.8, 0.25, 1],
        }}
      >
        <div className={styles.successIcon}>✓</div>

        <h3>Mesajınızı aldık.</h3>

        <p>
          Teşekkür ederiz. Projenizi inceleyip en kısa sürede sizinle
          iletişime geçeceğiz.
        </p>

        <button
          type="button"
          className={styles.resetLink}
          onClick={() => setStatus("idle")}
        >
          Yeni mesaj gönder
          <span aria-hidden="true">→</span>
        </button>
      </motion.div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      {/* Botlar için tuzak alan; kullanıcılara ve ekran okuyuculara gizli. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Web siteniz</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className={styles.row}>
        <FormField
          id="contact-name"
          label="Ad Soyad"
          required
          placeholder="Adınız ve soyadınız"
          value={values.name}
          onChange={(event) => setField("name", event.target.value)}
          error={errors.name}
          disabled={isSubmitting}
          autoComplete="name"
        />

        <FormField
          id="contact-email"
          label="E-posta"
          type="email"
          required
          placeholder="ornek@email.com"
          value={values.email}
          onChange={(event) => setField("email", event.target.value)}
          error={errors.email}
          disabled={isSubmitting}
          autoComplete="email"
        />
      </div>

      <div className={styles.row}>
        <FormField
          id="contact-phone"
          label="Telefon"
          type="tel"
          placeholder="+90 5XX XXX XX XX"
          value={values.phone}
          onChange={(event) => setField("phone", event.target.value)}
          disabled={isSubmitting}
          autoComplete="tel"
        />

        <FormField
          id="contact-company"
          label="Firma / Marka"
          placeholder="Firma veya marka adı"
          value={values.company}
          onChange={(event) => setField("company", event.target.value)}
          disabled={isSubmitting}
          autoComplete="organization"
        />
      </div>

      <div className={styles.row}>
        <FormField
          id="contact-project-type"
          as="select"
          label="Proje türü"
          placeholder="Bir hizmet seçin"
          value={values.projectType}
          onChange={(event) => setField("projectType", event.target.value)}
          disabled={isSubmitting}
          options={projectTypes.map((type) => ({
            value: type,
            label: type,
          }))}
        />

        <FormField
          id="contact-budget"
          as="select"
          label="Tahmini bütçe"
          placeholder="Bir aralık seçin"
          value={values.budget}
          onChange={(event) => setField("budget", event.target.value)}
          disabled={isSubmitting}
          options={budgetRanges.map((range) => ({
            value: range,
            label: range,
          }))}
        />
      </div>

      <FormField
        id="contact-start-timeline"
        as="select"
        label="Tahmini başlangıç"
        placeholder="Bir zaman aralığı seçin"
        value={values.startTimeline}
        onChange={(event) => setField("startTimeline", event.target.value)}
        disabled={isSubmitting}
        options={startTimelines.map((timeline) => ({
          value: timeline,
          label: timeline,
        }))}
      />

      <FormField
        id="contact-message"
        as="textarea"
        label="Projenizden bahsedin"
        required
        placeholder="Projenizin amacı, ihtiyacınız ve varsa hedeflediğiniz zaman planından kısaca bahsedebilirsiniz."
        rows={6}
        value={values.message}
        onChange={(event) => setField("message", event.target.value)}
        error={errors.message}
        disabled={isSubmitting}
      />

      <TurnstileWidget ref={turnstile} onToken={setTurnstileToken} />

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            className={styles.formError}
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {errorMessage && errorMessage !== "Mail gönderilemedi."
              ? `${errorMessage} `
              : "Mesajınız gönderilemedi. "}
            Tekrar deneyebilir veya{" "}
            <a href="mailto:akcyglobal@gmail.com">akcyglobal@gmail.com</a> adresine yazabilirsiniz.
          </motion.p>
        )}
      </AnimatePresence>

      <div className={styles.footer}>
        <p>
          Formu göndererek sizinle iletişime geçmemizi kabul etmiş olursunuz.
        </p>

        <button
          type="submit"
          className={styles.submit}
          data-magnetic
          disabled={isSubmitting || awaitingVerification}
        >
          <span>
            {isSubmitting
              ? "Gönderiliyor..."
              : awaitingVerification
                ? "Doğrulama bekleniyor..."
                : "Mesaj Gönder"}
          </span>

          <b aria-hidden="true">↗</b>
        </button>
      </div>
    </form>
  );
}

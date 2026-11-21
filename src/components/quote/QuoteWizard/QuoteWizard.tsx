"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import Link from "@/i18n/Link";
import { getAllServices } from "@/data/services";
import { useLocale, useT } from "@/i18n/LocaleProvider";
import { trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/contact";
import TurnstileWidget, { TURNSTILE_SITE_KEY, type TurnstileHandle } from "@/components/contact/ContactForm/TurnstileWidget";
import BookingLink from "@/components/common/BookingLink/BookingLink";
import styles from "./QuoteWizard.module.scss";

/*
  Adım adım teklif formu: hizmet → proje → bütçe/zaman → iletişim.
  Gönderim iletişim formuyla aynı uç noktaya (/api/contact.php) gider ve aynı
  bot korumalarını kullanır (honeypot, süre, Turnstile). Fiyat hesaplanmaz:
  bütçe aralığını ziyaretçi kendisi seçer.
*/

interface Answers {
  services: string[];
  stage: string;
  description: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

const EMPTY: Answers = {
  services: [],
  stage: "",
  description: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  phone: "",
  company: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEPS = 4;

function Choice({
  selected,
  onClick,
  children,
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      className={`${styles.choice} ${selected ? styles.choiceSelected : ""}`}
      onClick={onClick}
    >
      <span className={multi ? styles.check : styles.radio} aria-hidden="true" />
      <span className={styles.choiceText}>{children}</span>
    </button>
  );
}

export default function QuoteWizard() {
  const locale = useLocale();
  const t = useT().quoteWizard;
  const form = useT().contact.form;
  const services = [...getAllServices(locale).map((service) => service.title), form.otherType];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Answers, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const startedAt = useRef(0);
  const turnstile = useRef<TurnstileHandle>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    trackEvent("quote_wizard_start");
  }, []);

  /* Adım değişince odak yeni başlığa taşınır (klavye ve ekran okuyucu için) */
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [step]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const toggleService = (service: string) =>
    set(
      "services",
      answers.services.includes(service)
        ? answers.services.filter((item) => item !== service)
        : [...answers.services, service]
    );

  const validate = (index: number) => {
    const next: Partial<Record<keyof Answers, string>> = {};
    if (index === 0 && answers.services.length === 0) next.services = t.errors.services;
    if (index === 1 && answers.description.trim().length < 10) next.description = t.errors.description;
    if (index === 3) {
      if (!answers.name.trim()) next.name = form.errors.name;
      if (!answers.email.trim()) next.email = form.errors.emailRequired;
      else if (!EMAIL_PATTERN.test(answers.email.trim())) next.email = form.errors.emailInvalid;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    trackEvent("quote_wizard_step", { step: step + 1 });
    setStep((value) => Math.min(value + 1, STEPS - 1));
  };

  const back = () => setStep((value) => Math.max(value - 1, 0));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (step < STEPS - 1) return next();
    if (!validate(step) || status === "submitting") return;
    if (TURNSTILE_SITE_KEY && !turnstileToken) return;

    setStatus("submitting");
    const message = [
      `${t.summary.stage}: ${answers.stage || "—"}`,
      "",
      answers.description.trim(),
    ].join("\n");

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name.trim(),
          email: answers.email.trim(),
          phone: answers.phone.trim(),
          company: answers.company.trim(),
          projectType: `[${t.source}] ${answers.services.join(", ")}`,
          budget: answers.budget,
          startTimeline: answers.timeline,
          message,
          website,
          elapsedMs: Date.now() - startedAt.current,
          turnstileToken,
        }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(
          locale === "tr"
            ? data?.error ?? ""
            : form.serverErrors[String(response.status) as keyof typeof form.serverErrors] ?? ""
        );
        setStatus("error");
        return;
      }
      trackEvent("generate_lead", { form: "quote_wizard", project_type: answers.services.join(", ") });
      setStatus("success");
    } catch {
      setErrorMessage("");
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
        transition={{ duration: 0.4, ease: [0.22, 0.8, 0.25, 1] }}
      >
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <h2>{t.successTitle}</h2>
        <p>{t.successText}</p>
        <BookingLink variant="card" />
        <Link href="/projelerimiz" className={styles.successLink}>
          {t.successLink} <span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    );
  }

  const stepTitles = [t.steps.services, t.steps.project, t.steps.budget, t.steps.contact];
  const progress = ((step + 1) / STEPS) * 100;

  return (
    <div className={styles.layout}>
      <form className={styles.card} onSubmit={submit} noValidate aria-busy={status === "submitting"}>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="quote-website">{form.honeypot}</label>
          <input
            id="quote-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <div className={styles.progressHead}>
          <span>
            {t.stepLabel.replace("{current}", String(step + 1)).replace("{total}", String(STEPS))}
          </span>
          <ol className={styles.stepDots} aria-hidden="true">
            {stepTitles.map((title, index) => (
              <li key={title} data-state={index < step ? "done" : index === step ? "current" : "todo"}>
                {title}
              </li>
            ))}
          </ol>
        </div>
        <div
          className={styles.progress}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS}
          aria-valuenow={step + 1}
          aria-label={t.progressLabel}
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            className={styles.body}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 0.8, 0.25, 1] }}
          >
            <h2 ref={heading} tabIndex={-1} className={styles.question}>
              {t.questions[step]}
            </h2>

            {step === 0 && (
              <>
                <p className={styles.hint}>{t.hints.services}</p>
                <div className={styles.grid} role="group" aria-label={t.questions[0]}>
                  {services.map((service) => (
                    <Choice
                      key={service}
                      multi
                      selected={answers.services.includes(service)}
                      onClick={() => toggleService(service)}
                    >
                      {service}
                    </Choice>
                  ))}
                </div>
                {errors.services && <p className={styles.error} role="alert">{errors.services}</p>}
              </>
            )}

            {step === 1 && (
              <>
                <div className={styles.grid} role="radiogroup" aria-label={t.stageLabel}>
                  {t.stages.map((stage) => (
                    <Choice key={stage} selected={answers.stage === stage} onClick={() => set("stage", stage)}>
                      {stage}
                    </Choice>
                  ))}
                </div>
                <label className={styles.field}>
                  <span>{t.descriptionLabel}</span>
                  <textarea
                    rows={5}
                    maxLength={4000}
                    value={answers.description}
                    placeholder={form.messagePlaceholder}
                    aria-invalid={Boolean(errors.description)}
                    onChange={(event) => set("description", event.target.value)}
                  />
                </label>
                {errors.description && <p className={styles.error} role="alert">{errors.description}</p>}
              </>
            )}

            {step === 2 && (
              <>
                <p className={styles.groupLabel}>{form.budget}</p>
                <div className={styles.grid} role="radiogroup" aria-label={form.budget}>
                  {form.budgetRanges.map((range) => (
                    <Choice key={range} selected={answers.budget === range} onClick={() => set("budget", range)}>
                      {range}
                    </Choice>
                  ))}
                </div>
                <p className={styles.groupLabel}>{form.timeline}</p>
                <div className={styles.grid} role="radiogroup" aria-label={form.timeline}>
                  {form.timelines.map((timeline) => (
                    <Choice key={timeline} selected={answers.timeline === timeline} onClick={() => set("timeline", timeline)}>
                      {timeline}
                    </Choice>
                  ))}
                </div>
                <p className={styles.hint}>{t.hints.budget}</p>
              </>
            )}

            {step === 3 && (
              <>
                <div className={styles.fields}>
                  <label className={styles.field}>
                    <span>{form.name} *</span>
                    <input
                      autoComplete="name"
                      value={answers.name}
                      placeholder={form.namePlaceholder}
                      aria-invalid={Boolean(errors.name)}
                      onChange={(event) => set("name", event.target.value)}
                    />
                    {errors.name && <em role="alert">{errors.name}</em>}
                  </label>
                  <label className={styles.field}>
                    <span>{form.email} *</span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={answers.email}
                      placeholder={form.emailPlaceholder}
                      aria-invalid={Boolean(errors.email)}
                      onChange={(event) => set("email", event.target.value)}
                    />
                    {errors.email && <em role="alert">{errors.email}</em>}
                  </label>
                  <label className={styles.field}>
                    <span>{form.phone}</span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={answers.phone}
                      onChange={(event) => set("phone", event.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>{form.company}</span>
                    <input
                      autoComplete="organization"
                      value={answers.company}
                      placeholder={form.companyPlaceholder}
                      onChange={(event) => set("company", event.target.value)}
                    />
                  </label>
                </div>
                <TurnstileWidget ref={turnstile} onToken={setTurnstileToken} />
                <p className={styles.consent}>
                  {form.consent}{" "}
                  <Link href="/kvkk">{form.consentLink}</Link>
                  {form.consentEnd}
                </p>
                {status === "error" && (
                  <p className={styles.error} role="alert">
                    {errorMessage || form.errorGeneric} {form.errorRetryStart}{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    {form.errorRetryEnd}
                  </p>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className={styles.actions}>
          {step > 0 ? (
            <button type="button" className={styles.backButton} onClick={back}>
              <span aria-hidden="true">←</span> {t.back}
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            className={styles.nextButton}
            disabled={status === "submitting" || (step === STEPS - 1 && Boolean(TURNSTILE_SITE_KEY) && !turnstileToken)}
          >
            {step < STEPS - 1
              ? t.next
              : status === "submitting"
                ? form.submitting
                : Boolean(TURNSTILE_SITE_KEY) && !turnstileToken
                  ? form.verifying
                  : t.submit}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>

      <aside className={styles.summary} aria-label={t.summary.title}>
        <p className={styles.summaryTitle}>{t.summary.title}</p>
        <dl>
          <div>
            <dt>{t.summary.services}</dt>
            <dd>{answers.services.length ? answers.services.join(", ") : "—"}</dd>
          </div>
          <div>
            <dt>{t.summary.stage}</dt>
            <dd>{answers.stage || "—"}</dd>
          </div>
          <div>
            <dt>{form.budget}</dt>
            <dd>{answers.budget || "—"}</dd>
          </div>
          <div>
            <dt>{form.timeline}</dt>
            <dd>{answers.timeline || "—"}</dd>
          </div>
        </dl>
        <ul className={styles.promises}>
          {t.promises.map((promise) => (
            <li key={promise}>{promise}</li>
          ))}
        </ul>
        <BookingLink variant="inline" />
      </aside>
    </div>
  );
}

'use client';

import { useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { opportunityTypes, person } from '@/data/site';
import type { ContactResponse } from '@/lib/types';
import type { FieldErrors } from '@/lib/validation';

type Phase = 'idle' | 'transmitting' | 'delivered' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const initialValues = {
  name: '',
  email: '',
  company: '',
  role: '',
  opportunity: opportunityTypes[0] as string,
  message: '',
  website: '',
};

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phase, setPhase] = useState<Phase>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const renderedAt = useRef<number>(Date.now());

  const update = (key: keyof typeof initialValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (values.name.trim().length < 2) next.name = 'Enter your name.';
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid work email address.';
    if (values.message.trim().length < 10) next.message = 'Add a few more details — at least 10 characters.';
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0]!;
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    setPhase('transmitting');
    setServerMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, renderedAt: renderedAt.current }),
      });
      const data = (await res.json()) as ContactResponse;

      if (res.ok && data.ok) {
        setPhase('delivered');
        setServerMessage(data.message);
        setValues(initialValues);
        return;
      }

      if (!data.ok && data.fieldErrors) setErrors(data.fieldErrors);
      setPhase('error');
      setServerMessage(data.message || 'The message could not be sent. Try again in a moment.');
    } catch {
      setPhase('error');
      setServerMessage(
        `Network request failed. Email ${person.email} directly and it will reach me just as fast.`,
      );
    }
  };

  if (phase === 'delivered') {
    return (
      <div className="panel">
        <div className="panel-head">
          <span className="mono text-2xs uppercase tracking-[0.12em] text-muted">contact.deliver</span>
          <span className="mono text-2xs uppercase tracking-[0.12em] text-accent">status 200</span>
        </div>
        <div className="flex flex-col items-start gap-5 p-6 sm:p-8" role="status" aria-live="polite">
          <CheckCircle2 size={28} className="text-accent" aria-hidden="true" />
          <div>
            <p className="mono text-2xs uppercase tracking-[0.14em] text-accent">message delivered</p>
            <p className="mt-3 max-w-prose text-[17px] leading-relaxed text-ink">{serverMessage}</p>
            <p className="mt-2 text-[14px] text-muted">{person.responseTime}.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              renderedAt.current = Date.now();
              setPhase('idle');
            }}
            className="btn btn-ghost"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const busy = phase === 'transmitting';

  return (
    <form onSubmit={onSubmit} noValidate className="panel">
      <div className="panel-head">
        <span className="mono text-2xs uppercase tracking-[0.12em] text-muted">
          POST /api/contact
        </span>
        <span
          className={`mono text-2xs uppercase tracking-[0.12em] ${
            phase === 'error' ? 'text-failed' : busy ? 'text-running' : 'text-faint'
          }`}
        >
          {phase === 'error' ? 'failed' : busy ? 'transmitting' : 'ready'}
        </span>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
        <Field
          id="contact-name"
          label="Name"
          required
          value={values.name}
          error={errors.name}
          onChange={(v) => update('name', v)}
          autoComplete="name"
        />
        <Field
          id="contact-email"
          label="Work email"
          required
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(v) => update('email', v)}
          autoComplete="email"
        />
        <Field
          id="contact-company"
          label="Company"
          value={values.company}
          onChange={(v) => update('company', v)}
          autoComplete="organization"
        />
        <Field
          id="contact-role"
          label="Role / position"
          value={values.role}
          onChange={(v) => update('role', v)}
          placeholder="e.g. QA Automation Engineer"
        />

        <div className="sm:col-span-2">
          <label htmlFor="contact-opportunity" className="label mb-2 block">
            Opportunity type
          </label>
          <select
            id="contact-opportunity"
            name="opportunity"
            value={values.opportunity}
            onChange={(e) => update('opportunity', e.target.value)}
            className="field mono appearance-none text-[14px]"
          >
            {opportunityTypes.map((type) => (
              <option key={type} value={type} className="bg-surface">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="label mb-2 flex items-center gap-2">
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className="field resize-y leading-relaxed"
            placeholder="Role details, team, stack, timeline — or just a question."
          />
          {errors.message ? (
            <p id="contact-message-error" className="mono mt-2 text-2xs uppercase tracking-[0.08em] text-failed">
              {errors.message}
            </p>
          ) : null}
        </div>

        {/* Honeypot — visually hidden, never announced, must stay empty. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button type="submit" disabled={busy} className="btn btn-primary w-full sm:w-auto disabled:opacity-70">
              {busy ? (
                <>
                  <span aria-hidden="true" className="h-2 w-2 animate-blink rounded-full bg-base" />
                  Transmitting…
                </>
              ) : (
                <>
                  <Send size={14} aria-hidden="true" />
                  Send message
                </>
              )}
            </button>
            <p className="mono text-2xs leading-relaxed tracking-[0.06em] text-faint">
              Delivered to {person.email} · no newsletter, no tracking
            </p>
          </div>

          {phase === 'error' ? (
            <p
              role="alert"
              className="mt-4 border border-failed/40 bg-failed/5 px-4 py-3 text-[14px] leading-relaxed text-ink"
            >
              {serverMessage}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label mb-2 flex items-center gap-2">
        {label}
        {required ? <span className="text-accent">*</span> : null}
      </label>
      <input
        id={id}
        name={id.replace('contact-', '')}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
      />
      {error ? (
        <p id={`${id}-error`} className="mono mt-2 text-2xs uppercase tracking-[0.08em] text-failed">
          {error}
        </p>
      ) : null}
    </div>
  );
}

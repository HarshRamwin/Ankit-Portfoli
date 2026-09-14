import type { ContactPayload } from '@/lib/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Disposable / role addresses we do not want as a reply-to. */
const FREE_MAIL_OK = true; // recruiters legitimately use gmail; keep the door open.

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export interface ValidationResult {
  ok: boolean;
  errors: FieldErrors;
  data: ContactPayload;
}

function str(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export function validateContact(input: unknown): ValidationResult {
  const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;

  const data: ContactPayload = {
    name: str(raw.name, 120),
    email: str(raw.email, 160),
    company: str(raw.company, 120),
    role: str(raw.role, 120),
    opportunity: str(raw.opportunity, 60),
    message: str(raw.message, 4000),
    website: str(raw.website, 200),
    renderedAt: typeof raw.renderedAt === 'number' ? raw.renderedAt : undefined,
  };

  const errors: FieldErrors = {};

  if (data.name.length < 2) errors.name = 'Enter your name.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Enter a valid work email address.';
  if (!FREE_MAIL_OK && /@(gmail|yahoo|outlook)\./i.test(data.email)) {
    errors.email = 'Use a company email address.';
  }
  if (data.message.length < 10) errors.message = 'Add a few more details — at least 10 characters.';
  if (data.message.length > 4000) errors.message = 'Keep the message under 4000 characters.';

  return { ok: Object.keys(errors).length === 0, errors, data };
}

/**
 * Bot heuristics that never surface as a visible error.
 * Returns true when the submission should be silently dropped.
 */
export function looksAutomated(data: ContactPayload): boolean {
  if (data.website && data.website.length > 0) return true; // honeypot filled
  if (typeof data.renderedAt === 'number') {
    const elapsed = Date.now() - data.renderedAt;
    if (elapsed < 2500) return true; // submitted faster than a human can type
    if (elapsed > 1000 * 60 * 60 * 12) return true; // stale form replayed
  }
  const linkCount = (data.message.match(/https?:\/\//g) ?? []).length;
  if (linkCount > 4) return true;
  return false;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

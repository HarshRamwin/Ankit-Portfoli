import { NextResponse } from 'next/server';
import { deliverContactEmail } from '@/lib/email';
import { clientKey, rateLimit } from '@/lib/rate-limit';
import { looksAutomated, validateContact } from '@/lib/validation';
import type { ContactResponse } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SUCCESS = "Message sent successfully. I'll get back to you soon.";

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

export async function POST(request: Request): Promise<NextResponse<ContactResponse>> {
  // 1 — Rate limit before doing any work.
  const limit = rateLimit(clientKey(request.headers));
  if (!limit.allowed) {
    return json(
      {
        ok: false,
        message: 'Too many messages from this network. Try again later, or email me directly.',
      },
      429,
      { 'Retry-After': String(limit.retryAfterSeconds) },
    );
  }

  // 2 — Parse defensively.
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: 'The request body could not be read.' }, 400);
  }

  // 3 — Validate.
  const { ok, errors, data } = validateContact(payload);
  if (!ok) {
    return json(
      { ok: false, message: 'Check the highlighted fields and send again.', fieldErrors: errors },
      422,
    );
  }

  // 4 — Silently absorb obvious bots: they get a 200 and nothing is sent.
  if (looksAutomated(data)) {
    return json({ ok: true, message: SUCCESS }, 200);
  }

  // 5 — Deliver.
  const result = await deliverContactEmail(data);
  if (!result.ok) {
    const message =
      result.reason === 'not-configured'
        ? 'Email delivery is not configured on this deployment yet. Please email me directly in the meantime.'
        : 'The message could not be delivered right now. Please try again, or email me directly.';
    return json({ ok: false, message }, 502);
  }

  return json({ ok: true, message: SUCCESS }, 200);
}

export async function GET(): Promise<NextResponse<ContactResponse>> {
  return json({ ok: false, message: 'Use POST to send a message.' }, 405);
}

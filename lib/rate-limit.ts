/**
 * Minimal in-memory sliding-window limiter.
 *
 * Good enough for a single-region personal site on Vercel. If the site ever runs
 * across many instances, swap the Map for Upstash Redis — the call signature
 * below is intentionally the same shape.
 */

interface Window {
  hits: number[];
}

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_HITS = 5;
const MAX_KEYS = 5000;

const store = new Map<string, Window>();

function sweep(now: number) {
  if (store.size < MAX_KEYS) return;
  for (const [key, win] of store) {
    if (win.hits.every((t) => now - t > WINDOW_MS)) store.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(key: string, now = Date.now()): RateLimitResult {
  sweep(now);
  const win = store.get(key) ?? { hits: [] };
  win.hits = win.hits.filter((t) => now - t < WINDOW_MS);

  if (win.hits.length >= MAX_HITS) {
    store.set(key, win);
    const oldest = win.hits[0] ?? now;
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000)),
    };
  }

  win.hits.push(now);
  store.set(key, win);
  return { allowed: true, remaining: MAX_HITS - win.hits.length, retryAfterSeconds: 0 };
}

/** Best-effort client identity behind Vercel's proxy. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

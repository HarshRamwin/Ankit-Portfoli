'use client';

import { useState, type CSSProperties } from 'react';
import { infraFlow } from '@/data/site';

/**
 * Horizontal on wide screens, vertical on narrow ones — same DOM, no duplication.
 * Connectors are 1px rules with a travelling highlight; no particles, no canvas.
 */
export function InfraFlow() {
  const [openId, setOpenId] = useState<string>(infraFlow[0]!.id);
  const open = infraFlow.find((n) => n.id === openId) ?? infraFlow[0]!;

  return (
    <div>
      <ol className="flex flex-col gap-0 lg:flex-row lg:items-stretch">
        {infraFlow.map((node, i) => {
          const selected = node.id === openId;
          return (
            <li key={node.id} className="flex flex-1 flex-row items-stretch lg:flex-col">
              <button
                type="button"
                onClick={() => setOpenId(node.id)}
                aria-pressed={selected}
                className={`group flex w-full flex-1 flex-col justify-center border px-4 py-4 text-left transition-colors duration-200 lg:min-h-[104px] ${
                  selected
                    ? 'border-accent bg-surface'
                    : 'border-line bg-elevated hover:border-line-strong'
                }`}
              >
                <span className="mono mb-1.5 flex items-center gap-2 text-2xs uppercase tracking-[0.12em] text-faint">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${selected ? 'bg-accent' : 'bg-line-strong'}`}
                  />
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-[15px] leading-tight ${selected ? 'text-ink' : 'text-muted group-hover:text-ink'}`}
                >
                  {node.label}
                </span>
                <span className="mono mt-1 text-2xs tracking-[0.08em] text-faint">{node.sub}</span>
              </button>

              {i < infraFlow.length - 1 ? (
                <>
                  {/* vertical connector (mobile / tablet) */}
                  <span
                    aria-hidden="true"
                    className="connector connector-y mx-auto my-0 h-6 w-px shrink-0 lg:hidden"
                    style={{ '--packet-delay': `${i * 0.28}s` } as CSSProperties}
                  />
                  {/* horizontal connector (desktop) */}
                  <span
                    aria-hidden="true"
                    className="connector hidden h-px w-full shrink-0 self-center lg:block lg:w-6"
                    style={{ '--packet-delay': `${i * 0.28}s` } as CSSProperties}
                  />
                </>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div
        className="mt-5 border border-line bg-surface px-5 py-4"
        aria-live="polite"
      >
        <p className="mono mb-1.5 text-2xs uppercase tracking-[0.12em] text-accent">{open.label}</p>
        <p className="max-w-prose text-[15px] leading-relaxed text-muted">{open.detail}</p>
      </div>
    </div>
  );
}

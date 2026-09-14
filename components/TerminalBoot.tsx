'use client';

import { useEffect, useState } from 'react';
import { bootLines } from '@/data/site';
import { usePrefersReducedMotion } from '@/lib/use-pipeline';

const STEP_MS = 320;

export function TerminalBoot() {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduced) {
      setShown(bootLines.length);
      return;
    }
    setShown(0);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setShown(index);
      if (index >= bootLines.length) window.clearInterval(timer);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const done = shown >= bootLines.length;

  return (
    <div className="panel" aria-hidden="true">
      <div className="panel-head">
        <span className="mono text-2xs uppercase tracking-[0.12em] text-muted">init.sh</span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 bg-line-strong" />
          <span className="h-2 w-2 bg-line-strong" />
          <span className={`h-2 w-2 ${done ? 'bg-accent' : 'bg-running'}`} />
        </span>
      </div>

      <div className="mono space-y-1.5 p-4 text-[12px] leading-relaxed sm:p-5 sm:text-[13px]">
        <p className="text-faint">
          <span className="text-accent">$</span> ./init.sh --profile ankit
        </p>
        {bootLines.map((line, i) => {
          const visible = i < shown;
          return (
            <p
              key={line.label}
              className={`flex items-baseline gap-2 transition-opacity duration-200 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-muted">{line.label}</span>
              <span aria-hidden="true" className="min-w-0 flex-1 overflow-hidden text-line-strong">
                {'.'.repeat(40)}
              </span>
              <span className={line.ok ? 'text-accent' : 'text-ink'}>{line.value}</span>
            </p>
          );
        })}
        <p className={`pt-1 text-faint transition-opacity duration-300 ${done ? 'opacity-100' : 'opacity-0'}`}>
          exit 0 — profile loaded in 1.2s
          <span className="ml-1 inline-block h-[13px] w-[7px] translate-y-[2px] animate-blink bg-accent" />
        </p>
      </div>
    </div>
  );
}

/** Text-only equivalent, always present in the DOM for assistive tech and crawlers. */
export function BootSummary() {
  return (
    <p className="sr-only">
      Profile initialised. QA engineering, automation, DevOps and cloud are ready. Current status: open
      to opportunities.
    </p>
  );
}

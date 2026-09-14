'use client';

import { useEffect, useState } from 'react';
import { ciSteps } from '@/data/site';
import { useInView, usePrefersReducedMotion } from '@/lib/use-pipeline';

const TICK_MS = 420;

export function PipelineRun() {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCursor(ciSteps.length);
      return;
    }
    let i = 0;
    setCursor(0);
    const timer = window.setInterval(() => {
      i += 1;
      setCursor(i);
      if (i > ciSteps.length) window.clearInterval(timer);
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [inView, reduced]);

  const done = cursor >= ciSteps.length;

  return (
    <div ref={ref} className="panel">
      <div className="panel-head">
        <span className="mono truncate text-2xs uppercase tracking-[0.12em] text-muted">
          .github/workflows/ci.yml
        </span>
        <span
          className={`mono text-2xs uppercase tracking-[0.12em] ${done ? 'text-accent' : 'text-running'}`}
        >
          {done ? 'workflow passed' : 'in progress'}
        </span>
      </div>

      <ol className="divide-y divide-line">
        {ciSteps.map((step, i) => {
          const state = cursor < 0 ? 'queued' : i < cursor ? 'passed' : i === cursor ? 'running' : 'queued';
          return (
            <li key={step.name} className="relative flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
              <span
                aria-hidden="true"
                className={`mono w-5 shrink-0 text-center text-[11px] ${
                  state === 'passed'
                    ? 'text-accent'
                    : state === 'running'
                      ? 'text-running'
                      : 'text-line-strong'
                }`}
              >
                {state === 'passed' ? '✓' : state === 'running' ? '●' : '○'}
              </span>

              <span
                className={`w-[90px] shrink-0 text-[14px] sm:w-[110px] ${
                  state === 'queued' ? 'text-faint' : 'text-ink'
                }`}
              >
                {step.name}
              </span>

              <code
                className={`mono hidden flex-1 truncate text-[12px] sm:block ${
                  state === 'queued' ? 'text-line-strong' : 'text-muted'
                }`}
              >
                {step.command}
              </code>

              <span
                className={`mono ml-auto shrink-0 text-2xs tabular tracking-[0.08em] sm:ml-0 ${
                  state === 'passed' ? 'text-muted' : 'text-line-strong'
                }`}
              >
                {state === 'passed' ? step.duration : state === 'running' ? '···' : '—'}
              </span>

              {state === 'running' ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-transparent"
                >
                  <span className="connector absolute inset-0 bg-transparent" />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-elevated px-4 py-3 sm:px-5">
        <span className="mono text-2xs uppercase tracking-[0.1em] text-faint">
          triggered by: push · pull_request
        </span>
        <span className={`mono text-2xs uppercase tracking-[0.1em] ${done ? 'text-accent' : 'text-faint'}`}>
          {done ? 'artifacts uploaded · merge unblocked' : 'waiting for stages'}
        </span>
      </div>
    </div>
  );
}

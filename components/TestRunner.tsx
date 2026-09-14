'use client';

import { useEffect, useState } from 'react';
import { testCases, testpulse } from '@/data/site';
import { useInView, usePrefersReducedMotion } from '@/lib/use-pipeline';

type RowState = 'queued' | 'running' | 'passed';

const TICK_MS = 260;

export function TestRunner() {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCursor(testCases.length);
      return;
    }
    let i = 0;
    setCursor(0);
    const timer = window.setInterval(() => {
      i += 1;
      setCursor(i);
      if (i > testCases.length) window.clearInterval(timer);
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [inView, reduced]);

  const stateOf = (index: number): RowState => {
    if (cursor < 0) return 'queued';
    if (index < cursor) return 'passed';
    if (index === cursor) return 'running';
    return 'queued';
  };

  const complete = cursor >= testCases.length;

  return (
    <div ref={ref} className="panel">
      <div className="panel-head">
        <span className="mono truncate text-2xs uppercase tracking-[0.12em] text-muted">
          test session · pytest
        </span>
        <span
          className={`mono text-2xs uppercase tracking-[0.12em] ${complete ? 'text-accent' : 'text-running'}`}
        >
          {complete ? 'passed' : 'running'}
        </span>
      </div>

      <div className="mono overflow-x-auto p-4 text-[12px] leading-[1.9] sm:p-5 sm:text-[13px]">
        <p className="mb-3 whitespace-nowrap text-faint">
          <span className="text-accent">$</span> {testpulse.run.command}
        </p>

        <ul className="min-w-[440px] space-y-0.5" aria-label="Automated test results">
          {testCases.map((test, i) => {
            const state = stateOf(i);
            return (
              <li key={test.id} className="flex items-center gap-3 whitespace-nowrap">
                <span
                  className={`w-[26px] shrink-0 text-center text-[10px] uppercase ${
                    state === 'passed'
                      ? 'text-accent'
                      : state === 'running'
                        ? 'text-running'
                        : 'text-line-strong'
                  }`}
                  aria-hidden="true"
                >
                  {state === 'passed' ? '✓' : state === 'running' ? '●' : '○'}
                </span>
                <span className={state === 'queued' ? 'text-faint' : 'text-muted'}>{test.path}</span>
                <span className="text-line-strong">::</span>
                <span className={state === 'queued' ? 'text-faint' : 'text-ink'}>{test.name}</span>
                <span
                  className={`ml-auto pl-6 text-2xs uppercase tracking-[0.1em] ${
                    state === 'passed'
                      ? 'text-accent'
                      : state === 'running'
                        ? 'text-running'
                        : 'text-line-strong'
                  }`}
                >
                  {state === 'passed' ? `passed ${(test.ms / 1000).toFixed(2)}s` : state}
                </span>
              </li>
            );
          })}
        </ul>

        <p
          className={`mt-1 pl-[38px] text-faint transition-opacity duration-300 ${
            complete ? 'opacity-100' : 'opacity-0'
          }`}
        >
          … 10 more tests collected from tests/ui and tests/api
        </p>

        <div
          className={`mt-4 border-t border-line pt-3 transition-opacity duration-300 ${
            complete ? 'opacity-100' : 'opacity-30'
          }`}
        >
          <p className="whitespace-nowrap">
            <span className="text-accent">{testpulse.run.passed} passed</span>
            <span className="text-faint"> · {testpulse.run.failed} failed · </span>
            <span className="text-muted">{testpulse.run.seconds}</span>
          </p>
          <p className="mt-1 text-faint">
            report written to report.html · 0 screenshots captured
          </p>
        </div>
      </div>
    </div>
  );
}

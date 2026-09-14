'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { site, stages } from '@/data/site';
import { usePipeline } from '@/lib/use-pipeline';
import { StatusGlyph } from '@/components/primitives';
import type { StageId } from '@/lib/types';

/* ── Thin run-progress bar pinned to the top of the viewport ─────────── */

export function RunProgress() {
  const { progress } = usePipeline();
  return (
    <div
      className="no-print fixed inset-x-0 top-0 z-50 h-[2px] bg-line/60"
      role="progressbar"
      aria-label="Pipeline run progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="h-full bg-accent transition-[width] duration-200 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

/* ── Desktop: vertical pipeline indicator ────────────────────────────── */

export function PipelineRail() {
  const { activeIndex, statusOf, goTo } = usePipeline();

  return (
    <nav
      aria-label="Pipeline stages"
      className="no-print fixed left-0 top-0 z-40 hidden h-screen w-[220px] flex-col justify-center border-r border-line bg-base/90 px-6 backdrop-blur-sm lg:flex xl:w-[220px]"
    >
      <p className="mb-6 text-xs font-medium tracking-wide text-muted">{site.pipelineId}</p>

      <ol className="relative flex flex-col gap-3">
        {/* vertical rail */}
        <span aria-hidden="true" className="absolute left-8 top-6 h-[calc(100%-96px)] w-px bg-line" />
        <span
          aria-hidden="true"
          className="absolute left-8 top-6 w-px bg-accent transition-[height] duration-500 ease-pipeline"
          style={{ height: `calc(${(activeIndex / (stages.length - 1)) * 100}% - 0px)` }}
        />
        {stages.map((stage) => {
          const status = statusOf(stage.id);
          return (
            <li key={stage.id} className="relative">
              <button
                type="button"
                onClick={() => goTo(stage.id)}
                aria-current={status === 'running' ? 'true' : undefined}
                className="group flex w-full items-center gap-3 rounded-md p-2 hover:bg-elevated/60"
              >
                <span className="relative flex items-center justify-center h-4 w-4">
                  <StatusGlyph status={status} size={12} />
                </span>
                <div className="flex flex-col items-start">
                  <span className={`text-[12px] font-semibold transition-colors ${status === 'running' ? 'text-ink' : 'text-muted group-hover:text-accent'}`}>
                    {stage.label}
                  </span>
                  <span className="text-[11px] text-faint">{stage.job}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>

      <Link
        href="/recruiter"
        className="btn btn-ghost mt-6 w-full justify-center"
      >
        Recruiter view
      </Link>
    </nav>
  );
}

/* ── Mobile: compact stage bar + sheet ───────────────────────────────── */

export function MobileNav() {
  const { activeIndex, statusOf, goTo, progress } = usePipeline();
  const [open, setOpen] = useState(false);
  const current = stages[activeIndex]!;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const jump = (id: StageId) => {
    setOpen(false);
    // let the sheet close before scrolling so focus lands correctly
    window.setTimeout(() => goTo(id), 60);
  };

  return (
    <div className="no-print lg:hidden">
      <div className="fixed inset-x-0 top-0 z-40 border-b border-line bg-base/92 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between gap-3 px-5">
          <button
            type="button"
            onClick={() => goTo('init')}
            className="mono text-2xs uppercase tracking-[0.14em] text-faint"
          >
            {site.pipelineId}
          </button>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <StatusGlyph status="running" size={8} />
              <span className="mono text-2xs uppercase tracking-[0.12em] text-ink">
                {current.job} {current.label}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="stage-sheet"
              className="flex h-9 w-9 items-center justify-center border border-line-strong text-muted"
            >
              <span className="sr-only">Open pipeline stages</span>
              <Menu size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-line">
          <div className="h-px bg-accent" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {open ? (
        <div
          id="stage-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Pipeline stages"
          className="fixed inset-0 z-50 flex flex-col bg-base/97 backdrop-blur-md"
        >
          <div className="flex h-14 items-center justify-between border-b border-line px-5">
            <span className="mono text-2xs uppercase tracking-[0.14em] text-faint">Stages</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              autoFocus
              className="flex h-9 w-9 items-center justify-center border border-line-strong text-muted"
            >
              <span className="sr-only">Close</span>
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <ol className="flex-1 overflow-y-auto px-5 py-4">
            {stages.map((stage) => {
              const status = statusOf(stage.id);
              return (
                <li key={stage.id} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => jump(stage.id)}
                    className="flex w-full items-center gap-3 py-4 text-left"
                  >
                    <StatusGlyph status={status} />
                    <span className="mono text-2xs tracking-[0.14em] text-faint">{stage.job}</span>
                    <span
                      className={`text-[15px] ${status === 'running' ? 'text-ink' : 'text-muted'}`}
                    >
                      {stage.label}
                    </span>
                    <span className="mono ml-auto text-2xs uppercase tracking-[0.1em] text-faint">
                      {status}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="border-t border-line p-5">
            <Link
              href="/recruiter"
              className="btn btn-ghost w-full"
              onClick={() => setOpen(false)}
            >
              Recruiter view
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

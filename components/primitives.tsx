'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Stage, StageStatus } from '@/lib/types';
import { usePipeline } from '@/lib/use-pipeline';

/* ── Status vocabulary used everywhere in the site ───────────────────── */

const STATUS_COPY: Record<StageStatus, string> = {
  queued: 'queued',
  running: 'running',
  passed: 'passed',
};

export function StatusGlyph({ status, size = 10 }: { status: StageStatus; size?: number }) {
  const common = 'block shrink-0 rounded-full';
  if (status === 'passed') {
    return (
      <span
        className={`${common} bg-accent`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    );
  }
  if (status === 'running') {
    return (
      <span className="relative flex shrink-0" style={{ width: size, height: size }} aria-hidden="true">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-running" />
        <span className={`${common} bg-running`} style={{ width: size, height: size }} />
      </span>
    );
  }
  return (
    <span
      className={`${common} border border-line-strong bg-transparent`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

export function StatusLabel({ status }: { status: StageStatus }) {
  const tone =
    status === 'passed' ? 'text-accent' : status === 'running' ? 'text-running' : 'text-faint';
  return (
    <span className={`mono text-2xs uppercase tracking-[0.14em] ${tone}`}>{STATUS_COPY[status]}</span>
  );
}

/* ── Section header: job number, title, live stage status ────────────── */

export function SectionHeader({ stage, aside }: { stage: Stage; aside?: ReactNode }) {
  const { statusOf } = usePipeline();
  const status = statusOf(stage.id);

  return (
    <header className="mb-10 sm:mb-14">
      <div className="flex items-center gap-4">
        <span className="mono text-2xs tracking-[0.18em] text-accent">JOB {stage.job}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="flex items-center gap-2">
          <StatusGlyph status={status} />
          <StatusLabel status={status} />
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            id={`${stage.id}-heading`}
            className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] text-ink"
          >
            {stage.title}
          </h2>
          <p className="mt-2.5 max-w-prose text-[15px] leading-relaxed text-muted">{stage.summary}</p>
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </header>
  );
}

/* ── One restrained entrance, reused rather than re-invented per block ─ */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Panel with a filename-style header bar ──────────────────────────── */

export function Panel({
  title,
  meta,
  children,
  className = '',
  bodyClassName = 'p-5 sm:p-6',
}: {
  title: string;
  meta?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`panel ${className}`}>
      <div className="panel-head">
        <span className="mono truncate text-2xs uppercase tracking-[0.12em] text-muted">{title}</span>
        {meta ? <span className="mono shrink-0 text-2xs tracking-[0.1em] text-faint">{meta}</span> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/* ── Section wrapper: consistent rhythm, focusable landmark ──────────── */

export function Section({
  id,
  children,
  className = '',
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-heading`}
      className={`relative z-10 border-t border-line py-20 outline-none sm:py-28 ${className}`}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

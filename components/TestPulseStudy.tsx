'use client';

import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import { testpulse } from '@/data/site';

export function TestPulseStudy() {
  const reduced = useReducedMotion();
  const [activeNode, setActiveNode] = useState(testpulse.nodes[0]!.id);
  const [architecture, setArchitecture] = useState(false);
  const node = testpulse.nodes.find((n) => n.id === activeNode) ?? testpulse.nodes[0]!;

  return (
    <div className="space-y-8">
      {/* Metrics ribbon */}
      <div className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
        {testpulse.metrics.map((metric) => (
          <div key={metric.label} className="bg-surface px-4 py-5 sm:px-6 sm:py-6">
            <div className="mono text-[28px] leading-none text-accent sm:text-[34px]">{metric.value}</div>
            <div className="mt-2 text-[14px] text-ink">{metric.label}</div>
            <div className="mono mt-1 text-2xs tracking-[0.06em] text-faint">{metric.note}</div>
          </div>
        ))}
      </div>

      {/* Pipeline graph */}
      <div className="panel">
        <div className="panel-head">
          <span className="mono truncate text-2xs uppercase tracking-[0.12em] text-muted">
            testpulse · execution graph
          </span>
          <span className="mono shrink-0 text-2xs uppercase tracking-[0.12em] text-accent">
            {testpulse.run.passed} passed
          </span>
        </div>

        <div className="p-4 sm:p-6">
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8 xl:gap-2">
            {testpulse.nodes.map((n, i) => {
              const selected = n.id === activeNode;
              const isResult = n.kind === 'result';
              return (
                <li key={n.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveNode(n.id)}
                    aria-pressed={selected}
                    className={`group flex h-full w-full flex-col justify-between gap-3 border px-3 py-3.5 text-left transition-colors duration-200 ${
                      selected
                        ? 'border-accent bg-accent-ghost'
                        : 'border-line bg-elevated hover:border-line-strong'
                    }`}
                  >
                    <span className="mono flex items-center justify-between text-2xs tracking-[0.1em] text-faint">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          isResult ? 'bg-accent' : selected ? 'bg-accent' : 'bg-line-strong'
                        }`}
                      />
                    </span>
                    <span
                      className={`text-[14px] leading-tight ${
                        selected ? 'text-ink' : isResult ? 'text-accent' : 'text-muted group-hover:text-ink'
                      }`}
                    >
                      {n.label}
                    </span>
                    <span className="mono text-2xs leading-tight tracking-[0.04em] text-faint">{n.meta}</span>
                  </button>

                  {i < testpulse.nodes.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="connector absolute right-[-13px] top-1/2 hidden h-px w-[10px] xl:block"
                      style={{ '--packet-delay': `${i * 0.24}s` } as CSSProperties}
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>

          <div className="mt-5 border border-line bg-elevated px-5 py-4" aria-live="polite">
            <p className="mono mb-1.5 text-2xs uppercase tracking-[0.12em] text-accent">
              {node.label} — {node.meta}
            </p>
            <p className="max-w-prose text-[15px] leading-relaxed text-muted">{node.detail}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href={testpulse.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-primary w-full sm:w-auto"
        >
          View on GitHub
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={() => setArchitecture((v) => !v)}
          aria-expanded={architecture}
          aria-controls="testpulse-architecture"
          className="btn btn-ghost w-full sm:w-auto"
        >
          <Layers size={14} aria-hidden="true" />
          {architecture ? 'Collapse architecture' : 'Explore architecture'}
        </button>
        <span className="mono text-2xs uppercase tracking-[0.1em] text-faint sm:ml-2">
          last run · {testpulse.run.seconds} · 0 failed
        </span>
      </div>

      {/* Architecture drill-down */}
      <AnimatePresence initial={false}>
        {architecture ? (
          <motion.div
            id="testpulse-architecture"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <div className="panel">
                <div className="panel-head">
                  <span className="mono text-2xs uppercase tracking-[0.12em] text-muted">repository</span>
                  <span className="mono text-2xs tracking-[0.1em] text-faint">tree</span>
                </div>
                <pre className="mono overflow-x-auto p-5 text-[12px] leading-[1.9] text-muted sm:text-[13px]">
                  {testpulse.tree.join('\n')}
                </pre>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <span className="mono text-2xs uppercase tracking-[0.12em] text-muted">
                    engineering decisions
                  </span>
                  <span className="mono text-2xs tracking-[0.1em] text-faint">
                    {testpulse.highlights.length} entries
                  </span>
                </div>
                <dl className="divide-y divide-line">
                  {testpulse.highlights.map((h) => (
                    <div key={h.k} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:gap-5">
                      <dt className="mono w-[184px] shrink-0 text-[12px] text-ink">{h.k}</dt>
                      <dd className="text-[14px] leading-relaxed text-muted">{h.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {testpulse.stack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

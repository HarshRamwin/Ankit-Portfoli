'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { releases } from '@/data/site';

const STATUS_COPY: Record<string, { text: string; tone: string }> = {
  current: { text: 'deployed · live', tone: 'text-accent' },
  shipped: { text: 'shipped', tone: 'text-muted' },
  foundation: { text: 'base image', tone: 'text-faint' },
};

export function ReleaseTimeline() {
  const reduced = useReducedMotion();
  const [openIds, setOpenIds] = useState<string[]>([releases[0]!.id]);

  const toggle = (id: string) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <ol className="relative">
      <span aria-hidden="true" className="absolute left-[5px] top-3 h-[calc(100%-24px)] w-px bg-line sm:left-[7px]" />

      {releases.map((entry) => {
        const open = openIds.includes(entry.id);
        const status = STATUS_COPY[entry.status]!;
        return (
          <li key={entry.id} className="relative pb-4 pl-7 last:pb-0 sm:pl-10">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-3 h-[11px] w-[11px] rounded-full border sm:left-[2px] ${
                entry.status === 'current' ? 'border-accent bg-accent' : 'border-line-strong bg-base'
              }`}
            />

            <div className="border border-line bg-surface">
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(entry.id)}
                  aria-expanded={open}
                  aria-controls={`release-${entry.id}`}
                  className="flex w-full flex-col gap-3 px-4 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="mono text-2xs tracking-[0.12em] text-accent">{entry.version}</span>
                    <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
                    <span className="mono text-2xs uppercase tracking-[0.1em] text-faint">{entry.period}</span>
                    <span className={`mono ml-auto text-2xs uppercase tracking-[0.1em] ${status.tone}`}>
                      {status.text}
                    </span>
                  </span>

                  <span className="flex items-start justify-between gap-4">
                    <span>
                      <span className="block text-[19px] font-medium leading-snug text-ink sm:text-[21px]">
                        {entry.org}
                      </span>
                      <span className="mt-1 block text-[14px] text-muted sm:text-[15px]">{entry.role}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`mt-1 shrink-0 text-faint transition-transform duration-300 ${
                        open ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    id={`release-${entry.id}`}
                    key="content"
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line px-4 py-5 sm:px-6 sm:py-6">
                      <p className="max-w-prose text-[15px] leading-relaxed text-muted">{entry.headline}</p>

                      <dl className="mt-6 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                        {entry.impact.map((item) => (
                          <div
                            key={item.tag}
                            className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:gap-4"
                          >
                            <dt className="mono w-[124px] shrink-0 text-2xs uppercase tracking-[0.1em] text-accent">
                              {item.tag}
                            </dt>
                            <dd className="text-[14px] leading-relaxed text-muted">{item.detail}</dd>
                          </div>
                        ))}
                      </dl>

                      <ul className="mt-5 flex flex-wrap gap-2">
                        {entry.stack.map((tech) => (
                          <li key={tech} className="chip">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

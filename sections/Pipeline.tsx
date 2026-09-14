'use client';

import { ciPlatforms, stages } from '@/data/site';
import { Reveal, Section, SectionHeader } from '@/components/primitives';
import { PipelineRun } from '@/components/PipelineRun';

const stage = stages[3]!;

export function Pipeline() {
  return (
    <Section id={stage.id}>
      <SectionHeader stage={stage} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-8">
        <Reveal>
          <PipelineRun />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {ciPlatforms.map((platform, i) => (
            <Reveal key={platform.name} delay={0.06 * (i + 1)}>
              <div className="h-full border border-line bg-surface p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[18px] font-medium text-ink">{platform.name}</h3>
                  <span className="mono text-2xs uppercase tracking-[0.1em] text-accent">active</span>
                </div>
                <p className="mono mt-1 text-2xs uppercase tracking-[0.08em] text-faint">{platform.role}</p>
                <ul className="mt-4 space-y-2.5">
                  {platform.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                      <span aria-hidden="true" className="mono mt-[2px] shrink-0 text-accent">
                        ›
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

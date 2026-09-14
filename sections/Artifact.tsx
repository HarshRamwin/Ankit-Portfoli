'use client';

import { stages, testpulse } from '@/data/site';
import { Reveal, Section, SectionHeader } from '@/components/primitives';
import { TestPulseStudy } from '@/components/TestPulseStudy';

const stage = stages[6]!;

export function Artifact() {
  return (
    <Section id={stage.id}>
      <SectionHeader
        stage={stage}
        aside={
          <p className="mono text-2xs uppercase tracking-[0.1em] text-faint">
            build artifact · verified in CI
          </p>
        }
      />

      <Reveal>
        <div className="mb-8 max-w-prose">
          <p className="mono text-[13px] uppercase tracking-[0.08em] text-accent">{testpulse.tagline}</p>
          <p className="mt-4 text-[16px] leading-[1.75] text-muted sm:text-[17px]">{testpulse.summary}</p>
        </div>
      </Reveal>

      <TestPulseStudy />
    </Section>
  );
}

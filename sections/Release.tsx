'use client';

import { releases, stages } from '@/data/site';
import { Reveal, Section, SectionHeader } from '@/components/primitives';
import { ReleaseTimeline } from '@/components/ReleaseTimeline';

const stage = stages[5]!;

export function Release() {
  return (
    <Section id={stage.id}>
      <SectionHeader
        stage={stage}
        aside={
          <p className="mono text-2xs uppercase tracking-[0.1em] text-faint">
            {releases.length} releases · expand any entry
          </p>
        }
      />
      <Reveal>
        <ReleaseTimeline />
      </Reveal>
    </Section>
  );
}

'use client';

import { person, profileSpecs, stages } from '@/data/site';
import { Panel, Reveal, Section, SectionHeader } from '@/components/primitives';
import { StackTopology } from '@/components/StackTopology';

const stage = stages[1]!;

export function Build() {
  return (
    <Section id={stage.id}>
      <SectionHeader stage={stage} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
        <Reveal>
          <Panel title="engineer.profile" meta="spec" bodyClassName="p-0">
            <dl className="divide-y divide-line">
              {profileSpecs.map((spec) => (
                <div key={spec.key} className="flex flex-col gap-1.5 px-5 py-3.5 sm:flex-row sm:gap-6 sm:py-4">
                  <dt className="mono w-[150px] shrink-0 text-2xs uppercase tracking-[0.1em] text-faint">
                    {spec.key}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-ink">
                    {Array.isArray(spec.value) ? (
                      <ul className="space-y-1">
                        {spec.value.map((item) => (
                          <li key={item} className="flex items-baseline gap-2">
                            <span aria-hidden="true" className="mono text-accent">
                              ·
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      spec.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col justify-center gap-5 border border-line bg-surface p-6 sm:p-8">
            {person.bio.map((paragraph, i) => (
              <p key={i} className="max-w-prose text-[16px] leading-[1.75] text-muted sm:text-[17px]">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-14">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h3 className="text-[19px] font-medium text-ink sm:text-[21px]">Technology topology</h3>
          <span className="mono hidden text-2xs uppercase tracking-[0.1em] text-faint sm:block">
            select a node to inspect
          </span>
        </div>
        <StackTopology />
      </div>
    </Section>
  );
}

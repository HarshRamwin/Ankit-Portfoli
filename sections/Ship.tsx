'use client';

import { clouds, clusterFacts, containerFacts, stages } from '@/data/site';
import { Panel, Reveal, Section, SectionHeader } from '@/components/primitives';
import { InfraFlow } from '@/components/InfraFlow';
import { AchievementPanel } from '@/components/AchievementPanel';

const stage = stages[4]!;

function FactList({ facts }: { facts: { k: string; v: string }[] }) {
  return (
    <dl className="divide-y divide-line">
      {facts.map((fact) => (
        <div key={fact.k} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
          <dt className="mono text-2xs uppercase tracking-[0.1em] text-faint">{fact.k}</dt>
          <dd className="mono text-[12px] text-muted">{fact.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Ship() {
  return (
    <Section id={stage.id}>
      <SectionHeader stage={stage} />

      <Reveal>
        <InfraFlow />
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Panel title="Dockerfile" meta="image">
            <FactList facts={containerFacts} />
            <p className="mt-4 border-t border-line pt-4 text-[14px] leading-relaxed text-muted">
              Containerising the test runner removed the whole class of failures that begin with
              &ldquo;it passed locally&rdquo;. The image is the contract.
            </p>
          </Panel>
        </Reveal>

        <Reveal delay={0.06}>
          <Panel title="k8s/deployment.yaml" meta="workload">
            <FactList facts={clusterFacts} />
            <p className="mt-4 border-t border-line pt-4 text-[14px] leading-relaxed text-muted">
              Rollouts are verified, not assumed — a smoke suite runs against the new pods before the
              change is considered delivered.
            </p>
          </Panel>
        </Reveal>
      </div>

      <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
        {clouds.map((cloud) => (
          <div key={cloud.name} className="bg-surface p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              <h3 className="text-[17px] font-medium text-ink">{cloud.name}</h3>
            </div>
            <p className="mt-3 max-w-prose text-[14px] leading-relaxed text-muted">{cloud.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h3 className="text-[19px] font-medium text-ink sm:text-[21px]">Recognition</h3>
          <span className="mono hidden text-2xs uppercase tracking-[0.1em] text-faint sm:block">
            hands-on, lab verified
          </span>
        </div>
        <Reveal>
          <AchievementPanel />
        </Reveal>
      </div>
    </Section>
  );
}

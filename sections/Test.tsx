'use client';

import { qualityDisciplines, stages, stlc } from '@/data/site';
import { Reveal, Section, SectionHeader } from '@/components/primitives';
import { TestRunner } from '@/components/TestRunner';

const stage = stages[2]!;

export function Test() {
  return (
    <Section id={stage.id}>
      <SectionHeader
        stage={stage}
        aside={
          <p className="mono max-w-[30ch] text-2xs uppercase leading-relaxed tracking-[0.1em] text-faint">
            a release is only as trustworthy
            <br />
            as the checks it had to pass
          </p>
        }
      />

      <Reveal>
        <TestRunner />
      </Reveal>

      <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {qualityDisciplines.map((discipline) => (
          <div key={discipline.label} className="group bg-surface p-5 transition-colors hover:bg-raised sm:p-6">
            <div className="mono mb-3 flex items-center gap-2 text-2xs uppercase tracking-[0.12em] text-accent">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              {discipline.label}
            </div>
            <p className="text-[14px] leading-relaxed text-muted">{discipline.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-line bg-elevated px-5 py-4">
        <p className="label mb-3">software testing life cycle</p>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
          {stlc.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="mono text-[12px] text-muted">{step}</span>
              {i < stlc.length - 1 ? (
                <span aria-hidden="true" className="mono text-line-strong">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

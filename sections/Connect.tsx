'use client';

import { person, stages } from '@/data/site';
import { Reveal, Section } from '@/components/primitives';
import { ContactForm } from '@/components/ContactForm';
import { SocialLinks } from '@/components/SocialLinks';
import { ResumeActions } from '@/components/ResumeActions';
import { usePipeline } from '@/lib/use-pipeline';

const stage = stages[7]!;

export function Connect() {
  const { statusOf } = usePipeline();
  const complete = statusOf('connect') !== 'queued';

  return (
    <Section id={stage.id}>
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-4">
          <span className="mono text-2xs tracking-[0.18em] text-accent">JOB {stage.job}</span>
          <span className="h-px flex-1 bg-line" />
          <span
            className={`mono text-2xs uppercase tracking-[0.14em] ${complete ? 'text-accent' : 'text-faint'}`}
          >
            {complete ? 'pipeline complete' : 'awaiting input'}
          </span>
        </div>

        <h2
          id="connect-heading"
          className="mt-6 max-w-[18ch] text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] text-ink"
        >
          Let&rsquo;s build reliable software.
        </h2>
        <p className="mt-4 max-w-prose text-[16px] leading-relaxed text-muted sm:text-[17px]">
          Have a role, a flaky suite, or a delivery pipeline that needs attention? Send the details and
          they land straight in my inbox.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
        <div className="flex flex-col gap-7">
          <div className="border border-line bg-surface p-5 sm:p-6">
            <p className="label mb-3">availability</p>
            <p className="mono flex items-center gap-2.5 text-[15px] text-accent">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
              {person.availability}
            </p>
            <dl className="mt-5 space-y-2.5">
              <div className="flex justify-between gap-4">
                <dt className="mono text-2xs uppercase tracking-[0.1em] text-faint">based in</dt>
                <dd className="mono text-[12px] text-muted">{person.timezone}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="mono text-2xs uppercase tracking-[0.1em] text-faint">response</dt>
                <dd className="mono text-[12px] text-muted">{person.responseTime}</dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="label mb-3">direct channels</p>
            <SocialLinks variant="row" />
            <p className="mt-4 text-[14px] text-muted">
              Prefer your own client?{' '}
              <a href={`mailto:${person.email}`} className="link-underline">
                {person.email}
              </a>
            </p>
          </div>

          <ResumeActions />
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

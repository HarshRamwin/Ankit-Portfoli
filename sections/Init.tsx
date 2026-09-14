'use client';

import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { person, site, stages } from '@/data/site';
import { BootSummary, TerminalBoot } from '@/components/TerminalBoot';
import { SocialLinks } from '@/components/SocialLinks';
import { ResumeActions } from '@/components/ResumeActions';
import { ThemeToggle } from '@/components/ThemeToggle';
import { usePipeline } from '@/lib/use-pipeline';

const stage = stages[0]!;

export function Init() {
  const { goTo } = usePipeline();

  return (
    <section
      id={stage.id}
      tabIndex={-1}
      aria-labelledby="init-heading"
      className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 pt-24 outline-none sm:pb-20 lg:pb-24 lg:pt-20"
    >
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          {/* Identity */}
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="mono text-2xs uppercase tracking-[0.18em] text-faint">{site.pipelineId}</span>
              <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong sm:block" />
              <span className="mono flex items-center gap-2 text-2xs uppercase tracking-[0.12em] text-accent">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                {person.availability}
              </span>
            </div>

            <h1
              id="init-heading"
              className="mt-6 text-[clamp(2.25rem,7vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-ink"
            >
              {person.name}
            </h1>

            <p className="mt-5 max-w-[28ch] text-[clamp(1.25rem,3vw,1.75rem)] font-medium leading-[1.25] text-ink sm:max-w-[34ch]">
              {person.statement}
            </p>

            <p className="mono mt-4 text-[13px] uppercase tracking-[0.1em] text-accent">
              {person.disciplines.join(' · ')}
            </p>

            <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted sm:text-[17px]">
              {person.intro}
            </p>
            <BootSummary />

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button type="button" onClick={() => goTo('build')} className="btn btn-primary w-full sm:w-auto">
                Explore pipeline
                <ArrowDown size={14} aria-hidden="true" />
              </button>

              {/* Theme toggle and resume actions grouped together */}
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <ResumeActions />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <SocialLinks />
              <Link
                href="/recruiter"
                className="mono group inline-flex items-center gap-2 text-2xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
              >
                Recruiter? Quick view
                <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Boot sequence */}
          <div className="lg:pl-4">
            <TerminalBoot />
            <p className="mono mt-4 flex items-center justify-between text-2xs uppercase tracking-[0.1em] text-faint">
              <span>node: production-ready</span>
              <span>{person.timezone}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

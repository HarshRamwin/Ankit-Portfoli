'use client';

import Link from 'next/link';
import { person, site, stages } from '@/data/site';
import { usePipeline } from '@/lib/use-pipeline';

export function Footer() {
  const { activeIndex } = usePipeline();
  const done = activeIndex >= stages.length - 1;

  return (
    <footer className="relative z-10 border-t border-line py-10">
      <div className="shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className={`mono text-2xs uppercase tracking-[0.14em] ${done ? 'text-accent' : 'text-faint'}`}
            >
              {done ? 'deployment complete · ready for next opportunity' : `${site.pipelineId} · running`}
            </p>
            <p className="mono mt-2 text-2xs tracking-[0.08em] text-faint">
              {stages.length} stages · {activeIndex + 1} reached · built with Next.js, TypeScript and
              Tailwind
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/recruiter"
              className="mono text-2xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
            >
              Recruiter view
            </Link>
            <a
              href={`mailto:${person.email}`}
              className="mono text-2xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
            >
              {person.email}
            </a>
            <span className="mono text-2xs tracking-[0.08em] text-faint">
              © {new Date().getFullYear()} {person.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

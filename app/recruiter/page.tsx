import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download, Github, Linkedin, Mail } from 'lucide-react';
import {
  achievement,
  clouds,
  person,
  profileSpecs,
  releases,
  site,
  skillGroups,
  testpulse,
} from '@/data/site';

export const metadata: Metadata = {
  title: 'Recruiter quick view',
  description: `Condensed profile of ${person.name} — role, stack, experience, project, education and contact details on one page.`,
  alternates: { canonical: '/recruiter' },
  robots: { index: false, follow: true },
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <h2 className="mono mb-5 text-2xs uppercase tracking-[0.14em] text-accent">{title}</h2>
      {children}
    </section>
  );
}

export default function RecruiterPage() {
  return (
    <main className="relative z-10 min-h-screen">
      {/* Motion is switched off for this view before paint. */}
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.setAttribute('data-motion','off');",
        }}
      />

      <div className="shell max-w-[900px] py-12 sm:py-16">
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="mono inline-flex items-center gap-2 text-2xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Back to full experience
          </Link>
          <span className="mono text-2xs uppercase tracking-[0.12em] text-faint">
            Recruiter quick view · no animation
          </span>
        </div>

        <header className="border border-line bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="mono flex items-center gap-2 text-2xs uppercase tracking-[0.12em] text-accent">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
              {person.availability}
            </span>
            <span className="mono text-2xs uppercase tracking-[0.1em] text-faint">{person.timezone}</span>
          </div>

          <h1 className="mt-5 text-[clamp(1.9rem,5vw,2.75rem)] font-semibold leading-[1.05] text-ink">
            {person.name}
          </h1>
          <p className="mt-2 text-[17px] text-muted">{person.title}</p>
          <p className="mt-5 max-w-prose text-[16px] leading-relaxed text-ink">{person.intro}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={person.resumePath} download className="btn btn-primary">
              <Download size={14} aria-hidden="true" />
              Download resume
            </a>
            <a href={`mailto:${person.email}`} className="btn btn-ghost">
              <Mail size={14} aria-hidden="true" />
              {person.email}
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={14} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost"
              aria-label="GitHub profile"
            >
              <Github size={14} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </header>

        <div className="mt-10">
          <Block title="Profile">
            <dl className="grid gap-x-8 sm:grid-cols-2">
              {profileSpecs.map((spec) => (
                <div key={spec.key} className="flex gap-4 border-b border-line py-3">
                  <dt className="mono w-[132px] shrink-0 text-2xs uppercase tracking-[0.1em] text-faint">
                    {spec.key}
                  </dt>
                  <dd className="text-[15px] text-ink">
                    {Array.isArray(spec.value) ? spec.value.join(' · ') : spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Technical stack">
            <dl className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.id} className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                  <dt className="mono w-[150px] shrink-0 text-[13px] text-ink">{group.label}</dt>
                  <dd className="text-[15px] leading-relaxed text-muted">
                    {group.items.map((i) => i.name).join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Experience">
            <ol className="space-y-7">
              {releases
                .filter((r) => r.status !== 'foundation')
                .map((entry) => (
                  <li key={entry.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[18px] font-medium text-ink">{entry.org}</h3>
                      <span className="mono text-2xs uppercase tracking-[0.1em] text-faint">
                        {entry.period}
                      </span>
                    </div>
                    <p className="mt-1 text-[15px] text-accent">{entry.role}</p>
                    <ul className="mt-3 space-y-1.5">
                      {entry.impact.map((item) => (
                        <li key={item.tag} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                          <span className="mono w-[112px] shrink-0 text-2xs uppercase tracking-[0.08em] text-faint">
                            {item.tag}
                          </span>
                          {item.detail}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ol>
          </Block>

          <Block title="Main project">
            <h3 className="text-[18px] font-medium text-ink">
              {testpulse.name} — {testpulse.tagline}
            </h3>
            <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted">{testpulse.summary}</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {testpulse.highlights.map((h) => (
                <li key={h.k} className="flex gap-2 text-[14px] text-muted">
                  <span aria-hidden="true" className="mono text-accent">
                    ·
                  </span>
                  <span>
                    <span className="text-ink">{h.k}</span> — {h.v}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={testpulse.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline mono mt-5 inline-block text-[13px]"
            >
              {testpulse.repo.replace(/^https?:\/\//, '')}
            </a>
          </Block>

          <Block title="Cloud environments">
            <ul className="space-y-2">
              {clouds.map((cloud) => (
                <li key={cloud.name} className="text-[15px] leading-relaxed text-muted">
                  <span className="text-ink">{cloud.name}</span> — {cloud.detail}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Education & certification">
            <div className="space-y-5">
              {releases
                .filter((r) => r.status === 'foundation')
                .map((entry) => (
                  <div key={entry.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[17px] font-medium text-ink">{entry.org}</h3>
                      <span className="mono text-2xs uppercase tracking-[0.1em] text-faint">
                        {entry.period}
                      </span>
                    </div>
                    <p className="mt-1 text-[15px] text-muted">{entry.role}</p>
                  </div>
                ))}
              <div>
                <h3 className="text-[17px] font-medium text-ink">{achievement.program}</h3>
                <p className="mt-1 text-[15px] text-accent">{achievement.level}</p>
                <p className="mt-2 max-w-prose text-[14px] leading-relaxed text-muted">
                  {achievement.detail}
                </p>
              </div>
            </div>
          </Block>

          <Block title="Contact">
            <p className="text-[15px] leading-relaxed text-muted">
              Email{' '}
              <a href={`mailto:${person.email}`} className="link-underline">
                {person.email}
              </a>{' '}
              or use the{' '}
              <Link href="/#connect" className="link-underline">
                contact form
              </Link>
              . {person.responseTime}.
            </p>
          </Block>
        </div>

        <p className="mono mt-6 text-2xs uppercase tracking-[0.1em] text-faint">
          {site.pipelineId} · quick view
        </p>
      </div>
    </main>
  );
}

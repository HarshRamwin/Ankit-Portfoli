'use client';

import { achievement } from '@/data/site';
import { useInView } from '@/lib/use-pipeline';

export function AchievementPanel() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const earnedIndex = achievement.tiers.indexOf(achievement.earnedTier);

  return (
    <div ref={ref} className="panel overflow-hidden">
      <div className="panel-head">
        <span className="mono text-2xs uppercase tracking-[0.12em] text-muted">certification.log</span>
        <span className="mono flex items-center gap-2 text-2xs uppercase tracking-[0.12em] text-accent">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          verified
        </span>
      </div>

      <div className="grid gap-px bg-line md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <dl className="bg-surface p-5 sm:p-7">
          <div className="border-b border-line pb-4">
            <dt className="label">status</dt>
            <dd className="mono mt-1.5 text-[15px] uppercase tracking-[0.08em] text-accent">
              {achievement.status}
            </dd>
          </div>
          <div className="border-b border-line py-4">
            <dt className="label">program</dt>
            <dd className="mt-1.5 text-[17px] text-ink">{achievement.program}</dd>
          </div>
          <div className="border-b border-line py-4">
            <dt className="label">level</dt>
            <dd className="mt-1.5 text-[22px] font-medium leading-tight text-ink sm:text-[26px]">
              {achievement.level}
            </dd>
          </div>
          <div className="pt-4">
            <dt className="label">scope</dt>
            <dd className="mono mt-1.5 text-[12px] leading-relaxed text-muted">{achievement.scope}</dd>
          </div>
        </dl>

        <div className="flex flex-col justify-between gap-6 bg-surface p-5 sm:p-7">
          <p className="max-w-prose text-[15px] leading-relaxed text-muted">{achievement.detail}</p>

          <div>
            <p className="label mb-3">tier progression</p>
            <ol className="flex items-center">
              {achievement.tiers.map((tier, i) => {
                const reached = inView && i <= earnedIndex;
                const isEarned = i === earnedIndex;
                return (
                  <li key={tier} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-start gap-2">
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${
                          reached ? 'bg-accent' : 'border border-line-strong bg-transparent'
                        }`}
                        style={{ transitionDelay: `${i * 140}ms` }}
                      />
                      <span
                        className={`mono text-2xs uppercase tracking-[0.1em] transition-colors duration-500 ${
                          isEarned ? 'text-accent' : reached ? 'text-muted' : 'text-faint'
                        }`}
                        style={{ transitionDelay: `${i * 140}ms` }}
                      >
                        {tier}
                      </span>
                    </div>
                    {i < achievement.tiers.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className={`mx-2 mb-6 h-px flex-1 transition-colors duration-500 ${
                          inView && i < earnedIndex ? 'bg-accent' : 'bg-line'
                        }`}
                        style={{ transitionDelay: `${i * 140}ms` }}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

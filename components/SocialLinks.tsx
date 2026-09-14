import { Github, Linkedin, Mail } from 'lucide-react';
import { person } from '@/data/site';

const links = [
  { href: person.github, label: 'GitHub', Icon: Github, external: true },
  { href: person.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
  { href: `mailto:${person.email}`, label: 'Email', Icon: Mail, external: false },
];

export function SocialLinks({
  variant = 'icon',
  className = '',
}: {
  variant?: 'icon' | 'row';
  className?: string;
}) {
  if (variant === 'row') {
    return (
      <ul className={`divide-y divide-line border-y border-line ${className}`}>
        {links.map(({ href, label, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer noopener' : undefined}
              className="group flex items-center gap-4 py-3.5 transition-colors"
            >
              <Icon size={16} className="shrink-0 text-faint transition-colors group-hover:text-accent" aria-hidden="true" />
              <span className="mono text-2xs uppercase tracking-[0.12em] text-faint">{label}</span>
              <span className="ml-auto truncate text-[14px] text-muted transition-colors group-hover:text-ink">
                {label === 'Email' ? person.email : href.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ href, label, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer noopener' : undefined}
            aria-label={label}
            title={label}
            className="flex h-10 w-10 items-center justify-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Icon size={16} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

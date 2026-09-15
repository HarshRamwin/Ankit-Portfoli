import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { person, site } from '@/data/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const viewport: Viewport = {
  themeColor: '#080A0D',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${person.name}`,
  },
  description: site.description,
  icons: { icon: '/icon.svg' },
  keywords: [...site.keywords],
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: person.name,
    title: site.title,
    description: site.description,
    locale: 'en_US',
    images: [{ url: '/opengraph-image.svg', width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'technology',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  url: site.url,
  email: `mailto:${person.email}`,
  jobTitle: 'Software Engineer — QA Automation, DevOps & Cloud',
  description: site.description,
  sameAs: [person.github, person.linkedin],
  knowsAbout: [
    'QA Automation',
    'Test Automation',
    'Python',
    'Selenium',
    'Playwright',
    'Pytest',
    'API Testing',
    'CI/CD',
    'Jenkins',
    'GitHub Actions',
    'Docker',
    'Kubernetes',
    'AWS',
    'Microsoft Azure',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'RTC Institute of Technology',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Conqudel Pte. Ltd.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#build"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-accent focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Static, author-controlled JSON — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}

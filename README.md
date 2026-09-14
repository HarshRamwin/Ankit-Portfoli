# From Commit to Production — Ankit Kumar Mishra

A personal engineering portfolio built as a software delivery pipeline. Visitors move through
eight jobs — `INIT → BUILD → TEST → PIPELINE → SHIP → RELEASE → ARTIFACT → CONNECT` — while a
live rail tracks which stages have passed, which is running, and which are still queued.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide · Resend

---

## 1. Install dependencies

```bash
npm install
```

Node 18.18 or newer is required.

## 2. Run locally

```bash
npm run dev
```

Open <http://localhost:3000>. The recruiter quick view lives at `/recruiter`.

Useful scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js config) |
| `npm run typecheck` | `tsc --noEmit` |

## 3. Set environment variables

Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

```dotenv
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=ankitkumarmishra5155@gmail.com
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

`.env.local` is git-ignored. `RESEND_API_KEY` is **only ever read on the server**, inside
`app/api/contact/route.ts` → `lib/email.ts`. It is never bundled into client JavaScript, and no
secret is prefixed with `NEXT_PUBLIC_`.

## 4. Configure contact-email delivery

The form posts to a server route, not to a third-party endpoint in the browser:

```
ContactForm (client)
  → POST /api/contact          rate limit → validation → spam heuristics
  → lib/email.ts               Resend API
  → ankitkumarmishra5155@gmail.com
```

**Set-up steps**

1. Create an account at <https://resend.com>.
2. **For testing:** keep `CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"`. Resend allows
   this shared sender to deliver to the email address that owns the account.
3. **For production:** add your domain under *Domains*, add the DNS records Resend gives you, wait
   for verification, then set `CONTACT_FROM_EMAIL="Portfolio <hello@your-domain.com>"`. Mail from a
   verified domain is far less likely to land in spam.
4. Create an API key under *API Keys* with **Sending access** and paste it into `RESEND_API_KEY`.

**What the recruiter receives on screen**

- `TRANSMITTING…` while the request is in flight
- `MESSAGE DELIVERED ✓` — *"Message sent successfully. I'll get back to you soon."*
- Inline field errors for name, work email and message
- A readable error if the server or provider fails, with your email address as the fallback

**What you receive by email**

```
Subject: Portfolio Contact — [Name] from [Company]

Name:
Email:
Company:
Role:
Opportunity Type:
Message:
```

`replyTo` is set to the sender's address, so hitting reply in Gmail answers the recruiter directly.

**Anti-spam measures** (all server-side, in `lib/validation.ts` and `lib/rate-limit.ts`)

- Hidden honeypot field — if it is filled, the request returns `200` and nothing is sent
- Minimum time-on-form check (submissions faster than 2.5s are dropped) and stale-form rejection
- Link-count heuristic on the message body
- Sliding-window rate limit: 5 submissions per IP per hour

> The rate limiter is in-memory, which suits a single-region deployment. If you scale to many
> instances, swap the `Map` in `lib/rate-limit.ts` for Upstash Redis — the function signature is
> already shaped for it.

**Prefer EmailJS instead?** Replace the body of `deliverContactEmail()` in `lib/email.ts` with an
EmailJS REST call. Nothing else in the app needs to change — the route, validation, states and UI
are provider-agnostic.

## 5. Replace the resume PDF

Drop your file at:

```
public/resume/ankit-kumar-mishra-resume.pdf
```

Keep the filename, or change `person.resumePath` in `data/site.ts` to match your own. The path is
used by the download button, the preview modal and the recruiter view. Update
`person.resumeUpdated` so the preview shows the right date.

## 6. Update GitHub / LinkedIn and everything else

Every piece of content lives in **`data/site.ts`**. No component contains hard-coded personal text.

```ts
export const person = {
  github: 'https://github.com/your-handle',
  linkedin: 'https://www.linkedin.com/in/your-handle',
  email: 'you@example.com',
  ...
};
```

What you can edit there:

| Export | Controls |
| --- | --- |
| `person` | Name, title, statement, bio, availability, email, social URLs, resume path |
| `site` | SEO title, description, canonical URL, keywords, pipeline ID |
| `stages` | The eight pipeline jobs — labels, titles, section summaries |
| `bootLines` | The hero boot sequence |
| `profileSpecs` | The engineer profile spec sheet |
| `skillGroups` | The technology topology categories and their entries |
| `testCases`, `qualityDisciplines`, `stlc` | The TEST stage |
| `ciSteps`, `ciPlatforms` | The PIPELINE stage |
| `infraFlow`, `containerFacts`, `clusterFacts`, `clouds`, `achievement` | The SHIP stage |
| `releases` | Experience and education timeline |
| `testpulse` | The full TestPulse case study |
| `opportunityTypes` | The contact form dropdown |

Colours, spacing and motion tokens live in `tailwind.config.ts` and `app/globals.css`.

## 7. Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project** and import it. The framework is detected automatically; no
   build settings need changing.
3. Under **Settings → Environment Variables**, add `RESEND_API_KEY`, `CONTACT_EMAIL`,
   `CONTACT_FROM_EMAIL` and `NEXT_PUBLIC_SITE_URL` for Production (and Preview if you want the form
   working there too).
4. Deploy. Add your custom domain under **Settings → Domains**, then set `NEXT_PUBLIC_SITE_URL` to
   that domain so canonical URLs, OpenGraph tags and the sitemap point at the right place.
5. Send yourself a test message through the live form to confirm delivery.

```bash
# or from the CLI
npm i -g vercel
vercel
vercel --prod
```

---

## Project structure

```
app/
  layout.tsx            fonts, metadata, Person schema, skip link
  page.tsx              composes the eight stages
  globals.css           design tokens, panel/terminal styles, reduced motion
  recruiter/page.tsx    static animation-free quick view
  api/contact/route.ts  contact endpoint
  opengraph-image.tsx   generated social card
  sitemap.ts robots.ts not-found.tsx icon.svg
components/
  primitives.tsx        Section, SectionHeader, Panel, StatusGlyph, Reveal
  PipelineNav.tsx       desktop rail, run progress bar, mobile stage sheet
  TerminalBoot.tsx      hero boot sequence
  TestRunner.tsx        queued → running → passed test log
  PipelineRun.tsx       CI workflow stage strip
  InfraFlow.tsx         developer → cloud topology
  StackTopology.tsx     technology categories (tablist)
  ReleaseTimeline.tsx   expandable experience entries
  TestPulseStudy.tsx    case study graph + architecture drill-down
  AchievementPanel.tsx  Google Cloud Arcade status readout
  ContactForm.tsx       recruiter form and its states
  ResumeActions.tsx     download + preview modal
  SocialLinks.tsx  Footer.tsx
sections/               Init, Build, Test, Pipeline, Ship, Release, Artifact, Connect
data/site.ts            all content
lib/                    types, validation, rate limiting, email, pipeline hooks
public/resume/          the downloadable PDF
```

## Accessibility & performance notes

- Semantic landmarks, one `h1`, labelled sections, and a skip link
- The technology topology is a proper `tablist` with arrow-key, Home and End support
- Every control has a visible focus ring; modals trap Escape and restore focus
- `prefers-reduced-motion` disables the boot sequence, test run, connectors and expansions — content
  is never hidden behind an animation
- The hero heading and copy are server-rendered text, so LCP does not wait on JavaScript
- No WebGL, no canvas, no particle systems: motion is CSS transforms and opacity only
- Fonts are self-hosted through `next/font` with `display: swap` and preloaded subsets
- The resume PDF is fetched only when the preview or download is used

## License

Personal portfolio content. Code is free to reuse; please replace the content in `data/site.ts`
with your own.

import type {
  CiStep,
  InfraNode,
  PipelineNode,
  ProfileSpec,
  ReleaseEntry,
  SkillGroup,
  Stage,
  TestCase,
} from '@/lib/types';

/* ════════════════════════════════════════════════════════════════════════
   EDIT THIS FILE TO UPDATE THE PORTFOLIO.
   No UI component contains hard-coded personal content.
   ════════════════════════════════════════════════════════════════════════ */

export const person = {
  name: 'Ankit Kumar Mishra',
  shortName: 'Ankit',
  handle: 'ankit',
  title: 'Software Engineer — QA Automation | DevOps | Cloud',
  statement: 'I build confidence between code and production.',
  disciplines: ['QA Automation', 'DevOps', 'Cloud Engineering'],
  intro:
    'I automate quality, streamline delivery pipelines, and help applications move reliably from development to production.',
  bio: [
    'I am a Computer Science engineer working at the seam between writing software and running it. Most of my day is spent making the path to production boring: automated test suites that catch regressions before a human has to, pipelines that build and verify every commit, and containers that behave the same on a laptop and in a cluster.',
    'I started in Python and data analysis, moved into test automation with Selenium and Playwright, and grew into the delivery side — Jenkins, GitHub Actions, Docker, Kubernetes, AWS and Azure. That path is why I care about quality as a system property rather than a phase at the end of a sprint.',
  ],
  availability: 'Open to opportunities',
  timezone: 'India · IST (UTC+05:30)',
  responseTime: 'Replies within 24 hours',
  email: 'ankitkumarmishra5155@gmail.com',
  /* ── Update these two URLs and the whole site follows ─────────────── */
  github: 'https://github.com/ANKITMISHRA856',
  linkedin: 'https://www.linkedin.com/in/ankit856/',
  resumePath: '/resume/ankit_resume.pdf',
  resumeUpdated: 'September 2026',
} as const;

export const site = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.trim().match(/^https?:\/\/\S+$/)?.[0] ??
    'https://ankitmishra.dev',
  title: 'Ankit Kumar Mishra | QA Automation, DevOps & Cloud Engineer',
  description:
    'Portfolio of Ankit Kumar Mishra, a Software Engineer specializing in QA Automation, Python, CI/CD, Docker, Kubernetes, AWS and Azure.',
  pipelineId: 'PIPELINE #ANKIT-001',
  keywords: [
    'Ankit Kumar Mishra',
    'QA Automation Engineer',
    'DevOps Engineer',
    'SDET',
    'Python Selenium',
    'Playwright',
    'Pytest',
    'CI/CD',
    'Jenkins',
    'GitHub Actions',
    'Docker',
    'Kubernetes',
    'AWS',
    'Microsoft Azure',
  ],
} as const;

/* ── Pipeline stages: these drive the rail, the nav and the sections ─── */
export const stages: Stage[] = [
  {
    id: 'init',
    job: '00',
    label: 'Init',
    title: 'Initialize',
    summary: 'Environment up, profile loaded, status reported.',
  },
  {
    id: 'build',
    job: '01',
    label: 'Build',
    title: 'Engineer profile',
    summary: 'What I am made of, and the stack I build with.',
  },
  {
    id: 'test',
    job: '02',
    label: 'Test',
    title: 'Quality gates',
    summary: 'Automated checks that decide whether anything ships.',
  },
  {
    id: 'pipeline',
    job: '03',
    label: 'Pipeline',
    title: 'Continuous delivery',
    summary: 'Jenkins and GitHub Actions doing the repetitive work.',
  },
  {
    id: 'ship',
    job: '04',
    label: 'Ship',
    title: 'Containers & cloud',
    summary: 'From image build to a running workload on AWS and Azure.',
  },
  {
    id: 'release',
    job: '05',
    label: 'Release',
    title: 'Release history',
    summary: 'Where I have worked and what each release delivered.',
  },
  {
    id: 'artifact',
    job: '06',
    label: 'Artifact',
    title: 'TestPulse',
    summary: 'The framework I built, examined end to end.',
  },
  {
    id: 'connect',
    job: '07',
    label: 'Connect',
    title: "Let's build reliable software",
    summary: 'Send a role, a problem, or a question. It reaches my inbox.',
  },
];

/* ── Hero boot sequence ──────────────────────────────────────────────── */
export const bootLines: { label: string; value: string; ok?: boolean }[] = [
  { label: 'resolving identity', value: 'ankit-kumar-mishra' },
  { label: 'qa.engineer', value: 'READY', ok: true },
  { label: 'automation', value: 'READY', ok: true },
  { label: 'devops', value: 'READY', ok: true },
  { label: 'cloud', value: 'READY', ok: true },
  { label: 'status', value: 'OPEN TO OPPORTUNITIES', ok: true },
];

/* ── 01 BUILD ────────────────────────────────────────────────────────── */
export const profileSpecs: ProfileSpec[] = [
  { key: 'role', value: 'QA Automation + DevOps Engineer' },
  { key: 'primary_language', value: 'Python' },
  { key: 'focus', value: ['Software quality', 'Test automation', 'CI/CD delivery', 'Cloud deployment'] },
  { key: 'environment', value: 'AWS · Azure · Docker · Kubernetes' },
  { key: 'working_method', value: 'Agile / Scrum · STLC' },
  { key: 'education', value: 'B.Tech CSE — RTC Institute of Technology (2022–2026)' },
  { key: 'location', value: person.timezone },
];

export const skillGroups: SkillGroup[] = [
  {
    id: 'qa-automation',
    label: 'QA Automation',
    note: 'writing the tests that gate a release',
    items: [
      { name: 'Python', detail: 'Primary language for suites, fixtures and tooling' },
      { name: 'Selenium', detail: 'Cross-browser web automation for legacy and enterprise UIs' },
      { name: 'Playwright', detail: 'Fast, auto-waiting browser automation with tracing' },
      { name: 'Pytest', detail: 'Fixtures, markers, parametrisation and HTML reporting' },
    ],
  },
  {
    id: 'api-quality',
    label: 'API & Quality',
    note: 'verifying contracts and protecting behaviour',
    items: [
      { name: 'Postman', detail: 'Collections, environments and automated runs' },
      { name: 'REST API testing', detail: 'Status, payload, schema and negative-path checks' },
      { name: 'Functional testing', detail: 'Requirement-to-test traceability' },
      { name: 'Regression testing', detail: 'Guarding shipped behaviour every release' },
      { name: 'Smoke testing', detail: 'Fast build-acceptance checks before deeper suites' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    note: 'making delivery repeatable',
    items: [
      { name: 'Jenkins', detail: 'Declarative pipelines, agents and scheduled runs' },
      { name: 'GitHub Actions', detail: 'Workflows on push and pull request' },
      { name: 'CI/CD', detail: 'Build, verify, publish and deploy as one path' },
    ],
  },
  {
    id: 'containers',
    label: 'Containers',
    note: 'the same environment everywhere',
    items: [
      { name: 'Docker', detail: 'Images, layer caching, compose and containerised test runs' },
      { name: 'Kubernetes', detail: 'Deployments, services, config and rollout support' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    note: 'where the workloads actually live',
    items: [
      { name: 'AWS', detail: 'Compute, storage and networking for app infrastructure' },
      { name: 'Microsoft Azure', detail: 'Resource groups, app hosting and pipeline integration' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    note: 'reading what the system tells you',
    items: [
      { name: 'SQL', detail: 'Query-level validation of test and application data' },
      { name: 'NumPy', detail: 'Numerical work from the data science foundation' },
      { name: 'Pandas', detail: 'Exploratory analysis and result aggregation' },
      { name: 'Matplotlib', detail: 'Visualising trends and test outcomes' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    note: 'daily working surface',
    items: [
      { name: 'Git', detail: 'Branching, rebasing and review-driven workflow' },
      { name: 'GitHub', detail: 'Pull requests, reviews and Actions' },
      { name: 'VS Code', detail: 'Primary editor and debugger' },
      { name: 'Jira', detail: 'Defect tracking, sprints and traceability' },
    ],
  },
];

/* ── 02 TEST ─────────────────────────────────────────────────────────── */
export const testCases: TestCase[] = [
  { id: 't1', suite: 'ui', path: 'tests/ui/test_auth.py', name: 'test_valid_login', ms: 1420 },
  { id: 't2', suite: 'ui', path: 'tests/ui/test_auth.py', name: 'test_invalid_credentials', ms: 980 },
  { id: 't3', suite: 'ui', path: 'tests/ui/test_cart.py', name: 'test_add_item_updates_total', ms: 2130 },
  { id: 't4', suite: 'ui', path: 'tests/ui/test_checkout.py', name: 'test_checkout_happy_path', ms: 3260 },
  { id: 't5', suite: 'api', path: 'tests/api/test_users.py', name: 'test_create_user_returns_201', ms: 310 },
  { id: 't6', suite: 'api', path: 'tests/api/test_users.py', name: 'test_schema_contract', ms: 190 },
  { id: 't7', suite: 'api', path: 'tests/api/test_orders.py', name: 'test_unauthorised_rejected', ms: 240 },
  { id: 't8', suite: 'ui', path: 'tests/ui/test_search.py', name: 'test_no_results_message', ms: 1180 },
];

export const qualityDisciplines = [
  {
    label: 'Functional',
    detail: 'Every requirement mapped to a test case, so coverage is a fact rather than a feeling.',
  },
  {
    label: 'Regression',
    detail: 'Suites re-run on every pipeline execution to prove that what worked yesterday still works.',
  },
  {
    label: 'Smoke',
    detail: 'A short critical-path run that decides in minutes whether a build deserves a full suite.',
  },
  {
    label: 'API',
    detail: 'Status codes, payload shape, schema and negative paths validated before the UI is touched.',
  },
];

export const stlc = ['Requirement analysis', 'Test planning', 'Case design', 'Environment setup', 'Execution', 'Closure'];

/* ── 03 PIPELINE ─────────────────────────────────────────────────────── */
export const ciSteps: CiStep[] = [
  { name: 'checkout', command: 'actions/checkout@v4', duration: '4s' },
  { name: 'setup', command: 'python -m pip install -r requirements.txt', duration: '22s' },
  { name: 'lint', command: 'ruff check .', duration: '3s' },
  { name: 'api tests', command: 'pytest tests/api -q', duration: '9s' },
  { name: 'ui tests', command: 'pytest tests/ui --headed=false', duration: '48s' },
  { name: 'report', command: 'pytest --html=report.html --self-contained-html', duration: '2s' },
  { name: 'image', command: 'docker build -t testpulse:$SHA .', duration: '31s' },
  { name: 'publish', command: 'upload-artifact report.html + screenshots', duration: '6s' },
];

export const ciPlatforms = [
  {
    name: 'Jenkins',
    role: 'Pipeline support & maintenance',
    points: [
      'Declarative pipelines with staged build, test and deploy jobs',
      'Scheduled regression runs on shared agents',
      'Failure triage from console output and published reports',
    ],
  },
  {
    name: 'GitHub Actions',
    role: 'Commit-level verification',
    points: [
      'Workflows triggered on push and pull request',
      'Matrix-friendly test execution with cached dependencies',
      'HTML reports and failure screenshots uploaded as artifacts',
    ],
  },
];

/* ── 04 SHIP ─────────────────────────────────────────────────────────── */
export const infraFlow: InfraNode[] = [
  { id: 'dev', label: 'Developer', sub: 'local', detail: 'Feature work, unit checks and a pre-push smoke run.' },
  { id: 'git', label: 'Git / GitHub', sub: 'source', detail: 'Branch, pull request and review before anything merges.' },
  { id: 'ci', label: 'CI/CD', sub: 'jenkins · actions', detail: 'Every commit builds and verifies itself automatically.' },
  { id: 'tests', label: 'Automated tests', sub: 'pytest · playwright', detail: 'UI and API suites act as the release gate.' },
  { id: 'docker', label: 'Docker', sub: 'image', detail: 'Application and test runner packaged into one reproducible image.' },
  { id: 'k8s', label: 'Kubernetes', sub: 'workload', detail: 'Deployments, services and rollout verification.' },
  { id: 'cloud', label: 'AWS / Azure', sub: 'production', detail: 'The environment users actually reach.' },
];

export const containerFacts = [
  { k: 'Base image', v: 'python:3.12-slim' },
  { k: 'Layers', v: 'deps cached, source last' },
  { k: 'Entrypoint', v: 'pytest --html=report.html' },
  { k: 'Runtime', v: 'headless browsers installed at build' },
];

export const clusterFacts = [
  { k: 'Workload', v: 'Deployment · 3 replicas' },
  { k: 'Exposure', v: 'Service + Ingress' },
  { k: 'Config', v: 'ConfigMap · Secret' },
  { k: 'Rollout', v: 'verified with smoke suite' },
];

export const clouds = [
  {
    name: 'AWS',
    detail: 'Compute, storage and networking for application infrastructure, plus environment support for deployed builds.',
  },
  {
    name: 'Microsoft Azure',
    detail: 'Resource groups, app hosting and pipeline integration across delivery environments.',
  },
];

export const achievement = {
  program: 'Google Cloud Arcade',
  level: 'Champion Tier',
  status: 'Achievement unlocked',
  scope: 'Hands-on labs · Arcade challenges · Skill badges',
  detail:
    'The highest recognition tier in the program, earned by completing hands-on Google Cloud labs and Arcade challenges rather than multiple-choice exams.',
  tiers: ['Novice', 'Trooper', 'Ranger', 'Champion'],
  earnedTier: 'Champion',
};

/* ── 05 RELEASE ──────────────────────────────────────────────────────── */
export const releases: ReleaseEntry[] = [
  {
    id: 'conqudel',
    version: 'v2026.06',
    status: 'current',
    period: 'June 2026 — Present',
    org: 'Conqudel Pte. Ltd.',
    role: 'Associate Software Engineer — QA & DevOps',
    headline:
      'Automating test coverage and supporting the delivery path that moves builds from a pull request to a running cloud environment.',
    impact: [
      { tag: 'Automation', detail: 'Python + Selenium automated web testing across core user journeys' },
      { tag: 'API quality', detail: 'Postman collections validating REST endpoints, payloads and error paths' },
      { tag: 'Delivery', detail: 'Jenkins CI/CD pipeline support and failure triage' },
      { tag: 'Containers', detail: 'Docker containerisation and Kubernetes deployment workflows' },
      { tag: 'Cloud', detail: 'AWS and Microsoft Azure infrastructure support' },
      { tag: 'Quality', detail: 'Functional, regression and smoke testing across releases' },
      { tag: 'Collaboration', detail: 'Jira defect tracking inside an Agile/Scrum team' },
      { tag: 'Documentation', detail: 'Test cases and deployment steps written down so they survive handover' },
    ],
    stack: ['Python', 'Selenium', 'Postman', 'Jenkins', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Jira'],
  },
  {
    id: 'pyspiders',
    version: 'v2026.04',
    status: 'shipped',
    period: 'April 2026 — June 2026',
    org: 'PySpiders Software Testing & Development Center',
    role: 'Python with Data Science Intern',
    headline:
      'Built the analytical foundation — reading data carefully before automating decisions based on it.',
    impact: [
      { tag: 'Analysis', detail: 'Exploratory data analysis on structured datasets with Pandas and NumPy' },
      { tag: 'Querying', detail: 'SQL for extraction, joins and validation of source data' },
      { tag: 'Visualisation', detail: 'Matplotlib and Power BI dashboards to communicate findings' },
      { tag: 'Python', detail: 'Scripting, data cleaning and reproducible notebooks' },
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'SQL', 'Matplotlib', 'Power BI'],
  },
  {
    id: 'rtc',
    version: 'v2022.09',
    status: 'foundation',
    period: '2022 — 2026',
    org: 'RTC Institute of Technology',
    role: 'B.Tech, Computer Science and Engineering',
    headline: 'Four years of fundamentals: data structures, systems, databases and networks.',
    impact: [
      { tag: 'Core', detail: 'Data structures, algorithms, operating systems and computer networks' },
      { tag: 'Databases', detail: 'Relational modelling and SQL' },
      { tag: 'Applied', detail: 'Project work in Python and full stack development' },
    ],
    stack: ['Computer Science', 'Databases', 'Networks', 'Full Stack'],
  },
];

/* ── 06 ARTIFACT — TestPulse case study ──────────────────────────────── */
export const testpulse = {
  name: 'TestPulse',
  tagline: 'Python QA Automation & CI/CD Testing Framework — UI + API',
  repo: `${person.github}/testpulse`,
  summary:
    'A single framework that verifies an application from both sides: browser journeys through Playwright and REST contracts through Requests — then reports, screenshots, containerises and runs itself in CI on every commit.',
  metrics: [
    { value: '12', label: 'UI scenarios', note: 'Playwright, page object driven' },
    { value: '6', label: 'REST API tests', note: 'status, payload and schema' },
    { value: 'CI', label: 'Automated', note: 'push + pull request' },
    { value: 'Docker', label: 'Containerised', note: 'identical run anywhere' },
  ],
  nodes: [
    {
      id: 'code',
      label: 'Code',
      kind: 'source',
      meta: 'git push / pull request',
      detail: 'A commit is the only trigger. No manual run, no "works on my machine" step before verification.',
    },
    {
      id: 'pytest',
      label: 'Pytest',
      kind: 'test',
      meta: 'fixtures · markers · conftest',
      detail:
        'Shared fixtures handle browser context, base URL, auth tokens and teardown, so a new test file inherits the environment instead of rebuilding it.',
    },
    {
      id: 'playwright',
      label: 'Playwright',
      kind: 'test',
      meta: 'page object model',
      detail:
        'Every screen is a page object exposing intent-level methods. Selectors live in one place, so a UI change is a one-file fix rather than a suite-wide rewrite.',
    },
    {
      id: 'suites',
      label: 'UI + API tests',
      kind: 'test',
      meta: '12 UI · 6 API',
      detail:
        'UI journeys cover authentication, cart, checkout and search. API tests use Requests to assert status codes, response payloads and schema, including negative paths.',
    },
    {
      id: 'report',
      label: 'HTML report',
      kind: 'report',
      meta: 'pytest-html · screenshots',
      detail:
        'pytest-html produces a self-contained report. A failure hook captures a screenshot at the moment of failure and attaches it to the run, so triage starts with evidence.',
    },
    {
      id: 'actions',
      label: 'GitHub Actions',
      kind: 'ci',
      meta: 'on: push, pull_request',
      detail:
        'The workflow installs dependencies, runs both suites and uploads the report and screenshots as build artifacts. A red check blocks the merge.',
    },
    {
      id: 'docker',
      label: 'Docker',
      kind: 'container',
      meta: 'python:3.12-slim',
      detail:
        'The whole runner is an image: interpreter, browsers and dependencies pinned together. CI and a laptop execute the identical environment.',
    },
    {
      id: 'pass',
      label: 'Pass',
      kind: 'result',
      meta: '18 passed · 0 failed',
      detail: 'A green run is the merge signal. Anything else stops at the gate with a report attached.',
    },
  ] satisfies PipelineNode[],
  highlights: [
    { k: 'Page Object Model', v: 'selectors and page intent separated from assertions' },
    { k: 'Reusable fixtures', v: 'browser, context and API session shared through conftest.py' },
    { k: 'Screenshot on failure', v: 'pytest hook captures the failing state automatically' },
    { k: 'HTML reports', v: 'pytest-html, self-contained and CI-uploadable' },
    { k: 'REST schema validation', v: 'payload shape asserted, not just status codes' },
    { k: 'CI on push / PR', v: 'GitHub Actions runs the full suite per commit' },
    { k: 'Dockerised execution', v: 'one image, same result locally and in CI' },
    { k: 'python-dotenv', v: 'environment configuration kept out of the repository' },
  ],
  tree: [
    'testpulse/',
    '├── tests/',
    '│   ├── ui/            12 Playwright scenarios',
    '│   └── api/            6 REST API tests',
    '├── pages/              page object model',
    '├── conftest.py         shared fixtures',
    '├── .github/workflows/  ci.yml',
    '├── Dockerfile',
    '└── requirements.txt',
  ],
  stack: [
    'Python',
    'Pytest',
    'Playwright',
    'Requests',
    'pytest-html',
    'python-dotenv',
    'GitHub Actions',
    'Docker',
    'Git',
  ],
  run: {
    command: 'pytest --html=report.html --self-contained-html',
    passed: 18,
    failed: 0,
    seconds: '42.31s',
  },
};

/* ── 07 CONNECT ──────────────────────────────────────────────────────── */
export const opportunityTypes = [
  'QA Automation',
  'Software Engineer',
  'DevOps',
  'Cloud',
  'Internship / Graduate Opportunity',
  'Other',
] as const;

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen items-center">
      <div className="shell">
        <p className="mono text-2xs uppercase tracking-[0.14em] text-failed">status 404</p>
        <h1 className="mt-4 text-[clamp(1.75rem,5vw,2.75rem)] font-semibold text-ink">
          That route was never deployed.
        </h1>
        <p className="mt-3 max-w-prose text-[16px] text-muted">
          The page you asked for does not exist in this build.
        </p>
        <Link href="/" className="btn btn-primary mt-8 inline-flex">
          Return to the pipeline
        </Link>
      </div>
    </main>
  );
}

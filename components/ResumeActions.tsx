'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, FileText, X } from 'lucide-react';
import { person } from '@/data/site';

/**
 * The PDF is only requested when the reader asks for it, so the preview costs
 * nothing on first load.
 */
export function ResumeActions({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        <a href={person.resumePath} download className="btn btn-ghost">
          <Download size={14} aria-hidden="true" />
          Download resume
        </a>
        <button ref={openerRef} type="button" onClick={() => setOpen(true)} className="btn btn-ghost">
          <FileText size={14} aria-hidden="true" />
          Preview
        </button>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-base/90 p-3 backdrop-blur-sm sm:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="panel flex h-full w-full max-w-4xl flex-col">
            <div className="panel-head">
              <span className="mono truncate text-2xs uppercase tracking-[0.12em] text-muted">
                {person.resumePath.split('/').pop()}
              </span>
              <span className="flex items-center gap-4">
                <span className="mono hidden text-2xs tracking-[0.1em] text-faint sm:inline">
                  updated {person.resumeUpdated}
                </span>
                <a href={person.resumePath} download className="mono text-2xs uppercase tracking-[0.1em] text-accent">
                  download
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  className="flex h-7 w-7 items-center justify-center border border-line-strong text-muted"
                >
                  <span className="sr-only">Close preview</span>
                  <X size={14} aria-hidden="true" />
                </button>
              </span>
            </div>
            <object
              data={`${person.resumePath}#view=FitH`}
              type="application/pdf"
              className="h-full w-full flex-1 bg-elevated"
              aria-label="Resume PDF preview"
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-[15px] text-muted">
                  Your browser cannot display the PDF inline.
                </p>
                <a href={person.resumePath} download className="btn btn-primary">
                  <Download size={14} aria-hidden="true" />
                  Download instead
                </a>
              </div>
            </object>
          </div>
        </div>
      ) : null}
    </>
  );
}

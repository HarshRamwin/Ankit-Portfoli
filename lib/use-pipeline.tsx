'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { stages } from '@/data/site';
import type { StageId, StageStatus } from '@/lib/types';

interface PipelineContextValue {
  activeId: StageId;
  activeIndex: number;
  progress: number;
  statusOf: (id: StageId) => StageStatus;
  goTo: (id: StageId) => void;
}

const PipelineContext = createContext<PipelineContextValue | null>(null);

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const elements = stages
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const measure = () => {
      ticking.current = false;
      // Active stage = the last section whose top has passed 45% of the viewport.
      const marker = window.innerHeight * 0.45;
      let next = 0;
      for (let i = 0; i < elements.length; i += 1) {
        if (elements[i]!.getBoundingClientRect().top <= marker) next = i;
      }
      setActiveIndex(next);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goTo = useCallback((id: StageId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    el.focus({ preventScroll: true });
  }, []);

  const value = useMemo<PipelineContextValue>(() => {
    const statusOf = (id: StageId): StageStatus => {
      const index = stages.findIndex((s) => s.id === id);
      if (index < activeIndex) return 'passed';
      if (index === activeIndex) return 'running';
      return 'queued';
    };
    return {
      activeId: stages[activeIndex]!.id,
      activeIndex,
      progress,
      statusOf,
      goTo,
    };
  }, [activeIndex, progress, goTo]);

  return <PipelineContext.Provider value={value}>{children}</PipelineContext.Provider>;
}

export function usePipeline(): PipelineContextValue {
  const ctx = useContext(PipelineContext);
  if (!ctx) throw new Error('usePipeline must be used inside <PipelineProvider>');
  return ctx;
}

/** Fires once when the element first becomes meaningfully visible. */
export function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

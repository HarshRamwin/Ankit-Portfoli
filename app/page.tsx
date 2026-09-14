'use client';

import { PipelineProvider } from '@/lib/use-pipeline';
import { MobileNav, PipelineRail, RunProgress } from '@/components/PipelineNav';
import { Footer } from '@/components/Footer';
import { Init } from '@/sections/Init';
import { Build } from '@/sections/Build';
import { Test } from '@/sections/Test';
import { Pipeline } from '@/sections/Pipeline';
import { Ship } from '@/sections/Ship';
import { Release } from '@/sections/Release';
import { Artifact } from '@/sections/Artifact';
import { Connect } from '@/sections/Connect';

export default function HomePage() {
  return (
    <PipelineProvider>
      <RunProgress />
      <PipelineRail />
      <MobileNav />

      <main className="relative lg:pl-[168px] xl:pl-[196px]">
        <Init />
        <Build />
        <Test />
        <Pipeline />
        <Ship />
        <Release />
        <Artifact />
        <Connect />
        <Footer />
      </main>
    </PipelineProvider>
  );
}

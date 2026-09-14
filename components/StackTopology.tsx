'use client';

import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { skillGroups } from '@/data/site';

export function StackTopology() {
  const [active, setActive] = useState(skillGroups[0]!.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = skillGroups.find((g) => g.id === active) ?? skillGroups[0]!;

  const onKeyDown = (event: ReactKeyboardEvent, index: number) => {
    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % skillGroups.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
      next = (index - 1 + skillGroups.length) % skillGroups.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = skillGroups.length - 1;
    setActive(skillGroups[next]!.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-[minmax(200px,260px)_1fr]">
      {/* Category rail */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Technology categories"
        className="flex overflow-x-auto bg-elevated md:block md:overflow-visible"
      >
        {skillGroups.map((g, index) => {
          const selected = g.id === active;
          return (
            <button
              key={g.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              id={`stack-tab-${g.id}`}
              aria-selected={selected}
              aria-controls={`stack-panel-${g.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(g.id)}
              onMouseEnter={() => setActive(g.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={`group relative flex shrink-0 items-center gap-3 whitespace-nowrap border-line px-4 py-3.5 text-left transition-colors duration-200 md:w-full md:border-b md:last:border-b-0 ${
                selected ? 'bg-surface' : 'hover:bg-surface/60'
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-200 ${
                  selected ? 'bg-accent' : 'bg-line-strong'
                }`}
              />
              <span
                className={`text-[15px] transition-colors duration-200 ${
                  selected ? 'text-ink' : 'text-muted group-hover:text-ink'
                }`}
              >
                {g.label}
              </span>
              <span className="mono ml-auto hidden text-2xs tabular text-faint md:block">
                {String(g.items.length).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        role="tabpanel"
        id={`stack-panel-${group.id}`}
        aria-labelledby={`stack-tab-${group.id}`}
        tabIndex={0}
        className="bg-surface p-5 sm:p-7"
      >
        <p className="mono mb-5 text-2xs uppercase tracking-[0.12em] text-accent">{group.note}</p>
        <ul className="space-y-0">
          {group.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-1 border-b border-line py-3.5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="mono w-[168px] shrink-0 text-[13px] text-ink">{item.name}</span>
              <span className="text-[14px] leading-relaxed text-muted">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

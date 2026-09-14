import { ImageResponse } from 'next/og';
import { person } from '@/data/site';

export const alt = `${person.name} — ${person.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#080A0D',
          padding: '72px',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#37E2A0', fontSize: 22 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: '#37E2A0' }} />
          PIPELINE #ANKIT-001 · OPEN TO OPPORTUNITIES
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#F5F7FA', fontSize: 74, letterSpacing: '-2px', lineHeight: 1.05 }}>
            {person.name}
          </div>
          <div style={{ color: '#F5F7FA', fontSize: 38, marginTop: 22, lineHeight: 1.2 }}>
            {person.statement}
          </div>
          <div style={{ color: '#37E2A0', fontSize: 24, marginTop: 24, letterSpacing: '1px' }}>
            {person.disciplines.join('  ·  ')}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #1E252D',
            paddingTop: 24,
            color: '#89929E',
            fontSize: 20,
          }}
        >
          <span>Python · Playwright · Jenkins · Docker · Kubernetes · AWS · Azure</span>
          <span>{person.email}</span>
        </div>
      </div>
    ),
    size,
  );
}

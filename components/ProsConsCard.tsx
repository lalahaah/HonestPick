import type { Product } from '@/lib/supabase/types';

type Props = {
  pros: NonNullable<Product['pros']>;
  cons: NonNullable<Product['cons']>;
};

export default function ProsConsCard({ pros, cons }: Props) {
  if (!pros?.length && !cons?.length) return null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        margin: '48px 0',
      }}
      className="pros-cons-grid"
    >
      {/* Pros */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '24px',
        }}
      >
        <h4
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--good)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>✓</span> What We Love
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(pros || []).map((pro, i) => (
            <li
              key={i}
              style={{
                fontSize: '0.9375rem',
                color: 'var(--ink)',
                lineHeight: 1.5,
              }}
            >
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '24px',
        }}
      >
        <h4
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--bad)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>✕</span> Room for Improvement
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(cons || []).map((con, i) => (
            <li
              key={i}
              style={{
                fontSize: '0.9375rem',
                color: 'var(--ink)',
                lineHeight: 1.5,
              }}
            >
              {con}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .pros-cons-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

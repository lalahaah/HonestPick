'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/supabase/types';

type ProductWithCategory = Product & {
  category?: { slug: string; name_en: string } | null;
};

type Props = {
  products: ProductWithCategory[];
};

// design.md §3.1: 3열 그리드, 필터 탭(All/Tech/K-Beauty)
// 선택 탭: bg ink, 미선택: border outline만
export default function BestPicksGrid({ products }: Props) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'tech' | 'k-beauty'>('all');

  const filters = [
    { key: 'all' as const, label: 'All' },
    { key: 'tech' as const, label: 'Tech' },
    { key: 'k-beauty' as const, label: 'K-Beauty' },
  ];

  const filtered =
    activeFilter === 'all'
      ? products
      : products.filter(p => p.category?.slug === activeFilter);

  return (
    <section
      id="best-picks"
      style={{
        backgroundColor: 'var(--paper)',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* 헤더 + 필터 탭 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.25rem',
              fontWeight: 600,
              color: 'var(--ink)',
              lineHeight: 1.1,
            }}
          >
            This Week&apos;s Best Picks
          </h2>

          {/* 필터 탭 */}
          <div
            style={{ display: 'flex', gap: '8px' }}
            role="tablist"
            aria-label="Filter by category"
          >
            {filters.map(f => (
              <button
                key={f.key}
                role="tab"
                aria-selected={activeFilter === f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  border:
                    activeFilter === f.key
                      ? '1px solid var(--ink)'
                      : '1px solid var(--border)',
                  backgroundColor:
                    activeFilter === f.key ? 'var(--ink)' : 'transparent',
                  color:
                    activeFilter === f.key ? '#FFFFFF' : 'var(--ink-soft)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 제품 그리드 */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 24px',
              color: 'var(--ink-soft)',
              fontSize: '1rem',
            }}
          >
            No products yet in this category.
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="picks-grid"
          >
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .picks-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 639px) {
          .picks-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

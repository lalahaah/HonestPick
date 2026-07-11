import Link from 'next/link';
import RatingStars from './RatingStars';
import Badge from './Badge';
import type { Product } from '@/lib/supabase/types';

// design.md §3.1 Best Picks Grid 카드 스펙
// 위→아래: 이미지(4:3) / 카테고리배지(좌상단) / 등급배지(우상단) / 별점+가격 / 제품명 / 서브타이틀 / 장점태그

type Props = {
  product: Product & { category?: { slug: string; name_en: string } | null };
};

export default function ProductCard({ product }: Props) {
  const { slug, title_en, subtitle_en, price_usd, rating, pros, badge, category } = product;

  // 장점 태그는 최대 2개
  const proTags = (pros ?? []).slice(0, 2);

  return (
    <Link
      href={`/en/review/${slug}`}
      style={{
        display: 'block',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 1px 2px rgba(20,18,15,.04), 0 8px 24px rgba(20,18,15,.06)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
      className="product-card"
      aria-label={`Read review: ${title_en}`}
    >
      {/* 이미지 영역 (4:3) */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/3',
          backgroundColor: 'var(--paper)',
          overflow: 'hidden',
        }}
      >
        {/* 이미지 플레이스홀더 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'var(--border)',
            transition: 'transform 0.3s ease',
          }}
          className="card-img"
          aria-label={title_en}
        >
          {category?.slug === 'tech' ? '🎧' : '✨'}
        </div>

        {/* 카테고리 배지 — 좌상단 */}
        {category && (
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <Badge variant="category">{category.name_en}</Badge>
          </div>
        )}

        {/* 등급 배지 — 우상단 */}
        {badge && (
          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            <Badge variant={badge as "Editor's Pick" | 'Best Value' | 'Bestseller'}>
              {badge}
            </Badge>
          </div>
        )}
      </div>

      {/* 카드 바디 */}
      <div style={{ padding: '20px' }}>
        {/* 별점 + 가격 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          {rating != null && <RatingStars value={rating} size="sm" />}
          {price_usd != null && (
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              ${price_usd.toFixed(2)}
            </span>
          )}
        </div>

        {/* 제품명 */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.125rem',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.3,
            marginBottom: '6px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title_en}
        </h3>

        {/* 서브타이틀 */}
        {subtitle_en && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--ink-soft)',
              lineHeight: 1.4,
              marginBottom: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {subtitle_en}
          </p>
        )}

        {/* 장점 태그 2개 */}
        {proTags.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
            {proTags.map((pro, i) => {
              const words = pro.split(' ');
              const truncatedPro = words.length > 4 ? words.slice(0, 4).join(' ') + '...' : pro;
              return (
                <span
                  key={i}
                  title={pro}
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: 'var(--good)',
                    border: '1px solid var(--good)',
                    borderRadius: '9999px',
                    padding: '3px 10px',
                    lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                >
                  ✓ {truncatedPro}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .product-card:hover {
          box-shadow: 0 16px 32px rgba(20,18,15,.10) !important;
          transform: translateY(-4px) !important;
        }
        .product-card:hover .card-img {
          transform: scale(1.03);
        }
      `}</style>
    </Link>
  );
}

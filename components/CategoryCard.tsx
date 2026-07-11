import Link from 'next/link';

// design.md §3.1: 카테고리 배너 카드
// 이미지 위 그라디언트 오버레이, hover 시 화살표 애니메이션

type Props = {
  slug: string;
  name: string;
  description: string;
  /** 이모지 또는 아이콘 (이미지 없는 Phase 2 대체) */
  icon: string;
  accentColor?: string;
};

export default function CategoryCard({ slug, name, description, icon }: Props) {
  return (
    <Link
      href={`/en/category/${slug}`}
      style={{
        display: 'block',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        aspectRatio: '16/9',
        backgroundColor: 'var(--ink)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      className="category-card"
      aria-label={`Browse ${name} reviews`}
    >
      {/* 배경 — 그라디언트 플레이스홀더 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            slug === 'tech'
              ? 'linear-gradient(135deg, #1a1830 0%, #0d1117 100%)'
              : 'linear-gradient(135deg, #1a1525 0%, #0d1117 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '6rem',
          opacity: 0.15,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* 아이콘 중앙 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4rem',
        }}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* 하단 그라디언트 오버레이 + 텍스트 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(20,18,15,.85) 0%, transparent 60%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '24px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#FFFFFF',
            marginBottom: '4px',
            lineHeight: 1.2,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '12px',
            lineHeight: 1.4,
          }}
        >
          {description}
        </p>
        <span
          className="cat-arrow"
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--accent)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'gap 0.2s ease',
          }}
        >
          Browse reviews <span>→</span>
        </span>
      </div>

      <style>{`
        .category-card:hover .cat-arrow {
          gap: 8px;
        }
        .category-card:hover {
          border-color: rgba(240,83,46,0.3);
        }
      `}</style>
    </Link>
  );
}

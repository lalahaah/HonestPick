import Link from 'next/link';
import Image from 'next/image';
import heroImg from '../public/images/hero-flatlay.jpg';

// design.md §3.1 Hero 스펙 기반
// 좌측 텍스트 + 우측 이미지 플레이스홀더, 글래스모프 배지
export default function Hero() {
  return (
    <section
      style={{
        backgroundColor: 'var(--ink)',
        paddingTop: '96px', // navbar 높이 오프셋
        paddingBottom: '0',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '64px 24px 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* 좌: 텍스트 */}
        <div style={{ paddingBottom: '64px' }}>
          {/* Trust badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              padding: '6px 14px',
              borderRadius: '9999px',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}
          >
            <span aria-hidden="true">✓</span>
            INDEPENDENTLY REVIEWED, NEVER SPONSORED
          </div>

          {/* H1 — Display XL, Fraunces */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              lineHeight: 1.05,
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Reviews you can{' '}
            <span
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                padding: '2px 12px',
                borderRadius: '4px',
                transform: 'rotate(-1deg)',
                transformOrigin: 'center',
              }}
            >
              actually trust.
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '40px',
              maxWidth: '480px',
            }}
          >
            We either test products hands-on for weeks, or synthesize hundreds of verified buyer experiences — no affiliate pressure, no fake reviews. Just honest picks for smarter shopping.
          </p>

          {/* CTA */}
          <Link
            href="#best-picks"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--accent)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '14px 32px',
              borderRadius: '9999px',
              textDecoration: 'none',
              marginBottom: '48px',
              transition: 'opacity 0.15s ease',
            }}
            className="hover:opacity-85"
          >
            Explore Reviews
          </Link>

          {/* Stats — 3개, 세로 구분선 */}
          <div
            style={{
              display: 'flex',
              gap: '0',
              flexWrap: 'wrap',
            }}
          >
            {[
              { icon: '📋', value: '120+', label: 'Reviews' },
              { icon: '⭐', value: '4.7', label: 'Avg Rating' },
              { icon: '🗂️', value: '2', label: 'Core Categories' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  paddingLeft: i === 0 ? '0' : '24px',
                  paddingRight: '24px',
                  borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    lineHeight: 1.2,
                  }}
                >
                  {stat.icon} {stat.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 우: 이미지 영역 + glassmorphism 배지 */}
        <div
          style={{
            position: 'relative',
            alignSelf: 'flex-end',
          }}
          className="hero-image-col"
        >
          {/* 제품 이미지 */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: '24px 24px 0 0',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              borderBottom: 'none',
              backgroundColor: 'rgba(255,255,255,0.05)',
            }}
          >
            <Image
              src={heroImg}
              alt="Tech gadgets flatlay photography"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
              placeholder="blur"
            />
          </div>

          {/* Glassmorphism 배지 — 이미지 위 우상단 */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              backgroundColor: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 8px 24px rgba(20,18,15,0.12)',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--ink)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              Editorial trust,
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              not ad spend
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 반응형 스타일 */}
      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-image-col {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

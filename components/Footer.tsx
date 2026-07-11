import Link from 'next/link';

// design.md §3.1: 4컬럼 푸터, FTC 고지 별도 바
// FTC 문구는 어떤 경우에도 삭제/축소 금지 (AGENTS.md §6)
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* FTC 고지 바 — 별도 강조 (design.md 요건) */}
      <div
        style={{
          backgroundColor: 'var(--paper)',
          borderTop: '1px solid var(--border)',
          padding: '16px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--ink-soft)',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: 'var(--ink)' }}>Disclosure:</strong>{' '}
          As an Amazon Associate, HonestPick earns from qualifying purchases.
          Product prices and availability are accurate as of the date/time indicated
          and are subject to change.
        </p>
      </div>

      {/* 메인 푸터 */}
      <div
        style={{
          backgroundColor: 'var(--ink)',
          padding: '64px 24px 40px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
          }}
          className="footer-grid"
        >
          {/* 브랜드 컬럼 */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '12px',
              }}
            >
              HonestPick
            </div>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7,
                maxWidth: '240px',
              }}
            >
              Honest reviews. Real testing. No fluff.
              We buy every product we review — no gifted samples, no sponsor money.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '16px',
              }}
            >
              Categories
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/en/category/tech', label: 'Tech & Gadgets' },
                { href: '/en/category/k-beauty', label: 'K-Beauty' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FFFFFF')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '16px',
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/en/about', label: 'About Us' },
                { href: '/en/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FFFFFF')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '16px',
              }}
            >
              Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/en/privacy', label: 'Privacy Policy' },
                { href: '/en/terms', label: 'Terms of Service' },
                { href: '/en/disclosure', label: 'FTC Disclosure' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                    }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = '#FFFFFF')}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '48px auto 0',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
            © {currentYear} HonestPick. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
            Made with ☕ and 2+ weeks of testing.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}

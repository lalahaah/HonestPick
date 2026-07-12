// Server Component — How We Pick 3단계
// design.md §3.1: 점선 커넥터, 아이콘은 accent-soft 원형 배경

const steps = [
  {
    number: '01',
    icon: '🛒',
    title: 'We Buy It',
    description:
      'Every product is purchased at full retail price — no gifted samples, no brand relationships.',
  },
  {
    number: '02',
    icon: '🔬',
    title: 'We Test & Research',
    description:
      'We either test products hands-on for weeks, or synthesize hundreds of verified buyer experiences and manufacturer data.',
  },
  {
    number: '03',
    icon: '✍️',
    title: 'We Write Honestly',
    description:
      "Pros, cons, and verdict — including the parts brands wouldn't want you to know.",
  },
];

export default function ProcessSteps() {
  return (
    <section
      style={{
        backgroundColor: 'var(--paper)',
        padding: '96px 24px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* 섹션 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.25rem',
              fontWeight: 600,
              color: 'var(--ink)',
              lineHeight: 1.1,
              marginBottom: '12px',
            }}
          >
            How We Pick
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--ink-soft)', maxWidth: '480px', margin: '0 auto' }}>
            No press samples, no sponsor money. Just products we bought and tested ourselves.
          </p>
        </div>

        {/* 3단계 카드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
            position: 'relative',
          }}
          className="process-grid"
        >
          {steps.map((step, idx) => (
            <div
              key={step.number}
              style={{
                position: 'relative',
                padding: '40px 32px',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius:
                  idx === 0 ? '16px 0 0 16px' : idx === 2 ? '0 16px 16px 0' : '0',
                borderLeft: idx > 0 ? 'none' : '1px solid var(--border)',
                textAlign: 'center',
              }}
            >
              {/* 커넥터 화살표 — 마지막 제외 */}
              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-18px',
                    transform: 'translateY(-50%)',
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderLeft: 'none',
                    borderBottom: 'none',
                    borderRadius: '0 8px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    color: 'var(--accent)',
                    zIndex: 1,
                  }}
                >
                  →
                </div>
              )}

              {/* 아이콘 */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  margin: '0 auto 20px',
                }}
                aria-hidden="true"
              >
                {step.icon}
              </div>

              {/* 번호 */}
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'var(--accent)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}
              >
                {step.number}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: '12px',
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--ink-soft)',
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
          .process-grid > div {
            border-radius: 0 !important;
            border-left: 1px solid var(--border) !important;
          }
          .process-grid > div:first-child { border-radius: 16px 16px 0 0 !important; }
          .process-grid > div:last-child  { border-radius: 0 0 16px 16px !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
          .process-grid > div {
            border-radius: 0 !important;
            border-left: 1px solid var(--border) !important;
          }
          .process-grid > div:first-child { border-radius: 16px 16px 0 0 !important; }
          .process-grid > div:last-child  { border-radius: 0 0 16px 16px !important; }
        }
      `}</style>
    </section>
  );
}


// design.md §3.1: 무한 마퀴, 좌우 mask-image 페이드, hover 시 정지
export default function CategoryTicker() {
  const items = [
    'Noise-Canceling Headphones',
    'USB-C Chargers',
    'K-Beauty Essences',
    'Wireless Earbuds',
    'Skincare Toners',
    'Laptop Stands',
    'Sheet Masks',
    'Power Banks',
    'Serums & Actives',
    'Smart Cables',
  ];

  // 무한 스크롤을 위해 아이템 3번 반복
  const repeated = [...items, ...items, ...items];

  return (
    <div
      style={{
        backgroundColor: 'var(--ink)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        padding: '14px 0',
      }}
      aria-hidden="true" // 장식용, 스크린리더 무시
    >
      <div
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          overflow: 'hidden',
        }}
      >
        <div
          className="ticker-track"
          style={{
            display: 'flex',
            gap: '0',
            width: 'max-content',
          }}
        >
          {repeated.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '16px',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                padding: '0 32px',
              }}
            >
              {item}
              <span style={{ color: 'var(--accent)', fontSize: '0.5rem' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-track {
          animation: ticker 30s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

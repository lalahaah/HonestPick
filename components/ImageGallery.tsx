// design.md §3.3: 메인 이미지 + 하단 썸네일 4개
export default function ImageGallery({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {/* 메인 이미지 플레이스홀더 */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4/3',
          backgroundColor: 'var(--border)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4rem',
          color: 'rgba(0,0,0,0.1)',
          marginBottom: '16px',
        }}
        role="img"
        aria-label={`${title} main image`}
      >
        📸
      </div>

      {/* 썸네일 그리드 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              aspectRatio: '1',
              backgroundColor: 'var(--border)',
              borderRadius: '8px',
              opacity: i === 1 ? 1 : 0.6,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            className="hover:opacity-100"
            role="img"
            aria-label={`${title} thumbnail ${i}`}
          />
        ))}
      </div>
    </div>
  );
}

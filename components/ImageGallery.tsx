import Image from 'next/image';

// design.md §3.3: 메인 이미지 + 하단 썸네일 4개
export default function ImageGallery({ title, image_urls }: { title: string; image_urls?: string[] | null }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {/* 메인 이미지 플레이스홀더 또는 실제 이미지 */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
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
        role={image_urls?.[0] ? undefined : "img"}
        aria-label={image_urls?.[0] ? undefined : `${title} main image`}
      >
        {image_urls && image_urls[0] ? (
          <Image src={image_urls[0]} fill alt={`${title} main image`} style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
        ) : (
          '📸'
        )}
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
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '1',
              backgroundColor: 'var(--border)',
              borderRadius: '8px',
              opacity: i === 1 ? 1 : 0.6,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            className="hover:opacity-100"
            role={image_urls?.[i] ? undefined : "img"}
            aria-label={image_urls?.[i] ? undefined : `${title} thumbnail ${i}`}
          >
            {image_urls && image_urls[i] ? (
              <Image src={image_urls[i]} fill alt={`${title} thumbnail ${i}`} style={{ objectFit: 'cover' }} sizes="25vw" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

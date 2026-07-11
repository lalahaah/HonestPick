// Server Component — 별점 표시 (순수 표시용, 상태 없음)
// design.md §2: --star 색상 사용

type Props = {
  value: number; // 0~5
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
};

export default function RatingStars({ value, size = 'sm', showValue = true }: Props) {
  const sizes = { sm: 14, md: 18, lg: 24 };
  const px = sizes[size];
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
      aria-label={`Rating: ${value} out of 5`}
      role="img"
    >
      <span style={{ display: 'flex', gap: '1px' }} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const isHalf = !filled && i === full && half;
          return (
            <svg
              key={i}
              width={px}
              height={px}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isHalf ? (
                <>
                  <defs>
                    <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="50%" stopColor="var(--star)" />
                      <stop offset="50%" stopColor="var(--border)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M10 1.5l2.39 4.84 5.35.78-3.87 3.77.91 5.32L10 13.77 5.22 16.21l.91-5.32L2.26 7.12l5.35-.78L10 1.5z"
                    fill={`url(#half-${i})`}
                  />
                </>
              ) : (
                <path
                  d="M10 1.5l2.39 4.84 5.35.78-3.87 3.77.91 5.32L10 13.77 5.22 16.21l.91-5.32L2.26 7.12l5.35-.78L10 1.5z"
                  fill={filled ? 'var(--star)' : 'var(--border)'}
                />
              )}
            </svg>
          );
        })}
      </span>
      {showValue && (
        <span
          style={{
            fontSize: size === 'lg' ? '1rem' : '0.75rem',
            fontWeight: 600,
            color: 'var(--ink)',
            marginLeft: '2px',
          }}
        >
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}

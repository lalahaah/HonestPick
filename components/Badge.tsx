// Server Component — 제품 등급 배지
// design.md §2: full pill, accent-soft 배경

type BadgeVariant = "Editor's Pick" | 'Best Value' | 'Bestseller' | 'category' | 'hands-on' | 'researched';

type Props = {
  variant: BadgeVariant;
  children?: React.ReactNode;
  /** 이미지 위에 올릴 때 glassmorphism 적용 여부 */
  glass?: boolean;
};

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  "Editor's Pick": {
    backgroundColor: 'var(--accent-soft)',
    color: 'var(--accent)',
  },
  'Best Value': {
    backgroundColor: '#E8F5EE',
    color: 'var(--good)',
  },
  Bestseller: {
    backgroundColor: '#FFF7E0',
    color: '#B45309',
  },
  category: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    color: 'var(--ink)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  'hands-on': {
    backgroundColor: 'var(--accent-soft)',
    color: 'var(--accent)',
  },
  'researched': {
    backgroundColor: 'var(--border)',
    color: 'var(--ink-soft)',
  },
};

export default function Badge({ variant, children, glass = false }: Props) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    padding: '4px 10px',
    borderRadius: '9999px',
    whiteSpace: 'nowrap',
    lineHeight: 1.4,
    ...variantStyles[variant],
    ...(glass
      ? {
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.85)',
        }
      : {}),
  };

  return <span style={base}>{children ?? variant}</span>;
}

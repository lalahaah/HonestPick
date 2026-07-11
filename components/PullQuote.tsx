import RatingStars from './RatingStars';

type Props = {
  quote: string;
  rating: number;
};

export default function PullQuote({ quote, rating }: Props) {
  return (
    <blockquote
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: '0 16px 16px 0',
        padding: '32px',
        margin: '48px 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-16px',
          left: '24px',
          backgroundColor: 'var(--paper)',
          color: 'var(--accent)',
          fontSize: '2.5rem',
          lineHeight: 1,
          fontFamily: 'var(--font-display)',
          padding: '0 8px',
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          lineHeight: 1.4,
          color: 'var(--ink)',
          marginBottom: '16px',
          marginTop: '8px',
        }}
      >
        {quote}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <RatingStars value={rating} size="md" />
        <span
          style={{
            fontSize: '0.875rem',
            color: 'var(--ink-soft)',
            fontWeight: 500,
          }}
        >
          HonestPick Verdict
        </span>
      </div>
    </blockquote>
  );
}

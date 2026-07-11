import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--paper)',
            color: 'var(--ink)',
            padding: '24px',
            fontFamily: 'var(--font-body)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '4rem',
                fontWeight: 600,
                color: 'var(--accent)',
                marginBottom: '16px',
              }}
            >
              404
            </h1>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 500,
                marginBottom: '24px',
              }}
            >
              Review Not Found
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--ink-soft)',
                marginBottom: '32px',
                maxWidth: '400px',
                margin: '0 auto 32px',
                lineHeight: 1.6,
              }}
            >
              We haven&apos;t written a review for this product yet, or the link is broken.
            </p>
            <Link
              href="/en"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: '9999px',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              className="hover:opacity-85"
            >
              Return Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

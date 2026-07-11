'use client';

import { useState, type FormEvent } from 'react';

// design.md §3.1: ink 배경, 우상단 accent 블롭, "No spam" 마이크로카피
export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage_footer' }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || "✓ You're in! Check your inbox for a confirmation.");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong.');
    }
  }

  return (
    <section
      style={{
        backgroundColor: 'var(--ink)',
        padding: '96px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 우상단 accent 블롭 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(240,83,46,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Get Honest Picks in Your Inbox
        </h2>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '32px',
          }}
        >
          New reviews every week.
        </p>

        {status === 'success' ? (
          <div
            role="status"
            style={{
              backgroundColor: 'rgba(30,122,76,0.15)',
              border: '1px solid rgba(30,122,76,0.4)',
              borderRadius: '12px',
              padding: '20px',
              color: '#6EE7A8',
              fontSize: '0.9375rem',
            }}
          >
            {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: '8px', maxWidth: '440px', margin: '0 auto' }}
          >
            <label htmlFor="newsletter-email" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === 'loading'}
              style={{
                flex: 1,
                height: '48px',
                padding: '0 16px',
                borderRadius: '9999px',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#FFFFFF',
                fontSize: '0.9375rem',
                outline: 'none',
                transition: 'border-color 0.15s ease',
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                height: '48px',
                padding: '0 24px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.9375rem',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'opacity 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p role="alert" style={{ color: '#FC8181', fontSize: '0.875rem', marginTop: '8px' }}>
            {message}
          </p>
        )}

        <p
          style={{
            fontSize: '0.8125rem',
            color: 'rgba(255,255,255,0.35)',
            marginTop: '12px',
          }}
        >
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

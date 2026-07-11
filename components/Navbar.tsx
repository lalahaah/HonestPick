'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// design.md §3.1: 검은 배경 고정 네비, 스크롤 시 border-bottom + backdrop-blur
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'var(--ink)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'border-color 0.2s ease, backdrop-filter 0.2s ease',
      }}
    >
      <nav
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        aria-label="Main navigation"
      >
        {/* 로고 */}
        <Link
          href="/en"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#FFFFFF',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
          aria-label="HonestPick home"
        >
          HonestPick
        </Link>

        {/* 우측 네비 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            href="/en/category/tech"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '9999px',
              transition: 'color 0.15s ease',
            }}
            className="text-white/70 hover:text-white"
          >
            Tech
          </Link>
          <Link
            href="/en/category/k-beauty"
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '9999px',
              transition: 'color 0.15s ease',
            }}
            className="text-white/70 hover:text-white"
          >
            K-Beauty
          </Link>
          {/* CTA 버튼 */}
          <Link
            href="#best-picks"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              padding: '8px 20px',
              borderRadius: '9999px',
              transition: 'opacity 0.15s ease',
            }}
            className="hover:opacity-85"
          >
            See This Week&apos;s Picks
          </Link>
        </div>
      </nav>
    </header>
  );
}

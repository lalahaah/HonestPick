'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGallery({ title, image_urls }: { title: string; image_urls?: string[] | null }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = image_urls?.filter(Boolean) ?? [];
  const currentImage = images[selectedIndex];

  return (
    <div style={{ marginBottom: '48px' }}>
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
        role={currentImage ? undefined : 'img'}
        aria-label={currentImage ? undefined : `${title} main image`}
      >
        {currentImage ? (
          <Image
            key={currentImage}
            src={currentImage}
            fill
            alt={`${title} image ${selectedIndex + 1}`}
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          '📸'
        )}
      </div>

      {images.length > 1 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          {images.map((url, i) => (
            <button
              key={url}
              onClick={() => setSelectedIndex(i)}
              aria-label={`View ${title} image ${i + 1}`}
              aria-pressed={selectedIndex === i}
              style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: '1',
                backgroundColor: 'var(--border)',
                borderRadius: '8px',
                opacity: selectedIndex === i ? 1 : 0.6,
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                border: 'none',
                padding: 0,
              }}
              className="hover:opacity-100"
            >
              <Image src={url} fill alt={`${title} thumbnail ${i + 1}`} style={{ objectFit: 'cover' }} sizes="25vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

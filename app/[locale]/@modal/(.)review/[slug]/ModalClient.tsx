'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ModalClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 768px 미만이면 풀페이지로 이동 (모달 닫고 리디렉션)
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        window.location.reload(); // 강제로 풀페이지(인터셉트 해제)로 이동
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      document.body.style.overflow = 'hidden';
    }
  }, [isMobile]);

  function close() {
    document.body.style.overflow = '';
    dialogRef.current?.close();
    router.back();
  }

  if (isMobile) return null; // 모바일이면 새로고침되므로 렌더링 안함

  return (
    <dialog
      ref={dialogRef}
      onClose={close}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      style={{
        padding: 0,
        margin: 'auto',
        maxWidth: '960px',
        width: '100%',
        maxHeight: '90vh',
        border: 'none',
        borderRadius: '24px',
        backgroundColor: 'var(--paper)',
        boxShadow: '0 24px 64px rgba(20,18,15,0.4)',
        outline: 'none',
      }}
    >
      <div style={{ position: 'relative', padding: '48px', overflowY: 'auto', maxHeight: '90vh' }}>
        <button
          onClick={close}
          aria-label="Close review"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'rgba(20,18,15,0.05)',
            color: 'var(--ink)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            transition: 'background-color 0.2s',
          }}
          className="hover:bg-ink hover:text-white"
        >
          ✕
        </button>
        {children}
      </div>
      <style>{`
        dialog::backdrop {
          background: rgba(20, 18, 15, 0.6);
          backdrop-filter: blur(8px);
        }
      `}</style>
    </dialog>
  );
}

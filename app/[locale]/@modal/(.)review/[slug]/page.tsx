import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/queries';
import ModalClient from './ModalClient';
import Badge from '@/components/Badge';
import BuyBox from '@/components/BuyBox';
import ImageGallery from '@/components/ImageGallery';
import PullQuote from '@/components/PullQuote';
import ProsConsCard from '@/components/ProsConsCard';
import ReactMarkdown from 'react-markdown';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ReviewModal({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <ModalClient>
      <div className="review-modal-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>
        {/* Left Content */}
        <div style={{ paddingRight: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            {product.category && <Badge variant="category">{product.category.name_en}</Badge>}
            {product.badge && <span style={{ marginLeft: '8px' }}><Badge variant={product.badge as any}>{product.badge}</Badge></span>}
          </div>
          
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: '16px' }}>
            {product.title_en}
          </h2>
          
          <ImageGallery title={product.title_en} />
          
          <PullQuote quote={product.subtitle_en || "Great pick."} rating={product.rating || 5} />
          
          <div className="review-body" style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--ink)', marginBottom: '32px' }}>
            <ReactMarkdown>
              {product.body_en || ""}
            </ReactMarkdown>
          </div>
          
          <style>{`
            .review-body p { margin-bottom: 16px; }
            .review-body h2, .review-body h3 { font-family: var(--font-display); margin: 32px 0 16px; font-weight: 600; color: var(--ink); }
            .review-body h2 { font-size: 1.5rem; }
            .review-body h3 { font-size: 1.25rem; }
            .review-body ul { margin-bottom: 16px; padding-left: 24px; list-style-type: disc; }
            .review-body li { margin-bottom: 8px; }
          `}</style>

          <ProsConsCard pros={product.pros || []} cons={product.cons || []} />
        </div>
        
        {/* Right BuyBox */}
        <div>
          <BuyBox product={product} />
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .review-modal-layout { display: block !important; }
        }
      `}</style>
    </ModalClient>
  );
}

import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/queries';
import ModalClient from './ModalClient';
import Badge from '@/components/Badge';
import BuyBox from '@/components/BuyBox';
import ImageGallery from '@/components/ImageGallery';
import PullQuote from '@/components/PullQuote';
import ProsConsCard from '@/components/ProsConsCard';

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

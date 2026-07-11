import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllProductSlugs, getProductBySlug, getRelatedProducts } from '@/lib/queries';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Badge from '@/components/Badge';
import BuyBox from '@/components/BuyBox';
import ImageGallery from '@/components/ImageGallery';
import PullQuote from '@/components/PullQuote';
import ProsConsCard from '@/components/ProsConsCard';
import ProductCard from '@/components/ProductCard';
import ReactMarkdown from 'react-markdown';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map(slug => ({ slug, locale: 'en' }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.title_en} Review`,
    description: product.subtitle_en || `Honest review of ${product.title_en}.`,
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = product.category_id 
    ? await getRelatedProducts(product.category_id, slug, 4)
    : [];

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'var(--paper)', minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* 브레드크럼 */}
          <nav style={{ marginBottom: '24px', fontSize: '0.875rem', color: 'var(--ink-soft)' }}>
            <Link href="/en" className="hover:text-ink transition-colors" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            {product.category && (
              <>
                <Link href={`/en/category/${product.category.slug}`} className="hover:text-ink transition-colors" style={{ color: 'inherit', textDecoration: 'none' }}>
                  {product.category.name_en}
                </Link>
                <span style={{ margin: '0 8px' }}>/</span>
              </>
            )}
            <span style={{ color: 'var(--ink)' }}>Review</span>
          </nav>

          {/* 2-column 레이아웃 */}
          <div className="review-layout" style={{ display: 'grid', gridTemplateColumns: '62% 38%', gap: '48px', alignItems: 'start' }}>
            
            {/* 좌측 콘텐츠 */}
            <article>
              <div style={{ marginBottom: '24px' }}>
                {product.category && <Badge variant="category">{product.category.name_en}</Badge>}
                {product.badge && <span style={{ marginLeft: '8px' }}><Badge variant={product.badge as any}>{product.badge}</Badge></span>}
              </div>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: '16px' }}>
                {product.title_en}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)', backgroundColor: 'var(--accent-soft)', padding: '4px 12px', borderRadius: '9999px' }}>
                  Tested for 2+ weeks
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--ink-soft)' }}>
                  By HonestPick Editorial
                </span>
              </div>

              <ImageGallery title={product.title_en} />

              <PullQuote quote={product.subtitle_en || "An excellent choice."} rating={product.rating || 5} />

              <div className="review-body" style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--ink)', marginBottom: '48px' }}>
                <ReactMarkdown>
                  {product.body_en || ""}
                </ReactMarkdown>
              </div>

              <style>{`
                .review-body p { margin-bottom: 16px; }
                .review-body h2, .review-body h3 { font-family: var(--font-display); margin: 32px 0 16px; font-weight: 600; color: var(--ink); }
                .review-body h2 { font-size: 1.75rem; }
                .review-body h3 { font-size: 1.25rem; }
                .review-body ul { margin-bottom: 16px; padding-left: 24px; list-style-type: disc; }
                .review-body li { margin-bottom: 8px; }
              `}</style>

              <ProsConsCard pros={product.pros || []} cons={product.cons || []} />

            </article>

            {/* 우측 BuyBox */}
            <aside>
              <BuyBox product={product} />
            </aside>
          </div>

          {/* 하단 Related Products */}
          {relatedProducts.length > 0 && (
            <section style={{ marginTop: '96px', paddingTop: '48px', borderTop: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>
                Related Products
              </h2>
              <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p as any} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 1023px) {
          .review-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
          aside { order: -1; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

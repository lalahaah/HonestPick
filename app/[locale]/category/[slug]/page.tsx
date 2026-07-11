import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProducts } from '@/lib/queries';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name_en} Reviews`,
    description: `Honest, hands-on reviews of the best ${category.name_en}.`,
    openGraph: {
      title: `${category.name_en} Reviews | HonestPick`,
      description: `Honest, hands-on reviews of the best ${category.name_en}.`,
      url: `https://honestpickhq.com/en/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort = 'newest' } = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  // Parse sort option
  let orderBy: 'rating' | 'price_usd' | 'created_at' = 'created_at';
  let ascending = false;

  if (sort === 'highest-rated') {
    orderBy = 'rating';
    ascending = false;
  } else if (sort === 'price-low-to-high') {
    orderBy = 'price_usd';
    ascending = true;
  }

  const products = await getProducts({
    categorySlug: slug,
    orderBy,
    ascending,
  });

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          {/* 브레드크럼 */}
          <nav style={{ marginBottom: '24px', fontSize: '0.875rem', color: 'var(--ink-soft)' }}>
            <Link href="/en" className="hover:text-ink transition-colors" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{category.name_en}</span>
          </nav>

          {/* 타이틀 및 정렬 컨트롤 */}
          <div className="cat-header" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: '48px' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '8px' }}>
                {category.name_en}
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--ink-soft)' }}>
                {products.length} products tested and reviewed.
              </p>
            </div>

            {/* 정렬 컨트롤 (링크로 구현) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--ink-soft)' }} className="hide-mobile">Sort by:</span>
              <div className="sort-controls" style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '9999px', padding: '4px', overflowX: 'auto' }}>
                {[
                  { value: 'newest', label: 'Newest' },
                  { value: 'highest-rated', label: 'Highest Rated' },
                  { value: 'price-low-to-high', label: 'Price: Low to High' }
                ].map(opt => (
                  <Link
                    key={opt.value}
                    href={`/en/category/${slug}?sort=${opt.value}`}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      color: sort === opt.value ? 'var(--accent)' : 'var(--ink)',
                      backgroundColor: sort === opt.value ? 'var(--accent-soft)' : 'transparent',
                      fontWeight: sort === opt.value ? 600 : 500,
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                    className="hover:bg-accent-soft/50"
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid (3 -> 2 -> 1) */}
          <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--ink-soft)' }}>
              No products found in this category.
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 1023px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 639px) {
          .cat-grid { grid-template-columns: 1fr !important; }
          .cat-header { flex-direction: column; align-items: flex-start !important; }
          .hide-mobile { display: none; }
          .sort-controls { width: 100%; justify-content: flex-start; }
        }
      `}</style>
    </>
  );
}

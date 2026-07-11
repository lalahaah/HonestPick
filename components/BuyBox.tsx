import RatingStars from './RatingStars';
import type { Product } from '@/lib/supabase/types';

type Props = {
  product: Product;
};

export default function BuyBox({ product }: Props) {
  const { id, price_usd, rating, pros } = product;

  // 장점 3개
  const topPros = (pros || []).slice(0, 3);

  return (
    <div className="buy-box-wrapper">
      <div className="buy-box-inner">
        <div className="buy-box-header">
          {price_usd != null && (
            <div className="buy-box-price">${price_usd.toFixed(2)}</div>
          )}
          {rating != null && (
            <div className="buy-box-rating">
              <RatingStars value={rating} size="sm" />
            </div>
          )}
        </div>

        <a
          href={`/api/click/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="buy-box-cta hover:opacity-85"
        >
          Check Price on Amazon
        </a>

        <p className="buy-box-ftc">
          Price as of today. As an Amazon Associate we earn from qualifying purchases.
        </p>

        {topPros.length > 0 && (
          <ul className="buy-box-pros">
            {topPros.map((pro, i) => (
              <li key={i}>
                <span className="pro-icon">✓</span> {pro}
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        /* Desktop Default */
        .buy-box-wrapper {
          position: sticky;
          top: 96px;
        }
        .buy-box-inner {
          background-color: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(20,18,15,0.05);
        }
        .buy-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .buy-box-price {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 600;
          color: var(--ink);
          line-height: 1;
        }
        .buy-box-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--accent);
          color: #FFFFFF;
          font-weight: 600;
          font-size: 1.125rem;
          height: 56px;
          border-radius: 9999px;
          text-decoration: none;
          margin-bottom: 12px;
          transition: opacity 0.2s ease;
        }
        .buy-box-ftc {
          font-size: 0.75rem;
          color: var(--ink-soft);
          line-height: 1.4;
          text-align: center;
          margin-bottom: 24px;
        }
        .buy-box-pros {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }
        .buy-box-pros li {
          font-size: 0.875rem;
          color: var(--ink);
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.4;
        }
        .pro-icon {
          color: var(--good);
          font-weight: 700;
        }

        /* Mobile overrides (<768px) */
        @media (max-width: 767px) {
          .buy-box-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 50;
          }
          .buy-box-inner {
            border-radius: 24px 24px 0 0;
            border-bottom: none;
            padding: 16px 24px;
            box-shadow: 0 -4px 24px rgba(20,18,15,0.08);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }
          .buy-box-header {
            margin-bottom: 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .buy-box-price {
            font-size: 1.5rem;
          }
          .buy-box-cta {
            flex: 1;
            margin-bottom: 0;
            height: 48px;
            font-size: 1rem;
          }
          .buy-box-ftc, .buy-box-pros {
            display: none; /* Hide on mobile to save space */
          }
        }
      `}</style>
    </div>
  );
}

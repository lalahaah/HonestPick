INSERT INTO products (
  slug, category_id, title_en, subtitle_en, one_liner_en, price_usd, rating,
  image_urls, pros, cons, amazon_asin, amazon_tag, badge,
  review_type, tested_duration, research_basis, body_en
) VALUES (
  'biodance-bio-collagen-real-deep-mask',
  (SELECT id FROM categories WHERE slug = 'k-beauty'),
  'Biodance Bio-Collagen Real Deep Mask',
  'The Ultimate Secret to Korean Glass Skin?',
  'A revolutionary hydrogel sheet that transforms from solid white to completely transparent overnight.',
  19.00, 
  4.5,
  ARRAY[]::text[],
  ARRAY[
    'Visual proof of absorption as the mask turns transparent',
    'Optimized for overnight wear without drying out the skin',
    'Ultra-low molecular collagen (243Da) penetrates much deeper',
    'Hypoallergenic & clean formula safe for sensitive skin'
  ],
  ARRAY[
    'Requires at least 3 to 4 hours to absorb (not for rushed mornings)',
    'Initial slippage for the first 10-15 minutes until it adheres'
  ],
  'B0TEST0006',
  'honestpick-20', 
  'Bestseller',
  'researched', 
  NULL, 
  'Based on official clinical data and over 15,000 verified buyer ratings',
  '## TL;DR
Based on official clinical data and over 15,000 verified buyer ratings, the Biodance Collagen Mask stands out by solidifying 34 grams of high-concentration collagen ampoule into a hydrogel sheet, rather than using messy liquid essence. Designed to react to skin temperature, the mask gradually becomes transparent as the active ingredients absorb. Used as an overnight sleeping mask, it provides unparalleled hydration, visibly tightens enlarged pores, and delivers an instant glass-like radiance by morning.

## Performance Analysis
According to clinical data and user feedback, it targets three core pillars of aging skin:
- **Pore Care**: Instantly reduces pore volume, area, and depth. 94% of users reported tighter-looking pores.
- **Hydration**: Increases moisture levels by up to 204.2%, with 97% noting deep, long-lasting hydration.
- **Elasticity**: Promotes an immediate improvement in sagging skin, with 92% of users noticing firmer, bouncy skin texture.

## The Catch
It takes at least 3 to 4 hours (and up to 8 hours depending on skin condition) for the sheet to turn fully transparent, making it impractical for a rushed morning routine. Additionally, for the first 10 to 15 minutes after application, the heavy hydrogel sheet may slide down slightly. It is best to apply the mask while lying down until it adheres firmly.

## Verdict
While it requires a time commitment of at least 3 to 4 hours to fully absorb, it delivers a powerful, professional-grade spa experience at home. It is undeniably one of the most reliable shortcuts to achieving the signature Korean "Glass Skin" look.'
);

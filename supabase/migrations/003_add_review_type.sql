-- 003_add_review_type.sql
-- Add review methodology split columns and seed initial data

alter table products
  add column if not exists review_type text not null default 'researched'
    check (review_type in ('hands_on', 'researched')),
  add column if not exists tested_duration text,
  add column if not exists research_basis text;

-- Update existing seeds (they were all hands_on)
UPDATE products SET review_type = 'hands_on', tested_duration = '3 weeks' 
  WHERE slug = 'sony-wh1000xm5-anc-headphones';
UPDATE products SET review_type = 'hands_on', tested_duration = '2 months' 
  WHERE slug = 'baseus-100w-usbc-cable';
UPDATE products SET review_type = 'hands_on', tested_duration = '4 weeks' 
  WHERE slug = 'anker-737-gan-charger-140w';
UPDATE products SET review_type = 'hands_on', tested_duration = '6 weeks' 
  WHERE slug = 'cosrx-snail-mucin-96-essence';
UPDATE products SET review_type = 'hands_on', tested_duration = '30 days' 
  WHERE slug = 'some-by-mi-aha-bha-pha-toner';

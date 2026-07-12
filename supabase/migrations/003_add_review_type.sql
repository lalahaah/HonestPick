-- 003_add_review_type.sql
-- Add review methodology split columns and seed initial data

alter table products
  add column if not exists review_type text not null default 'researched'
    check (review_type in ('hands_on', 'researched')),
  add column if not exists tested_duration text,
  add column if not exists research_basis text;

-- Update existing seeds (they were all hands_on)
update products
set review_type = 'hands_on',
    tested_duration = substring(body_en from 'Tested for ([0-9]+ [a-zA-Z]+)')
where review_type = 'researched' or tested_duration is null;

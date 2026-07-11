-- HonestPick — Initial Schema Migration
-- architecture_research.md §3 스키마를 그대로 적용
-- 실행: Supabase Dashboard SQL Editor 또는 supabase db push

-- ============================================================
-- 카테고리
-- ============================================================
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,          -- 'headphones', 'skincare'
  name_en text not null,
  description_en text,
  created_at timestamptz default now()
);

-- 기본 카테고리 시드
insert into categories (slug, name_en, description_en) values
  ('tech', 'Tech & Gadgets', 'Headphones, cables, chargers — tested for real-world use'),
  ('k-beauty', 'K-Beauty', 'Skincare that actually works, not just hype')
on conflict (slug) do nothing;

-- ============================================================
-- 제품 리뷰 (핵심 테이블)
-- ============================================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,          -- 'noise-cancelling-headphones'
  category_id uuid references categories(id) on delete set null,
  title_en text not null,
  subtitle_en text,
  one_liner_en text,                  -- 모달의 "한줄평"
  price_usd numeric(10, 2),
  rating numeric(2,1) check (rating >= 0 and rating <= 5),
  image_urls text[],
  pros text[],
  cons text[],
  body_en text,                       -- 본문 리뷰 (Markdown)
  amazon_asin text not null,
  amazon_tag text not null,           -- Associates 태그
  badge text check (badge in ('Editor''s Pick', 'Best Value', 'Bestseller', null)),
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- updated_at 자동 갱신 트리거
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger products_updated_at
  before update on products
  for each row
  execute function update_updated_at();

-- ============================================================
-- 클릭 추적 (전환 데이터 확보 → 수익화 최적화의 핵심)
-- ============================================================
create table if not exists clicks (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  clicked_at timestamptz default now(),
  referrer text,
  session_id text,
  country text
);

-- 클릭 조회 성능용 인덱스
create index if not exists clicks_product_id_idx on clicks(product_id);
create index if not exists clicks_clicked_at_idx on clicks(clicked_at desc);

-- ============================================================
-- 이메일 구독자
-- ============================================================
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now(),
  source text                         -- 'homepage_footer', 'exit_intent' 등
);

-- ============================================================
-- Row Level Security (RLS) 설정
-- 클라이언트에서 직접 DB 접근 시 보안을 위해 RLS 활성화
-- 서버(service_role)는 RLS 무시 — /lib/supabase/server.ts에서만 사용
-- ============================================================

alter table categories enable row level security;
alter table products enable row level security;
alter table clicks enable row level security;
alter table subscribers enable row level security;

-- 공개 읽기 정책 (categories, products): 누구나 조회 가능
create policy "Public read categories" on categories
  for select using (true);

create policy "Public read products" on products
  for select using (true);

-- clicks: 서버(service_role)만 insert 가능 (클라이언트 직접 접근 차단)
-- 클라이언트 번들에 service_role 키 노출 금지 — /lib/supabase/server.ts 참고

-- subscribers: 서버(service_role)만 insert 가능
-- 이메일은 PII이므로 클라이언트 번들에서 직접 접근 차단

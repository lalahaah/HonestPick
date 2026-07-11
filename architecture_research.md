# architecture_research.md
## HonestPick (가칭) — 미국向 아마존 어필리에이트 리뷰 플랫폼

작성일: 2026-07-11 · Step 1 (Research) 산출물 · 이 문서가 이후 개발의 Source of Truth

---

## 0. 비즈니스 재정의 (Pivot Summary)

| 항목 | 기존 (Hostinger 프로토타입) | 신규 (확정) |
|---|---|---|
| 타겟 | 한국 국내 | 미국 중심 영어권 |
| 언어 | 한국어 | 영어 (i18n 구조는 확장 대비) |
| 브랜드 | 픽앤리뷰 | **HonestPick** |
| 도메인 | 미정 | **honestpickhq.com** ($11.25/yr, 구매 가능 확인 완료) |
| 수익모델 | Amazon Associates (KR 트래픽) | Amazon Associates **US** (동일 구조, 태그만 US 발급) |
| 첫 고객 | — | Google에서 "best [product] 2026", "[product] review reddit" 검색하는 구매 직전 미국 소비자 |

브랜드명은 기존 컨셉("광고비 대신 신뢰")을 그대로 계승 — Honest = 광고가 아닌 실사용 기반 정직한 리뷰. 도메인 실사용 가능 확인됨. 다른 이름 원하면 즉시 교체 가능하나, 구조 설계엔 영향 없음.

---

## 1. 기술 스택 (가성비 + 확장성 기준)

| 레이어 | 선택 | 이유 |
|---|---|---|
| Frontend | **Next.js 15 (App Router)** | 리뷰 페이지 SSG/ISR로 사전 렌더링 → 미국 SEO 핵심. 서버 컴포넌트로 번들 최소화 |
| 배포 | **Vercel Pro ($20/월)** | Hobby 플랜은 2026년 기준 **비상업 프로젝트 전용** — 수익 창출 사이트는 Pro 필수. 미국 엣지 리전 기본 제공으로 타겟 지역 레이턴시 유리 |
| 스타일 | Tailwind CSS | 스크린샷 톤앤매너(미니멀 블랙/오렌지) 그대로 이식 가능 |
| DB | **Supabase (Postgres)** | 무료 티어로 시작, 클릭 추적/구독자 데이터 쌓이면 그대로 스케일. 이미 연결된 MCP 있어 즉시 실행 가능 |
| i18n | **next-intl** | 2026년 App Router 표준. Server Component 네이티브 지원, ~2KB 번들 |
| 이메일 | Resend 또는 ConvertKit | 구독 폼 → 시퀀스 자동화 |
| 결제/과금 | 없음 (MVP는 광고 커미션형, 직접 결제 없음) | 불필요한 스택 배제 |

**의도적으로 뺀 것**: 자체 CMS 백엔드(관리자 UI)는 MVP에서 제외. 리뷰 데이터는 Supabase 테이블에 직접 입력 — 갯수가 늘어나면(50개+) 그때 관리자 패널 붙임. 3일 내 배포가 우선.

---

## 2. i18n 전략 — 오버엔지니어링 방지

지금 당장 다국어 서비스를 만들 필요는 없음. 하지만 **URL 구조는 처음부터 로케일을 반영**해야 나중에 스페인어 등 확장 시 마이그레이션 비용이 없음.

- URL: `honestpickhq.com/en/review/[slug]` (지금은 `en` 하나만 오픈)
- `next-intl` 미들웨어로 로케일 라우팅 골격만 세팅, 번역 파일은 `en.json` 하나로 시작
- 통화/단위: 전부 USD, lb/inch 등 미국 단위계 (환율·관부가세 안내 삭제 — 국내 대상일 때 있던 마찰 요소가 오히려 사라짐)
- 콘텐츠 톤: 미국 리뷰 사이트 특유의 "TL;DR + Pros/Cons + Verdict" 포맷 — 지금 모달 구조(한줄평/장단점)가 이미 이 포맷에 부합함

---

## 3. DB 스키마 (Supabase / Postgres)

```sql
-- 카테고리
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,          -- 'headphones', 'skincare'
  name_en text not null,
  description_en text
);

-- 제품 리뷰 (핵심 테이블)
create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,          -- 'noise-cancelling-headphones'
  category_id uuid references categories(id),
  title_en text not null,
  subtitle_en text,
  one_liner_en text,                  -- 모달의 "한줄평"
  price_usd numeric,
  rating numeric(2,1),
  image_urls text[],
  pros text[],
  cons text[],
  body_en text,                       -- 본문 리뷰 (MDX)
  amazon_asin text not null,
  amazon_tag text not null,           -- Associates 태그
  badge text,                         -- 'Editor Pick', 'Best Value', 'Bestseller'
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 클릭 추적 (전환 데이터 확보 → 수익화 최적화의 핵심)
create table clicks (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  clicked_at timestamptz default now(),
  referrer text,
  session_id text,
  country text
);

-- 이메일 구독자
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now(),
  source text                         -- 'homepage_footer', 'exit_intent' 등
);
```

`amazon_tag`를 products 테이블에 둔 이유: 카테고리별로 다른 Associates 태그를 실험(A/B)할 수 있게. 이건 나중에 최적화 여지.

---

## 4. 페이지 & 라우팅 구조

```
/en                              → 홈
/en/category/[slug]              → 카테고리 리스트 (전체 제품 페이지네이션)
/en/review/[slug]                → 리뷰 상세 (SSG, 고유 URL — SEO 핵심)
/en/review/[slug]  (@modal)      → 리스트에서 클릭 시 인터셉팅 라우트로 모달처럼 표시
/api/click/[productId]           → 클릭 기록 + 302 리다이렉트 → Amazon 링크
/api/subscribe                   → 이메일 구독 처리
/sitemap.xml, /robots.txt        → SEO 필수
```

지난 논의에서 확정한 "모달 vs 새 페이지" 결론(URL 라우팅 + 인터셉팅 라우트)을 그대로 반영.

---

## 5. 수익화 우선순위 로직

**가장 시급한 리스크부터**: 2026년 4월 Amazon Associates 정책이 개정되어 **가입 후 180일 내 3건의 적격 판매**를 못 내면 계정이 자동 종료되고, 이전에는 180일이 지나도 누적되던 실적이 이제는 인정 안 됨(7~12개월차 전환은 카운트 안 됨). 즉 **사이트를 만들고 나서 승인 신청까지 걸리는 시간이 곧 매출 창구가 열리는 카운트다운**이라, 콘텐츠 5~10개라도 최대한 빨리 라이브시키고 신청하는 게 우선순위 1번.

1. **Day 3 안에 라이브 + Associates 신청** — 승인 요건(오리지널 콘텐츠 최소치)을 만족하는 선에서 최소 리뷰 5개로 시작
2. 클릭 추적 API로 실제 클릭률 데이터 확보 → 어떤 카테고리가 전환되는지 1주 안에 판단
3. FTC 고지문 ("As an Amazon Associate I earn from qualifying purchases") — 기존 사이트에 이미 정확한 문구로 들어가 있음, 그대로 유지
4. 트래픽이 붙으면(통상 월 5~10만 세션) Mediavine/Raptive 등 프리미엄 광고 네트워크 추가 검토 (2차 수익원)

---

## 6. 3일 MVP 로드맵

| Day | 작업 |
|---|---|
| 1 | Next.js + Tailwind 스캐폴딩, Vercel 프로젝트 연결(Pro 플랜), Supabase 프로젝트 생성 + 스키마 적용, 홈/카테고리/리뷰 라우팅 구현, 도메인(honestpickhq.com) 연결 |
| 2 | 리뷰 5~10개 영문 콘텐츠 시딩, 클릭 추적 API, 이메일 구독 연동, 인터셉팅 라우트 모달 구현 |
| 3 | SEO 메타태그/OG 이미지/sitemap, Google Search Console 등록, Amazon Associates 신청 제출, 최종 배포 |

---

## 7. 리스크 & 확인 필요 사항

- **Amazon Associates 승인**: 180일 데드라인이 신청 시점부터 시작 — 신청은 최대한 빨리, 하지만 "오리지널 콘텐츠" 요건 강화됐으므로 템플릿성 문구가 아닌 실제 사용 경험 기반 리뷰 필요
- **도메인**: honestpickhq.com은 지금 가용 확인됐지만 실제 구매는 별도 승인 필요(예산 집행) — 확정되면 바로 진행 가능
- **콘텐츠 제작 병목**: 영문 리뷰 작성이 실제 병목이 될 가능성 높음 — 라하님이 실사용 후기를 주는 방식(음성/메모)으로 주면 제가 영문 리뷰 카피로 변환하는 흐름을 다음 단계에 세팅 추천

---

## 다음 단계

이 문서 승인되면 Step 2(와이어프레임, `wireframe_main.html`)로 넘어가서 브라우저에서 바로 볼 수 있는 영문 버전 레이아웃을 만들겠습니다. 수정할 부분 있으면 먼저 알려주세요.

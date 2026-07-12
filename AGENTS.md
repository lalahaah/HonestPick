# AGENTS.md
## HonestPick — Standing Instructions for Antigravity Agents

이 파일은 리포지토리 루트(`/AGENTS.md`)에 두면 Antigravity CLI가 작업 시작 전 자동으로 읽는 표준 컨벤션 파일이다. 모든 에이전트(및 이 프로젝트에 투입되는 서브에이전트)는 코드를 작성하기 전에 이 파일 + `architecture_research.md` + `design.md`를 먼저 읽는다. 셋 중 하나라도 안 읽고 작업 시작 금지.

---

## 1. 미션

HonestPick은 미국 시장 대상 아마존 어소시에이트 리뷰 사이트다. 수익원은 아마존 제휴 커미션 하나. "직접 테스트한 리뷰와, 검증된 데이터 기반으로 리서치한 리뷰를 명확히 구분해 표시하는 것"이 핵심 신뢰 자산이므로, **어떤 코드 변경도 신뢰 신호(FTC 고지, 실사용 마이크로카피, 정직한 장단점 표기)를 훼손해서는 안 된다.**

우선순위는 항상: **동작하는 MVP 먼저, 완벽한 아키텍처는 나중.** 3일 내 배포 가능한 범위를 벗어나는 제안(예: 커스텀 백엔드, 마이크로서비스 분리)은 하지 않는다.

---

## 2. Source of Truth 문서

| 문서 | 역할 |
|---|---|
| `architecture_research.md` | 기술스택, DB 스키마, 라우팅 구조, 수익화 로직, 리스크 |
| `design.md` | 디자인 토큰, 페이지별 UI 스펙, 컴포넌트 목록 |
| `AGENTS.md` (이 파일) | 코딩 규칙 + 단계별 실행 체크리스트 |

세 문서 간 내용이 충돌하면 `architecture_research.md`(비즈니스 로직) > `design.md`(UI) > 에이전트의 임의 판단 순으로 우선한다. 문서에 없는 결정이 필요하면 코드에 `// TODO(decision): ...` 주석을 남기고 넘어간다 — 임의로 추측해서 확정하지 않는다.

---

## 3. 기술 스택 (변경 금지, 변경하려면 먼저 사용자에게 확인)

- Framework: Next.js 15 (App Router, TypeScript strict)
- Hosting: Vercel **Pro** (Hobby 플랜은 비상업용 제한 있어 사용 불가)
- DB: Supabase (Postgres) — MCP로 직접 마이그레이션 가능
- Styling: Tailwind CSS (design.md 토큰만 사용, 임의 hex 값 금지)
- i18n: next-intl (현재 `en` 로케일만 활성화, 구조는 다국어 대비)
- Fonts: Fraunces(디스플레이) + Inter(본문) — `next/font/google`로 로드
- Email: Resend (구독 폼 발송)

---

## 4. 리포지토리 구조 (목표)

```
/app
  /[locale]
    layout.tsx
    page.tsx                              # 홈
    /category/[slug]/page.tsx
    /review/[slug]/page.tsx               # 풀페이지 (SSG)
    /@modal
      /(.)review/[slug]/page.tsx          # 인터셉팅 라우트 (모달)
  /api
    /click/[productId]/route.ts           # 클릭 기록 + 302 리다이렉트
    /subscribe/route.ts
/components
  Navbar.tsx  Hero.tsx  CategoryTicker.tsx  CategoryCard.tsx
  ProductCard.tsx  RatingStars.tsx  Badge.tsx  ProsConsCard.tsx
  PullQuote.tsx  BuyBox.tsx  ImageGallery.tsx  ProcessSteps.tsx
  NewsletterForm.tsx  Footer.tsx
/lib
  supabase/server.ts   supabase/client.ts
  analytics.ts
/messages
  en.json
/supabase
  migrations/*.sql
architecture_research.md
design.md
AGENTS.md
```

이 구조와 다르게 파일을 배치해야 할 이유가 생기면 이유를 커밋 메시지에 남긴다.

---

## 5. 코딩 규칙

- TypeScript strict 모드, `any` 금지 (불가피하면 `// eslint-disable-next-line` + 사유 주석)
- 기본은 Server Component. `'use client'`는 상호작용(모달 열기, 폼, 마퀴 애니메이션)이 실제로 필요한 리프 컴포넌트에만
- Supabase `service_role` 키는 서버 전용 (`/lib/supabase/server.ts`), 클라이언트 번들에 절대 노출 금지
- 모든 페이지(`page.tsx`)는 `generateMetadata` 또는 `metadata` export 필수 (title, description, OG image) — SEO가 곧 매출이므로 이건 협상 불가
- 리뷰 상세 페이지는 `generateStaticParams`로 빌드타임 생성 (SSG) 또는 ISR. **클라이언트 사이드 렌더링으로 제품 데이터를 채우는 방식 금지** — 크롤러가 못 읽음
- 커밋 메시지: `feat(scope): message` / `fix(scope): message` / `chore(scope): message`
- 색상은 `design.md` 토큰(CSS 변수 또는 Tailwind theme extend)만 사용. 임의 hex 코드 삽입 금지

---

## 6. 하지 말 것 (Do NOT)

- 아마존 ASIN, 가격, 리뷰 본문을 임의로 지어내지 않는다 — 실 데이터 없으면 `TODO: 실제 ASIN 필요` 마킹하고 더미로 표시
- 앞으로 review_type='researched'로 새 제품 넣을 때는 body_en에 "Tested for X" 류 실사용 문구를 절대 쓰지 말 것 — research_basis 필드에 근거(스펙시트/검증된 리뷰 개수 등)를 명시하고, 본문도 그에 맞게 "Based on manufacturer specs and X verified owner reviews" 톤으로 작성.
- FTC 고지 문구("As an Amazon Associate, HonestPick earns from qualifying purchases.")를 삭제하거나 축소하지 않는다
- Vercel Hobby 설정으로 배포하지 않는다 (상업 프로젝트)
- 리뷰 상세를 모달 전용으로만 구현하지 않는다 — 반드시 고유 URL이 있어야 함 (`/en/review/[slug]`)
- `design.md`에 없는 새 컬러/폰트/컴포넌트 패턴을 임의로 추가하지 않는다 — 필요하면 먼저 제안

---

## 7. 단계별 실행 체크리스트

### Phase 0 — Setup
- [ ] Next.js 15 프로젝트 생성 (App Router, TS, Tailwind)
- [ ] Fraunces / Inter `next/font/google` 설정
- [ ] Vercel 프로젝트 연결 (Pro 플랜), `honestpickhq.com` 도메인 연결
- [ ] Supabase 프로젝트 생성, `architecture_research.md` §3 스키마로 마이그레이션 적용
- [ ] `design.md` §2 토큰을 `tailwind.config.ts` theme로 이식

### Phase 1 — 데이터 레이어
- [ ] `/lib/supabase/server.ts`, `client.ts` 작성
- [ ] `products`, `categories` 조회 함수 (`getProducts`, `getProductBySlug`, `getCategoryBySlug`)
- [ ] 시드 데이터 5~10개 영문 리뷰 입력 (실사용 기반, 더미 텍스트 금지)

### Phase 2 — 핵심 컴포넌트 & 홈
- [ ] `design.md` §4 컴포넌트 목록 구현 (Navbar, Hero, CategoryTicker, CategoryCard, ProductCard, RatingStars, Badge, ProcessSteps, NewsletterForm, Footer)
- [ ] 홈페이지(`/app/[locale]/page.tsx`) 조립
- [ ] 반응형 확인 (375 / 768 / 1024 / 1440)

### Phase 3 — 카테고리 & 리뷰 상세
- [ ] `/category/[slug]/page.tsx` — 정렬 컨트롤 포함
- [ ] `/review/[slug]/page.tsx` — BuyBox, ImageGallery, PullQuote, ProsConsCard 조립 (design.md §3.3)
- [ ] 인터셉팅 라우트 `@modal/(.)review/[slug]/page.tsx` 구현, ESC/포커스 트랩 처리
- [ ] 모바일 분기: <768px에서 모달 대신 풀페이지 + 하단 고정 BuyBox

### Phase 4 — 전환 인프라
- [ ] `/api/click/[productId]/route.ts` — 클릭 기록 후 아마존 링크로 302 리다이렉트
- [ ] `/api/subscribe/route.ts` — Resend 연동
- [ ] Amazon Associates 링크에 실제 태그 반영 (승인 완료 후)

### Phase 5 — SEO & 런치
- [ ] 전 페이지 metadata / OG 이미지
- [ ] `sitemap.xml`, `robots.txt`
- [ ] Google Search Console 등록
- [ ] Lighthouse 90+ 확인 (Performance/SEO/Accessibility)
- [ ] 최종 배포 → Amazon Associates 신청 제출

---

## 8. Definition of Done (공통)

작업을 "완료"로 표시하기 전에 아래를 모두 통과해야 한다.

1. `design.md` 토큰/레이아웃과 시각적으로 일치
2. 모바일(375px)에서 레이아웃 깨짐 없음
3. `generateMetadata` 누락 없음 (해당 페이지)
4. 콘솔 에러/경고 없음
5. FTC 고지문, 실사용 마이크로카피 등 신뢰 신호 요소 유지됨

---

## 9. 진행 중 막히면

문서에 답이 없는 결정(예: 특정 카피 문구, 실제 제품 사진 소싱)은 임의로 확정하지 말고 커밋/PR 설명에 질문으로 남긴다. 사용자가 "다 받아들일게" 스타일로 위임했더라도, **비즈니스 리스크가 있는 결정(가격 표기, 법적 고지, 아마존 정책 관련)은 반드시 확인받는다.**

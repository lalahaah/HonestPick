# design.md
## HonestPick — Visual & UX System (v1)

기준: 첨부된 Hostinger 프로토타입 스크린샷 4장. 목표: 동일한 정보구조(히어로 → 카테고리 → 베스트픽 → 프로세스 → 구독 → 푸터)를 유지하되, 미국 에디토리얼 리뷰 사이트(Wirecutter, The Strategist류) 수준의 신뢰감·완성도로 끌어올림. 이 문서가 UI 구현의 Source of Truth — 여기 없는 색상/폰트/간격을 임의로 만들지 않는다.

---

## 1. 디자인 방향 (왜 바뀌는가)

기존 프로토타입의 문제는 예쁘지 않아서가 아니라 **범용 SaaS 랜딩 템플릿처럼 보인다는 것**. 아마존 어필리에이트 사이트가 매출을 내려면 "이 사람이 진짜 써봤다"는 신뢰가 시각적으로 느껴져야 한다. 그래서 세 가지를 바꾼다.

1. 순수 흑백+오렌지의 밋밋한 대비 → 따뜻한 오프화이트 배경 + 세리프 디스플레이 폰트로 에디토리얼 무게감 추가
2. 플랫한 카드 → 호버 시 리프트되는 카드, 실제 프로덕트 사진이 살아있게 보이는 그림자/여백
3. 단일 이미지 제품 → 리뷰 상세에 갤러리, 스티키 구매 박스(Buy Box) 패턴 도입 — 이건 전환율에 직접 영향

브랜드 포인트 컬러(오렌지)는 아마존의 공식 오렌지(#FF9900)와 혼동되지 않도록 코랄 방향으로 톤을 내린다. "아마존 페이지처럼 보이는 제휴 사이트"는 오히려 신뢰를 깎는다.

---

## 2. 디자인 토큰

### 색상
```
--ink:        #14120F   /* 텍스트, 헤더 배경 */
--ink-soft:   #57534A   /* 보조 텍스트 */
--paper:      #FBF8F3   /* 섹션 배경 (기존 순백 대체) */
--surface:    #FFFFFF   /* 카드 배경 */
--border:     #E8E3DA   /* 카드 테두리, 구분선 */
--accent:     #F0532E   /* 코랄 오렌지 — 기존 브랜드 오렌지에서 톤다운, 아마존 오렌지와 구분 */
--accent-soft:#FDEDE7   /* 배지, 하이라이트 배경 */
--good:       #1E7A4C   /* 장점 체크 */
--bad:        #C23B4C   /* 단점 마커 (경고색 아님, 채도 낮춤) */
--star:       #F0532E   /* 별점 — accent 재사용, 색상 수 최소화 */
```

### 타이포그래피
- 디스플레이(H1~H3): **Fraunces** (Google Fonts, serif) — 에디토리얼 무게감. 히어로 헤드라인, 제품명, 섹션 타이틀에만 사용
- 본문/UI: **Inter** (Google Fonts, sans) — 본문, 버튼, 네비, 라벨 전부
- 스케일(rem, Inter 기준 body 16px = 1rem):
  - Display XL: 3.5rem / 1.05 / Fraunces SemiBold (히어로 H1)
  - Display L: 2.25rem / 1.1 / Fraunces SemiBold (섹션 타이틀)
  - Display M: 1.5rem / 1.2 / Fraunces Medium (제품명, 카드 타이틀)
  - Body L: 1.125rem / 1.6 / Inter Regular
  - Body: 1rem / 1.6 / Inter Regular
  - Small: 0.875rem / 1.5 / Inter Regular (메타 정보, 캡션)
  - Micro: 0.75rem / 1.4 / Inter Medium, letter-spacing 0.02em (배지, 라벨)

### 간격 (4px 기준 스케일)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` — 섹션 간 기본 여백은 64/96, 카드 내부 패딩은 24.

### 모양
- 카드 radius: 16px (기존 각진 카드보다 부드럽게)
- 버튼(Primary CTA): full pill, height 48px
- 배지: full pill, backdrop-blur(8px) + 반투명 배경 (이미지 위에 얹을 때 가독성 확보)
- 그림자: `0 1px 2px rgba(20,18,15,.04), 0 8px 24px rgba(20,18,15,.06)` — 호버 시 `0 16px 32px rgba(20,18,15,.10)` + `translateY(-4px)`

---

## 3. 페이지별 스펙

### 3.1 Homepage

**Header**: 기존 유지(검은 배경 고정 네비) + 스크롤 시 `border-bottom: 1px solid var(--border)` 추가, backdrop-blur. 로고 "HonestPick", 우측 CTA "See This Week's Picks".

**Hero**: 좌측 텍스트 / 우측 프로덕트 플랫레이 사진 2컬럼 유지. 변경점:
- 배지("Hands-on tested, not sponsored")를 accent-soft 배경 pill로
- 헤드라인 Fraunces Display XL, 하이라이트 구간은 밑줄 대신 `background: var(--accent-soft)` + 살짝 회전(-1deg) 마커 스타일
- 통계 3개(120+ Reviews, 4.7 Avg Rating, 2 Core Categories)는 아이콘 추가하고 세로 구분선(`border-left`)으로 묶기
- 우측 이미지 위 "Editorial trust, not ad spend" 배지는 유리모프(glassmorphism: `backdrop-blur(12px) + bg rgba(255,255,255,.85)`)로 격상

**Category Ticker**: 무한 마퀴, 다만 좌우 끝에 `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` 적용해 하드컷 없애기. hover 시 애니메이션 일시정지.

**Category Cards (Tech / K-Beauty)**: 기존 2단 배너 유지. 이미지 위 그라디언트 오버레이를 `linear-gradient(to top, rgba(20,18,15,.85), transparent 60%)`로 톤 다운, 텍스트 가독성 확보. "Browse reviews →" 링크에 화살표 마이크로 애니메이션(hover 시 4px 이동).

**Best Picks Grid**: 3열 그리드, 필터 탭(All / Tech / K-Beauty) 유지하되 선택된 탭은 `bg: var(--ink)` 유지, 미선택은 `border: 1px solid var(--border)`로 아웃라인만.
카드 구성(위→아래):
1. 이미지 (4:3 고정 비율, object-cover)
2. 이미지 좌상단: 카테고리 배지 (Micro 텍스트, surface/80 배경)
3. 이미지 우상단: 등급 배지 (Editor's Pick / Best Value / Bestseller) — accent-soft 배경
4. 카드 바디: 별점+평점(좌), 가격(우, Display M, ink 컬러로 강조)
5. 제품명 (Display M, Fraunces)
6. 서브타이틀 (Small, ink-soft)
7. 장점 태그 2개 (pill, good 컬러 아웃라인) — 기존엔 본문에 있던 장점 텍스트를 카드 레벨에서 미리보기로 노출해 스캔 속도 향상
카드 전체 hover: lift + shadow 상승, 이미지 살짝 scale(1.03).

**How We Pick (프로세스 3단계)**: 기존 유지, 카드 사이에 점선 커넥터(→) 추가해 순서 흐름 시각화. 아이콘은 accent-soft 원형 배경 안에.

**Newsletter CTA**: 배경을 순수 검정 대신 `var(--ink)` 유지하되, 우상단에 은은한 accent 그라디언트 블롭(blur) 하나 추가해 밋밋함 해소. "No spam. Unsubscribe anytime." 마이크로카피 인풋 아래 추가 (미국 사용자 이메일 전환율에 필수적인 신뢰 문구).

**Footer**: 4컬럼(브랜드+한줄소개 / Categories / Company / Legal). FTC 문구("As an Amazon Associate, HonestPick earns from qualifying purchases.")는 굵게 강조된 별도 바(bg: var(--paper), border-top)로 분리해 눈에 띄게 — 법적 고지이자 신뢰 신호이기도 함.

---

### 3.2 Category Page (`/en/category/[slug]`) — 신규

기존 스크린샷엔 없던 페이지. 홈의 Best Picks 카드와 동일 컴포넌트 재사용, 상단에:
- 브레드크럼 (Home / Tech)
- 카테고리 타이틀(Display L) + 설명 1줄
- 정렬 컨트롤(Highest Rated / Price: Low to High / Newest) — 우측 정렬
- 그리드는 반응형 3→2→1열

---

### 3.3 Review Detail — Page & Modal (`/en/review/[slug]`)

**공통 레이아웃 (데스크톱, ≥1024px)**: 2컬럼. 좌측 62% 콘텐츠, 우측 38% **스티키 Buy Box**(`position: sticky; top: 96px`).

**콘텐츠 영역 (좌)**:
1. 브레드크럼 + 카테고리 배지
2. 제품명(Display XL, Fraunces) + "Tested for 2 weeks" 같은 실사용 기간 마이크로카피 (신뢰 신호, 필수)
3. 이미지 갤러리 — 메인 이미지 + 하단 썸네일 4개 (기존 단일 이미지에서 확장)
4. 한줄평 Pull-quote 박스 — 기존 모달의 "한줄평" 그대로, 따옴표 아이콘 + 별점 큰 사이즈로 강조 (surface 카드, accent 좌측 보더 4px)
5. Product Description 본문
6. Pros/Cons — 2컬럼 카드(good/bad 컬러 아이콘+텍스트), 기존 리스트보다 카드형으로 격상해 스캔성 강화
7. Related Products — 하단 가로 스크롤 카드 3~4개

**Buy Box (우, 스티키)**:
- 가격(Display L) + 별점
- Primary CTA "Check Price on Amazon" (accent 배경, full width, pill) — 클릭 시 `/api/click/[productId]`로 이동 후 아마존 리다이렉트
- CTA 아래 Small 텍스트: "Price as of [date]. As an Amazon Associate we earn from qualifying purchases." (FTC 준수 + 가격 변동 고지)
- 장점 3개 요약 bullet (good 아이콘)

**모달 변형 (리스트에서 클릭 시, 인터셉팅 라우트)**: 위 레이아웃을 그대로 `max-width: 960px` 오버레이 카드에 담음. 배경 `rgba(20,18,15,.6)` + blur. 우상단 X 버튼, ESC로 닫힘, 닫으면 이전 URL(리스트)로 복귀. **단, 실제 URL은 `/en/review/[slug]`로 바뀌어 있어야 함** (직전 대화에서 확정한 SEO 요건).

**모바일 (<768px)**: 모달 오버레이 방식 대신 **풀페이지로 전환** (오버레이는 모바일에서 스크롤/제스처 충돌 유발). Buy Box는 스티키 사이드바 대신 **하단 고정 바**(가격 + CTA만, `position: fixed; bottom: 0`)로 축소.

---

## 4. 컴포넌트 목록 (구현 단위)

| 컴포넌트 | 용도 |
|---|---|
| `<Navbar />` | 전역 헤더, 스크롤 시 보더 |
| `<Hero />` | 홈 히어로 |
| `<CategoryTicker />` | 무한 마퀴 |
| `<CategoryCard />` | Tech/K-Beauty 배너 |
| `<ProductCard />` | 그리드용 카드 (홈/카테고리 공용) |
| `<RatingStars value />` | 별점 표시 |
| `<Badge variant />` | Editor's Pick 등 배지 |
| `<ProsConsCard />` | 장단점 2컬럼 |
| `<PullQuote />` | 한줄평 인용 박스 |
| `<BuyBox />` | 스티키 구매 박스 (데스크톱) / 하단 고정 바 (모바일) |
| `<ImageGallery />` | 리뷰 상세 이미지 갤러리 |
| `<ProcessSteps />` | How We Pick 3단계 |
| `<NewsletterForm />` | 이메일 구독 |
| `<Footer />` | 전역 푸터 |

---

## 5. 접근성 / 반응형 체크리스트

- 색 대비: 본문 텍스트 AA(4.5:1) 이상 — `--ink` on `--paper` 통과 확인됨
- 모든 이미지 `alt` 필수 (제품명 기반 자동 생성 + 수동 보정 가능하게)
- 모달: focus trap, ESC 닫힘, 닫을 때 트리거 요소로 focus 복귀
- 포커스 링 제거 금지 (`outline: 2px solid var(--accent)` 커스텀 스타일로 대체 가능하나 삭제 불가)
- 브레이크포인트: `sm 640 / md 768 / lg 1024 / xl 1280` (Tailwind 기본값 그대로)

---

## 다음 단계
이 스펙 기준으로 `AGENTS.md`에 Antigravity 구현 단계를 정리한다. 실제 코드는 Antigravity CLI에서 AGENTS.md + 이 문서를 읽고 진행.

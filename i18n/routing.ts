import { defineRouting } from "next-intl/routing";

// architecture_research.md §2: 현재 en만 활성화, 구조는 다국어 대비
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  // 기본 로케일(en)도 URL 경로에 포함 → /en/review/[slug] SEO 요건
  localePrefix: "always",
});

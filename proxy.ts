import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16.2.10+: "proxy" 파일 컨벤션 사용 (middleware.ts는 deprecated)
// next-intl 미들웨어: 로케일 감지 및 리다이렉트 처리
// / → /en, /en/... 유지
export default createMiddleware(routing);

export const config = {
  // API 라우트, 정적 파일, Next.js 내부 경로 제외
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};

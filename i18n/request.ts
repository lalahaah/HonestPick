import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl이 미들웨어에서 감지한 로케일 사용
  let locale = await requestLocale;

  // 지원하지 않는 로케일이면 기본값(en)으로 폴백
  if (!locale || !routing.locales.includes(locale as "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

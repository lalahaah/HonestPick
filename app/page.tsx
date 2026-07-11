import { redirect } from "next/navigation";

// 루트 경로(/) → /en으로 리다이렉트
// next-intl 미들웨어가 처리하지만 혹시를 위한 폴백
export default function RootPage() {
  redirect("/en");
}

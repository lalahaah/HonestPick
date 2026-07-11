// 루트 레이아웃 — next-intl 통합 시 [locale]/layout.tsx가 실제 HTML을 담당
// 이 파일은 Next.js App Router 요구사항으로 존재하나, html/body 태그 없이 최소화
// [locale]/layout.tsx에서 html/body를 완전히 제어함
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

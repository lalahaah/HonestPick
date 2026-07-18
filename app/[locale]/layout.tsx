import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { GoogleAnalytics } from '@next/third-parties/google';
import "../globals.css";

// design.md §2: 디스플레이(H1~H3)용 — 에디토리얼 무게감
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// design.md §2: 본문/UI 전용
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HonestPick — Honest Product Reviews You Can Trust",
    template: "%s | HonestPick",
  },
  description:
    "In-depth, hands-on product reviews based on real-world testing. No paid placements, no sponsored content — just honest picks to help you buy smarter.",
  metadataBase: new URL("https://honestpickhq.com"),
  openGraph: {
    siteName: "HonestPick",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: 'CPysx2ERXBLCxjoV6pZGsa7x2mGZsYrYnFiBQep4Buc',
  },
};

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, modal, params }: Props) {
  const { locale } = await params;

  // 지원하지 않는 로케일이면 404
  if (!routing.locales.includes(locale as "en")) {
    notFound();
  }

  // next-intl: 서버에서 메시지 로드
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          {modal}
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}

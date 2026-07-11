import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryTicker from "@/components/CategoryTicker";
import CategoryCard from "@/components/CategoryCard";
import ProcessSteps from "@/components/ProcessSteps";
import NewsletterForm from "@/components/NewsletterForm";
import Footer from "@/components/Footer";
import BestPicksGrid from "@/components/BestPicksGrid";
import { getProducts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "HonestPick — Honest Product Reviews You Can Trust",
  description:
    "In-depth, hands-on product reviews based on real-world testing. No paid placements, no sponsored content — just honest picks to help you buy smarter.",
  openGraph: {
    title: "HonestPick — Honest Product Reviews You Can Trust",
    description:
      "Real testing. Honest reviews. Smarter buying decisions.",
    url: "https://honestpickhq.com/en",
  },
};

export default async function HomePage() {
  // Supabase에서 실제 제품 데이터 로드 (최대 12개)
  const products = await getProducts({ limit: 12 });

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <Hero />
        <CategoryTicker />

        {/* 카테고리 배너 섹션 */}
        <section
          style={{
            backgroundColor: "var(--ink)",
            padding: "64px 24px 96px",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
            className="category-banners"
          >
            <CategoryCard
              slug="tech"
              name="Tech & Gadgets"
              description="Headphones, chargers, and desk setups that actually boost productivity."
              icon="💻"
            />
            <CategoryCard
              slug="k-beauty"
              name="K-Beauty"
              description="Skincare formulations that work, tested for 4+ weeks."
              icon="✨"
            />
          </div>
        </section>

        {/* 베스트 픽 그리드 (클라이언트 컴포넌트: 탭 필터링 담당) */}
        <BestPicksGrid products={products} />

        <ProcessSteps />
        <NewsletterForm />
      </main>
      <Footer />

      {/* 모바일 반응형 스타일: 카테고리 배너 */}
      <style>{`
        @media (max-width: 767px) {
          .category-banners {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

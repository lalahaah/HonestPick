import type { Metadata } from "next";

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

// Phase 0: 기본 스캐폴드 — Phase 2에서 컴포넌트 조립 예정
export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-body)",
        backgroundColor: "var(--paper)",
        color: "var(--ink)",
        gap: "1rem",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "3.5rem",
          lineHeight: 1.05,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        HonestPick
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "var(--ink-soft)",
          textAlign: "center",
          maxWidth: "480px",
        }}
      >
        Hands-on tested, not sponsored. Phase 0 scaffold — components coming in
        Phase 2.
      </p>
      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--ink-soft)",
          textAlign: "center",
          borderTop: "1px solid var(--border)",
          paddingTop: "1rem",
          maxWidth: "600px",
        }}
      >
        As an Amazon Associate, HonestPick earns from qualifying purchases.
      </p>
    </main>
  );
}

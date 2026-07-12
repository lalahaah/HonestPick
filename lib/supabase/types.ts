/**
 * Supabase Database 타입 정의
 * architecture_research.md §3 스키마 기반
 *
 * TODO: Supabase 프로젝트 연결 후 `npx supabase gen types typescript`로 자동 생성 권장
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          description_en: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_en: string;
          description_en?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_en?: string;
          description_en?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          slug: string;
          category_id: string | null;
          title_en: string;
          subtitle_en: string | null;
          one_liner_en: string | null;
          price_usd: number | null;
          rating: number | null;
          image_urls: string[] | null;
          pros: string[] | null;
          cons: string[] | null;
          body_en: string | null;
          amazon_asin: string;
          amazon_tag: string;
          badge: "Editor's Pick" | "Best Value" | "Bestseller" | null;
          review_type: "hands_on" | "researched" | null;
          tested_duration: string | null;
          research_basis: string | null;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          category_id?: string | null;
          title_en: string;
          subtitle_en?: string | null;
          one_liner_en?: string | null;
          price_usd?: number | null;
          rating?: number | null;
          image_urls?: string[] | null;
          pros?: string[] | null;
          cons?: string[] | null;
          body_en?: string | null;
          amazon_asin: string;
          amazon_tag: string;
          badge?: "Editor's Pick" | "Best Value" | "Bestseller" | null;
          review_type?: "hands_on" | "researched" | null;
          tested_duration?: string | null;
          research_basis?: string | null;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          category_id?: string | null;
          title_en?: string;
          subtitle_en?: string | null;
          one_liner_en?: string | null;
          price_usd?: number | null;
          rating?: number | null;
          image_urls?: string[] | null;
          pros?: string[] | null;
          cons?: string[] | null;
          body_en?: string | null;
          amazon_asin?: string;
          amazon_tag?: string;
          badge?: "Editor's Pick" | "Best Value" | "Bestseller" | null;
          review_type?: "hands_on" | "researched" | null;
          tested_duration?: string | null;
          research_basis?: string | null;
          is_featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      clicks: {
        Row: {
          id: string;
          product_id: string | null;
          clicked_at: string;
          referrer: string | null;
          session_id: string | null;
          country: string | null;
        };
        Insert: {
          id?: string;
          product_id?: string | null;
          clicked_at?: string;
          referrer?: string | null;
          session_id?: string | null;
          country?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string | null;
          clicked_at?: string;
          referrer?: string | null;
          session_id?: string | null;
          country?: string | null;
        };
      };
      subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          source: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          source?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          source?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// 편의 타입 alias
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Click = Database["public"]["Tables"]["clicks"]["Row"];
export type Subscriber = Database["public"]["Tables"]["subscribers"]["Row"];

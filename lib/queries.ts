/**
 * lib/queries.ts
 * 서버 전용 데이터 조회 함수 모음
 *
 * - 모든 함수는 Server Component / generateStaticParams에서만 호출
 * - 'use client' 컴포넌트에서 직접 import 금지 (AGENTS.md §5)
 * - 에러는 throw하지 않고 null/[] 반환 → 페이지에서 notFound() 처리
 *
 * NOTE: Supabase join 타입 추론은 CLI로 자동 생성된 타입에서만 완전히 동작함.
 * 현재는 수동 타입 + 안전한 2-step 쿼리 방식을 사용.
 * TODO: `npx supabase gen types typescript` 실행 후 types.ts 교체하면 join 타입 완성
 */

import { createSupabaseServerClient } from "./supabase/server";
import type { Category, Product } from "./supabase/types";

// ─────────────────────────────────────────────
// 편의 타입
// ─────────────────────────────────────────────

/** product에 category 정보가 포함된 타입 */
export type ProductWithCategory = Product & {
  category: Pick<Category, "slug" | "name_en"> | null;
};

// ─────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────

/** 전체 카테고리 목록 조회 */
export async function getCategories(): Promise<Category[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name_en", { ascending: true });

  if (error) {
    console.error("[getCategories]", error.message);
    return [];
  }
  return (data ?? []) as Category[];
}

/** slug로 단일 카테고리 조회 */
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    // PGRST116 = row not found → notFound() 트리거용 null 반환
    if (error.code !== "PGRST116") {
      console.error("[getCategoryBySlug]", error.message);
    }
    return null;
  }
  return data as Category;
}

// ─────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────

type GetProductsOptions = {
  /** 카테고리 slug 필터 */
  categorySlug?: string;
  /** 피처드만 조회 */
  featuredOnly?: boolean;
  /** 정렬 기준 */
  orderBy?: "rating" | "price_usd" | "created_at";
  /** 오름차순 여부 */
  ascending?: boolean;
  /** 최대 개수 */
  limit?: number;
};

/**
 * 제품 목록 조회 (+ category 정보 포함)
 * 2-step: products 조회 → categories로 category 정보 merge
 */
export async function getProducts(
  options: GetProductsOptions = {}
): Promise<ProductWithCategory[]> {
  const {
    categorySlug,
    featuredOnly = false,
    orderBy = "created_at",
    ascending = false,
    limit,
  } = options;

  const supabase = await createSupabaseServerClient();

  // Step 1: category_id 해석
  let categoryFilter: string | undefined;
  if (categorySlug) {
    const { data: catRows } = await supabase
      .from("categories")
      .select("id, slug, name_en")
      .eq("slug", categorySlug);

    const cat = catRows?.[0];
    if (!cat) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categoryFilter = (cat as any).id as string;
  }

  // Step 2: products 조회
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase
    .from("products")
    .select("*")
    .order(orderBy, { ascending });

  if (featuredOnly) query = query.eq("is_featured", true);
  if (categoryFilter) query = query.eq("category_id", categoryFilter);
  if (limit) query = query.limit(limit);

  const { data: products, error } = await query;
  if (error) {
    console.error("[getProducts]", error.message);
    return [];
  }

  // Step 3: 카테고리 정보 merge — category_id 목록 수집 후 일괄 조회
  const catIds = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...new Set((products as any[]).map((p: any) => p.category_id).filter(Boolean)),
  ] as string[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let catMap: Record<string, Pick<Category, "slug" | "name_en">> = {};
  if (catIds.length > 0) {
    const { data: cats } = await supabase
      .from("categories")
      .select("id, slug, name_en")
      .in("id", catIds);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (cats ?? []).forEach((c: any) => {
      catMap[c.id as string] = { slug: c.slug as string, name_en: c.name_en as string };
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (products as any[]).map((p: any) => ({
    ...p,
    category: p.category_id ? (catMap[p.category_id as string] ?? null) : null,
  })) as ProductWithCategory[];
}

/**
 * slug로 단일 제품 + category 조회
 * 리뷰 상세 페이지 / generateStaticParams에서 사용
 */
export async function getProductBySlug(
  slug: string
): Promise<ProductWithCategory | null> {
  const supabase = await createSupabaseServerClient();
  const { data: rows, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug);

  if (error) {
    console.error("[getProductBySlug]", error.message);
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const product = (rows as any[])?.[0] as any;
  if (!product) return null;

  // category 정보 조회
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let category: Pick<Category, "slug" | "name_en"> | null = null;
  if (product.category_id) {
    const { data: catRows } = await supabase
      .from("categories")
      .select("slug, name_en")
      .eq("id", product.category_id as string);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cat = (catRows as any[])?.[0] as any;
    if (cat) category = { slug: cat.slug as string, name_en: cat.name_en as string };
  }

  return { ...product, category } as ProductWithCategory;
}

/**
 * 전체 product slug 목록 — generateStaticParams용
 * SSG 빌드타임에 모든 리뷰 페이지를 사전 생성
 */
export async function getAllProductSlugs(): Promise<string[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("slug");

  if (error) {
    console.error("[getAllProductSlugs]", error.message);
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[] ?? []).map((p: any) => p.slug as string);
}

/**
 * 카테고리별 관련 제품 조회 (리뷰 상세 하단 "Related Products"용)
 * 현재 slug를 제외하고 같은 카테고리에서 최대 4개
 */
export async function getRelatedProducts(
  categoryId: string,
  excludeSlug: string,
  limit = 4
): Promise<Product[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .neq("slug", excludeSlug)
    .order("rating", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[getRelatedProducts]", error.message);
    return [];
  }
  return (data ?? []) as Product[];
}

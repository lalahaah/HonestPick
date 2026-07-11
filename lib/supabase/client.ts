import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * 클라이언트 전용 Supabase 클라이언트
 * anon key 사용 → RLS 정책 적용됨 (공개 읽기만 가능)
 *
 * 주로 'use client' 컴포넌트에서 실시간 구독 등에 사용
 * 쓰기 작업(클릭 추적, 구독)은 반드시 API Route를 통해 서버에서 처리
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

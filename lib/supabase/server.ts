import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * 서버 전용 Supabase 클라이언트 팩토리
 * service_role 키 사용 → RLS 무시, 모든 테이블 접근 가능
 * SSG 빌드 타임 지원을 위해 쿠키 컨텍스트에 의존하지 않음.
 *
 * ⚠️  이 파일은 서버 컴포넌트 / Route Handler에서만 import할 것
 *     클라이언트 번들에 절대 포함 금지 (AGENTS.md §5 규칙)
 */
export async function createSupabaseServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // TODO(security): 서버 전용 — service_role 키는 .env.local에만 보관, 절대 클라이언트 노출 금지
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

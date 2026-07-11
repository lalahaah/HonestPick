import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * 서버 전용 Supabase 클라이언트
 * service_role 키 사용 → RLS 무시, 모든 테이블 접근 가능
 *
 * ⚠️  이 파일은 서버 컴포넌트 / Route Handler에서만 import할 것
 *     클라이언트 번들에 절대 포함 금지 (AGENTS.md §5 규칙)
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // TODO(security): 서버 전용 — service_role 키는 .env.local에만 보관
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

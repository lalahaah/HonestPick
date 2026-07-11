import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: '유효한 이메일 주소를 입력해주세요.' }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    // Insert into subscribers
    const { error } = await supabase
      .from('subscribers')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({ email, source: source || 'newsletter_form' } as any);

    if (error) {
      if (error.code === '23505') { // Postgres unique violation error code
        return NextResponse.json({ message: '이미 구독 중입니다.' }, { status: 200 });
      }
      throw error;
    }

    return NextResponse.json({ message: '구독이 완료되었습니다!' }, { status: 200 });
  } catch (error) {
    console.error('[API Subscribe]', error);
    return NextResponse.json({ error: '서버 에러가 발생했습니다.' }, { status: 500 });
  }
}

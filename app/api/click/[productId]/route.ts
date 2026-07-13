import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const headersList = await headers();
  const referer = headersList.get('referer') || null;
  // TODO: Get actual country from headers (e.g., Vercel's x-vercel-ip-country) or default to 'US'
  const country = headersList.get('x-vercel-ip-country') || 'US'; 
  
  const sessionId = headersList.get('x-session-id') || crypto.randomUUID();

  const supabase = await createSupabaseServerClient();
  
  // 1. Fetch product to get Amazon ASIN
  const { data: product } = await supabase
    .from('products')
    .select('amazon_asin')
    .eq('id', productId)
    .single();

  const p = product as { amazon_asin?: string } | null;

  if (!p || !p.amazon_asin) {
    return new NextResponse('Product or ASIN not found', { status: 404 });
  }

  // 2. Insert click record
  await supabase.from('clicks').insert({
    product_id: productId,
    referrer: referer,
    country: country,
    session_id: sessionId,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  // 3. Redirect to Amazon
  // TODO: 실제 아마존 어소시에이트 승인 후 태그 반영
  const amazonTag = process.env.AMAZON_ASSOCIATE_TAG || 'nextidealab-20';
  const amazonUrl = `https://www.amazon.com/dp/${p.amazon_asin}?tag=${amazonTag}`;

  return NextResponse.redirect(amazonUrl, 302);
}

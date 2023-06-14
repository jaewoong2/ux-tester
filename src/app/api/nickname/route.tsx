import { Database } from '@/types/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

type ResponseBody = { message?: string; status: number }

export async function POST(request: NextRequest): Promise<NextResponse<ResponseBody> | Response> {
  try {
    const requestData: { nickname: string } | null = await request.json()

    if (!requestData?.nickname) {
      return NextResponse.error()
    }

    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { data } = await supabase
      .from('user')
      .select('userId')
      .filter('nickname', 'eq', requestData.nickname)
      .single()

    if (data && data.userId) {
      return NextResponse.error()
    }

    return NextResponse.json({ message: '성공!', status: 200 })
  } catch (err) {
    return NextResponse.error()
  }
}

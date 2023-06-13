import { Database } from '@/types/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'
import { PrimaryItem } from '@/types'

function uuidv4(bytes: number) {
  return crypto.randomBytes(bytes).toString('hex')
}

type RequestData = Pick<PrimaryItem, 'optionValue' | 'itemKey'>
type ResponseBody = { uuid: string | null }

export async function POST(request: NextRequest): Promise<NextResponse<ResponseBody> | Response> {
  const requestData: RequestData[] | null = await request.json()
  const qs = new URLSearchParams(request.url)
  const nickname = qs.get('nickname')

  if (!requestData) {
    return NextResponse.error()
  }

  const stringifiedData = JSON.stringify(requestData)

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const data = await supabase.from('result').select('uuid').filter('json', 'eq', stringifiedData)

  if (data.data && data.data.length > 0) {
    return NextResponse.json({ uuid: data.data[0].uuid })
  }

  const uuid = uuidv4(20)
  const userId = uuidv4(10)

  await supabase.from('result').insert({ json: stringifiedData, result: '', uuid: `${uuid}` })
  await supabase.from('user').insert({ userId: `${userId}`, uuid: uuid, nickname: nickname })

  return NextResponse.json({ uuid: uuid })
}

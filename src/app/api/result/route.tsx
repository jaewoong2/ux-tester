import { Database } from '@/types/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import crypto from 'crypto'
import { PrimaryItem } from '@/types'

function uuidv4() {
  return crypto.randomBytes(20).toString('hex')
}

type RequestData = Pick<PrimaryItem, 'optionValue' | 'itemKey'>

type ResponseBody = { uuid: string | null }

export async function POST(request: NextRequest): Promise<NextResponse<ResponseBody> | Response> {
  const requestData: RequestData[] | null = await request.json()

  if (!requestData) {
    return NextResponse.error()
  }

  const stringifiedData = JSON.stringify(requestData)

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const data = await supabase.from('result').select('uuid').filter('json', 'eq', stringifiedData)

  if (data.data && data.data.length > 0) {
    return NextResponse.json({ uuid: data.data[0].uuid })
  }

  const uuid = uuidv4()
  await supabase.from('result').insert({ json: stringifiedData, result: '', uuid: uuid })
  return NextResponse.json({ uuid: uuid })
}

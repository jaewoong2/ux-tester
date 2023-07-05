import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

import { PrimaryItem } from '../../../types'
import { Database } from '../../../types/supabase'

type RequestData = { json: Pick<PrimaryItem, 'optionValue' | 'itemKey'>[]; nickname: string }
type ResponseBody = { uuid: string | null }

export async function POST(request: NextRequest): Promise<NextResponse<ResponseBody> | Response> {
  const requestData: RequestData | null = await request.json()

  if (!requestData) {
    return NextResponse.error()
  }

  const { json, nickname } = requestData

  if (!json || !nickname) {
    return NextResponse.error()
  }

  const stringifiedJSON = JSON.stringify(json)

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const data = await supabase.from('result').select('uuid').filter('json', 'eq', stringifiedJSON)
  const userId = uuidv4().slice(0, 12)

  if (data.data && data.data.length > 0) {
    await supabase.from('user').insert({ userId: `${userId}`, uuid: data.data[0].uuid, nickname: nickname })
    return NextResponse.json({ uuid: data.data[0].uuid, userId })
  }

  const uuid = uuidv4().slice(0, 12)

  await supabase.from('result').insert({ json: stringifiedJSON, result: '', uuid: `${uuid}` })
  await supabase.from('user').insert({ userId: `${userId}`, uuid: uuid, nickname: nickname })

  return NextResponse.json({ uuid, userId })
}

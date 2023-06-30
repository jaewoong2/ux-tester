import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

import { Database } from '../../../types/supabase'

function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const itemId = requestUrl.searchParams.get('itemId')

  if (itemId) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    await sleep()
    const data = await supabase.from('option').select('*').eq('item_id', itemId)
    return NextResponse.json(data)
  }

  return NextResponse.error()
}

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import isResultJson, { ResultJson } from '../lib/isResult'
import { Database } from '../types/supabase'

export const runtime = 'edge'

function sleep(ms?: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms ?? 1500)
  })
}

export const createServerSupabaseClient = (cache?: RequestInit['cache']) =>
  createServerComponentClient<Database>(
    { cookies },
    {
      options: {
        global: {
          fetch: (...rest) =>
            fetch(rest[0], {
              ...rest[1],
              cache: cache,
            }),
        },
      },
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  )

export async function getNickname(userId?: string) {
  const supabase = createServerSupabaseClient()
  try {
    if (!userId) {
      throw new Error('uuid is not defined')
    }
    const response = await supabase.from('user').select('*').or(`nickname.eq.${userId},userId.eq.${userId}`)

    await sleep()

    if (!response.data) {
      throw new Error('No data found')
    }

    if (response.data?.length === 0) {
      throw new Error('No data found')
    }

    if (response.data?.length > 1) {
      throw new Error('Unknown Error')
    }

    return {
      ...response,
      data: response.data[0],
    }
  } catch (err) {
    console.error(err)
  }
}

export async function getJsonByUuid(uuid?: string) {
  const supabase = createServerSupabaseClient()
  try {
    if (!uuid) {
      throw new Error('uuid is not defined')
    }
    const response = await supabase.from('result').select('json').eq('uuid', uuid)

    await sleep(3000)

    if (!response.data) {
      throw new Error('No data found')
    }

    return response
  } catch (err) {
    throw new Error('Error')
  }
}

export async function getAnswer(uuid?: string) {
  const supabase = createServerSupabaseClient()
  try {
    if (!uuid) {
      throw new Error('uuid is not defined')
    }

    const { data } = await supabase.from('result').select('json').eq('uuid', uuid)

    if (!data) {
      throw new Error('No data found')
    }

    const responsesPromises = data
      .filter((value) => value.json)
      .flatMap((value) => {
        const json = JSON.parse(value.json ?? '')
        return json.filter(isResultJson).flatMap((value: ResultJson) =>
          Object.keys(value.optionValue).map((key) => {
            return { itemKey: value.itemKey, optionKey: key, answer: value.optionValue[key] }
          })
        )
      })

    const responses = responsesPromises.map(({ itemKey, optionKey, answer }) => {
      return supabase.from('answer').select('*').eq('itemKey', itemKey).eq('optionKey', optionKey).eq('answer', answer)
    })

    return await Promise.all(responses)
  } catch (err) {
    throw new Error('Error')
  }
}

export async function getOptions(ItemId: number) {
  const supabase = createServerSupabaseClient()
  try {
    const options = await supabase.from('option').select('*').eq('item_id', ItemId)
    return options
  } catch (err) {
    console.error(err)
  }
}

export async function getItems() {
  const supabase = createServerSupabaseClient()
  try {
    const items = await supabase.from('item').select('*')
    return items
  } catch (err) {
    console.error(err)
  }
}

export async function getSession() {
  const supabase = createServerSupabaseClient()
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return session
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: userDetails } = await supabase.from('users').select('*').single()
    return userDetails
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getSubscription() {
  const supabase = createServerSupabaseClient()
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single()
      .throwOnError()
    return subscription
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' })

  if (error) {
    console.log(error.message)
  }
  return data ?? []
}

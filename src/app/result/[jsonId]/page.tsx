import React from 'react'
import { Metadata } from 'next'

import { getAnswer, getJsonByUuid, getNickname } from '../../../app/supabase-server'
import getOrderScore from '../../../lib/getOrderScore'
import ResultCards from './components/blocks/ResultCards'
import ResultTitle from './components/blocks/ResultTitle'
import { getArticles } from './utils'

export const config = {
  runtime: 'edge',
}

type Props = {
  params?: {
    jsonId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [jsonId] = params?.jsonId ? params?.jsonId.split('_') : ['', '']

  const json = await getJsonByUuid(jsonId)
  const result = await getAnswer(jsonId)
  const answers = result.flatMap((v) => v.data)
  const jsonData = json.data.flatMap((v) => JSON.parse(v.json ?? ''))

  if (!json || !result || answers.length === 0 || jsonData.length === 0) return {}

  const totalScore =
    getOrderScore(jsonData?.map(({ itemKey }) => itemKey)) +
    answers?.map((v) => (v?.score ? v?.score * 6.25 : 0))?.reduce((a, b) => a + b)

  return {
    openGraph: {
      images: getArticles(totalScore).image,
    },
  }
}

const Page = async ({ params }: Props) => {
  const [jsonId, userId] = params?.jsonId ? params?.jsonId.split('_') : ['', '']

  const json = await getJsonByUuid(jsonId)
  const result = await getAnswer(jsonId)
  const nickname = await getNickname(userId)
  const answers = result.flatMap((v) => v.data)
  const jsonData = json.data.flatMap((v) => JSON.parse(v.json ?? ''))

  return (
    <section className='flex h-full flex-col justify-center bg-slate-50'>
      {nickname?.status === 200 && (
        <>
          <ResultTitle
            nickname={nickname?.data.nickname ?? ''}
            orderScore={getOrderScore(jsonData.map(({ itemKey }) => itemKey))}
            optionScore={answers.map((v) => (v?.score ? v?.score * 6.25 : 0))?.reduce((a, b) => a + b)}
          />
          <ResultCards
            nickname={nickname?.data.nickname ?? ''}
            selected={jsonData}
            answers={answers}
            order={jsonData.map(({ itemKey }) => itemKey)}
          />
        </>
      )}
    </section>
  )
}

export default Page

import { getAnswer, getJsonByUuid, getNickname } from '@/app/supabase-server'
import getOrderScore from '@/lib/getOrderScore'
import React from 'react'
import ResultCards from './components/blocks/ResultCards'
import ResultTitle from './components/blocks/ResultTitle'
import { Metadata } from 'next'
import { getArticles } from './utils'

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

  const totalScore =
    getOrderScore(jsonData.map(({ itemKey }) => itemKey)) +
    answers.map((v) => (v?.score ? v?.score * 6.25 : 0)).reduce((a, b) => a + b)

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
    <section className='flex h-full flex-col justify-center overflow-scroll bg-slate-50'>
      {nickname?.status === 200 && (
        <>
          <ResultTitle
            nickname={nickname?.data.nickname ?? ''}
            orderScore={getOrderScore(jsonData.map(({ itemKey }) => itemKey))}
            optionScore={answers.map((v) => (v?.score ? v?.score * 6.25 : 0)).reduce((a, b) => a + b)}
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

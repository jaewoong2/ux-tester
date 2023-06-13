import { getAnswer, getJsonByUuid } from '@/app/supabase-server'
import getOrderScore from '@/lib/getOrderScore'
import React from 'react'
import ResultCards from './components/blocks/ResultCards'
import ResultTitle from './components/blocks/ResultTitle'

type Props = {
  params?: {
    key: string
    jsonId: string
  }
  searchParams?: {
    nickname?: string
  }
}

const Page = async ({ params, searchParams }: Props) => {
  const json = await getJsonByUuid(params?.jsonId)
  const result = await getAnswer(params?.jsonId)
  const answers = result.flatMap((v) => v.data)
  const a = json.data.flatMap((v) => JSON.parse(v.json ?? ''))

  return (
    <section className='h-full overflow-scroll'>
      <ResultTitle
        nickname={searchParams?.nickname}
        orderScore={getOrderScore(a.map((v) => v.itemKey))}
        optionScore={answers.map((v) => (v?.score ? v?.score * 5 : 0)).reduce((a, b) => a + b)}
      />
      <ResultCards answers={answers} />
    </section>
  )
}

export default Page

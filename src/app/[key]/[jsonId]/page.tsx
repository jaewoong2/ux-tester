import { getAnswer, getJsonByUuid, getNickname } from '@/app/supabase-server'
import getOrderScore from '@/lib/getOrderScore'
import React from 'react'
import ResultCards from './components/blocks/ResultCards'
import ResultTitle from './components/blocks/ResultTitle'

type Props = {
  params?: {
    key: string
    jsonId: string
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
    <section className='h-full overflow-scroll'>
      <ResultTitle
        nickname={nickname.data.nickname ?? ''}
        orderScore={getOrderScore(jsonData.map(({ itemKey }) => itemKey))}
        optionScore={answers.map((v) => (v?.score ? v?.score * 5 : 0)).reduce((a, b) => a + b)}
      />
      <ResultCards answers={answers} />
    </section>
  )
}

export default Page

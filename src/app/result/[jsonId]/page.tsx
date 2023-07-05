import React from 'react'
import { Metadata } from 'next'

import { getAnswer, getJsonByUuid, getNickname } from '../../../app/supabase-server'
import getOrderScore from '../../../lib/getOrderScore'
import ResultCards from './components/blocks/ResultCards'
import ResultTitle from './components/blocks/ResultTitle'
import { getArticles } from './utils'
import ErrorComponent from '@/app/error'
import { METADATA } from '@/constants'

type Props = {
  params?: {
    jsonId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [jsonId, userId] = params?.jsonId ? params?.jsonId.split('_') : ['', '']
  const json = await getJsonByUuid(jsonId)
  const result = await getAnswer(jsonId)
  const answers = result?.flatMap((v) => v.data)
  const jsonData = json?.data.flatMap((v) => JSON.parse(v.json ?? ''))

  const nickname = await getNickname(userId)
  if (!json || !result || answers?.length === 0 || jsonData?.length === 0) return {}

  if (!jsonData || !answers) {
    return {
      openGraph: {
        images: METADATA.openGraph?.images,
        title: '나만의 회원가입 UX 테스트',
        description: `${nickname?.data.nickname}님의 결과를 확인 해보고, 회원가입 UX 테스트를 해보세요!`,
      },
    }
  }

  const totalScore =
    getOrderScore(jsonData?.map(({ itemKey }) => itemKey)) +
    answers?.map((v) => (v?.score ? v?.score * 6.25 : 0))?.reduce((a, b) => a + b)

  return {
    openGraph: {
      images: getArticles(totalScore).image,
      title: '나만의 회원가입 UX 테스트',
      description: `${nickname?.data.nickname}님의 결과를 확인 해보고, 회원가입 UX 테스트를 해보세요!`,
    },
  }
}

const Page = async ({ params }: Props) => {
  const [jsonId, userId] = params?.jsonId ? params?.jsonId.split('_') : ['', '']

  const json = await getJsonByUuid(jsonId)
  const result = await getAnswer(jsonId)
  const nickname = await getNickname(userId)

  if (!result || !json) {
    return <ErrorComponent />
  }

  const answers = result.flatMap((v) => v.data)
  const jsonData = json.data.flatMap((v) => JSON.parse(v.json ?? ''))

  const totalScore =
    getOrderScore(jsonData?.map(({ itemKey }) => itemKey)) +
    answers?.map((v) => (v?.score ? v?.score * 6.25 : 0))?.reduce((a, b) => a + b)

  const { description, image, imageCaption, medal } = getArticles(totalScore)

  return (
    <section className='flex h-full flex-col justify-center bg-slate-50'>
      {nickname?.status === 200 && (
        <>
          <ResultTitle
            image={image}
            description={description}
            medal={medal}
            imageCaption={imageCaption}
            nickname={nickname?.data.nickname ?? ''}
            orderScore={getOrderScore(jsonData.map(({ itemKey }) => itemKey))}
            optionScore={answers.map((v) => (v?.score ? v?.score * 6.25 : 0))?.reduce((a, b) => a + b)}
          />
          <ResultCards
            nickname={nickname?.data.nickname ?? ''}
            selected={jsonData}
            answers={answers}
            description={description}
            image={image}
            order={jsonData.map(({ itemKey }) => itemKey)}
          />
        </>
      )}
    </section>
  )
}

export default Page

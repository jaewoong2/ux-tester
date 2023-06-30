import React from 'react'
import MainBlock from './components/blocks/MainBlock'
import OptionBlock from './components/blocks/OptionBlock'
import { getItems, getNickname } from '../supabase-server'
import { METADATA } from '../../constants'
import { notFound } from 'next/navigation'

type Props = {
  searchParams: {
    nickname?: string
  }
}

export const metadata = {
  ...METADATA,
  title: '나의 회원가입 UX 테스트 | 순서 정하기',
}

const Page = async ({ searchParams }: Props) => {
  const item = await getItems()
  const nickname = await getNickname(searchParams.nickname)

  if (searchParams.nickname && nickname) {
    notFound()
  }

  return (
    <>
      <MainBlock items={item?.data} nickname={searchParams.nickname} />
      <OptionBlock />
    </>
  )
}

export default Page

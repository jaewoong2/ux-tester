import React from 'react'
import Link from 'next/link'

import MainBlock from './components/blocks/MainBlock'
import OptionBlock from './components/blocks/OptionBlock'
import { getItems, getNickname } from '../supabase-server'
import { METADATA } from '../../constants'

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
    return (
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <div className='flex flex-col items-start'>
          <div className='text-xl font-bold'>잘못된 접근</div>
          <div className='font-semibold text-gray-600'>- 사용중인 닉네임입니다</div>
          <Link
            href={'/'}
            className='mt-4 w-fit rounded-lg bg-slate-200 p-3 px-6 text-sm font-bold shadow-lg hover:bg-slate-300'
          >
            돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <MainBlock items={item?.data} nickname={searchParams.nickname} />
      <OptionBlock />
    </>
  )
}

export default Page

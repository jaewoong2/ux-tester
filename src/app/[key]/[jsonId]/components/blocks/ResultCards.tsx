'use client'
import { Database } from '@/types/supabase'
import React from 'react'
import ResultCard from '../atoms/ResultCard'
import useScrollButton from '@/app/[key]/hooks/useScrollButton'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { CgLink } from 'react-icons/cg'
import KakaoIcon from '@/app/[key]/components/Icons/KakaoIcon'
import { useAppDispatch } from '@/store/hooks'
import { setNickName, setSelected, setStatus } from '@/store/slices/signupSlice'
import Link from 'next/link'
import { PrimaryItem } from '@/types'

type Props = {
  answers: (Database['public']['Tables']['answer']['Row'] | null)[]
  selected: (PrimaryItem & {
    currentValue: string
    isError: {
      rule?: boolean | null
      duplicate?: boolean | null
    }
  })[]
  nickname: string
}

const ResultCards = ({ answers, selected, nickname }: Props) => {
  const { handleClickScrollButton, isNextButtonVisible, isPrevButtonVisible, wrapper } =
    useScrollButton<HTMLDivElement>()

  const dispatch = useAppDispatch()

  const handleClickCTA = () => {
    dispatch(setStatus({ status: '완료' }))
    dispatch(setSelected({ selected: selected }))
    dispatch(setNickName({ nickname }))
  }

  const handleClickReplay = () => {
    dispatch(setStatus({ status: '순서' }))
    dispatch(setSelected({ selected: [] }))
    dispatch(setNickName({ nickname: '' }))
  }

  return (
    <div className='relative flex w-full flex-col gap-4'>
      <div className='flex w-full flex-col items-center justify-center p-4'>
        <Link href={'/signup'} onClick={handleClickCTA} className='w-full'>
          <button
            className='w-full rounded-xl bg-blue-500 bg-opacity-70 p-4 text-sm font-bold text-white shadow-lg hover:bg-blue-400'
            onClick={handleClickCTA}
          >
            내가 만든 회원가입 체험하기
          </button>
        </Link>
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-sm font-semibold'>공유하기</h1>
        <div className='flex gap-2'>
          <button className='w-fit rounded-full bg-slate-100 p-2 shadow-md transition-transform hover:-translate-y-1'>
            <CgLink className='h-6 w-6 text-blue-400' />
          </button>
          <button className='w-fit rounded-full bg-yellow-300 p-2 shadow-md transition-transform hover:-translate-y-1'>
            <KakaoIcon className='h-6 w-6 text-blue-400' />
          </button>
        </div>
      </div>
      <div className='flex w-full flex-col items-center justify-center p-4'>
        <Link href={'/'} onClick={handleClickReplay} className='w-full'>
          <button
            className='w-full rounded-xl bg-green-500 bg-opacity-70 p-4 text-sm font-bold text-white shadow-lg hover:bg-green-400'
            onClick={handleClickReplay}
          >
            다시 해볼까요?
          </button>
        </Link>
      </div>
      <h2 className='p-5 text-lg font-bold'>더 자세히 알아 볼까요?</h2>
      <div className='flex w-full gap-5 overflow-scroll p-5 py-10 pt-0' ref={wrapper}>
        {answers?.map((answer) => (
          <ResultCard
            answer={answer?.answerTitle}
            description={answer?.description}
            isGood={Boolean(answer?.score)}
            key={answer?.id}
            subTitle={answer?.optionTitle}
            title={answer?.title}
          />
        ))}
        {isPrevButtonVisible && (
          <div className='absolute left-0 top-0 flex h-full items-center'>
            <button
              type='button'
              onClick={() => handleClickScrollButton(-320)}
              className='z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 p-0 text-xl shadow-md hover:bg-slate-100'
            >
              <ChevronLeftIcon />
            </button>
          </div>
        )}
        {isNextButtonVisible && (
          <div className='absolute right-0 top-0 flex h-full items-center'>
            <button
              type='button'
              onClick={() => handleClickScrollButton(320)}
              className='z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 p-0 text-xl shadow-md hover:bg-slate-100'
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResultCards

'use client'
import useIncreseNumber from '@/app/[key]/hooks/useIncreseNumber'
import React from 'react'

type Props = {
  optionScore: number
  orderScore: number
  nickname?: string
}

const ResultTitle = ({ optionScore, orderScore, nickname }: Props) => {
  const total = useIncreseNumber(optionScore + orderScore)
  const order = useIncreseNumber(orderScore)
  const option = useIncreseNumber(optionScore)

  return (
    <>
      <h1 className='animate-fade-right p-5 pb-0 text-lg font-bold'>{nickname}님의 점수 에요</h1>
      <div className='flex animate-fade-right px-5 text-sm font-semibold text-gray-500'>
        당신은 UX 고수! 대단하시네요 😉
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-3 p-5'>
        <div className='grid w-full grid-cols-2 border-b border-t p-5'>
          <div className='relative flex items-start justify-center p-5'>
            <span className='absolute top-0 text-xs font-bold text-blue-500'>점수</span>
            <span className='text-2xl font-bold text-blue-500'>{total}</span>
          </div>
          <div className='relative flex items-start justify-center p-5'>
            <span className='absolute top-0 text-xs'>순서 점수</span>
            <span className='text-2xl font-semibold text-gray-600'>{order}</span>
          </div>
          <div className='relative flex items-start justify-center p-5'>
            <span className='absolute top-0 text-xs'>설정 점수</span>
            <span className='text-2xl font-semibold text-gray-600'>{option}</span>
          </div>
          <div className='relative flex items-start justify-center p-5'>
            <span className='absolute top-0 text-xs'>잘했어요</span>
            <div className='h-fit w-fit rounded-full shadow-2xl'>
              <div className='animate-wiggle text-3xl font-semibold text-gray-600 drop-shadow-xl animate-thrice'>
                🏅
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResultTitle

import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  title?: string | null
  subTitle?: string | null
  answer?: string | null
  description?: string | null
  isGood?: boolean | null
}

const ResultCard = ({ answer, description, isGood, subTitle, title }: Props) => {
  return (
    <div
      className={twMerge(
        'relative flex w-full flex-shrink-0 flex-col rounded-lg border border-opacity-60 bg-stone-100 pb-6 pt-3',
        'max-w-[300px]'
      )}
    >
      <div
        className={twMerge(
          'absolute left-0 top-0 h-2 w-full rounded-t-lg',
          isGood ? 'bg-blue-200' : 'bg-red-200',
          isGood === null && 'bg-green-200'
        )}
      />
      <div className='flex h-24 w-full items-center justify-between px-5'>
        <div>
          <h2 className='text-lg font-bold'>{title}</h2>
          <h3 className='text-sm font-semibold'>{subTitle}</h3>
        </div>
        <div className={`${isGood === null ? 'hidden' : ''}`}>
          {isGood ? (
            <div className='flex flex-col items-center justify-center gap-1'>
              <Image src={'/good.png'} width={50} height={50} alt='잘했어요' className='h-auto w-auto' />
              <span className='text-xs font-bold text-gray-500'>정답 이에요</span>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center gap-1'>
              <Image src={'/bad.png'} width={40} height={40} alt='아쉬워요' className='h-auto w-auto' />
              <span className='text-xs font-bold text-gray-500'>아쉬워요</span>
            </div>
          )}
        </div>
      </div>
      <div className='mx-auto h-72 w-[calc(100%-40px)] overflow-scroll rounded-md border border-black bg-gray-600'>
        <div className='relative z-[11] flex w-full items-center justify-center gap-2 border-b border-gray-500 bg-gray-600 p-3 text-sm'>
          <div className='flex aspect-square h-[32px] w-[32px] items-center justify-center rounded-md bg-pink-100'>
            😎
          </div>
          <div className='relative z-10 w-full text-white'>{answer}</div>
        </div>
        <div className='relative z-[11] flex w-full items-start justify-center gap-2 border-b border-gray-500 bg-gray-800 p-3 text-sm'>
          <div className='flex aspect-square h-[32px] w-[32px] items-center justify-center rounded-md bg-red-50 text-xs italic'>
            GPT
          </div>
          <div className='w-full text-sm text-white'>{description}</div>
        </div>
      </div>
    </div>
  )
}

export default ResultCard

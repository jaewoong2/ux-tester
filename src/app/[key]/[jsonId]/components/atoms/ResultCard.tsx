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
        'relative flex w-full flex-shrink-0 flex-col rounded-lg border border-opacity-60 bg-stone-100 px-5 py-3',
        'max-w-[300px]'
      )}
    >
      <div
        className={twMerge('absolute left-0 top-0 h-2 w-full rounded-t-lg', isGood ? 'bg-blue-200' : 'bg-red-200')}
      ></div>
      <div className='flex h-24 w-full items-center justify-between'>
        <div>
          <h2 className='text-lg font-bold'>{title}</h2>
          <h3 className='text-sm font-semibold'>{subTitle}</h3>
        </div>
        <div className=''>
          {isGood ? (
            <div className='flex flex-col items-center justify-center gap-1'>
              <Image src={'/good.png'} width={50} height={50} alt='잘했어요' />
              <span className='text-xs font-bold text-gray-500'>정답 이에요</span>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center gap-1'>
              <Image src={'/bad.png'} width={40} height={40} alt='아쉬워요' />
              <span className='text-xs font-bold text-gray-500'>아쉬워요</span>
            </div>
          )}
        </div>
      </div>
      <div className='relative flex w-full justify-center p-3 text-sm italic text-gray-600'>
        <div className='relative z-10 w-full'>{answer}</div>
      </div>
      <div className='py-10 text-sm text-gray-800'>{description}</div>
    </div>
  )
}

export default ResultCard

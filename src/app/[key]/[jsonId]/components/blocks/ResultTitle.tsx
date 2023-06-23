'use client'
import React from 'react'
import Image from 'next/image'

import useIncreseNumber from '@/app/[key]/hooks/useIncreseNumber'

type Props = {
  optionScore: number
  orderScore: number
  nickname?: string
}

const getArticles = (score: number) => {
  if (score >= 60) {
    return {
      image: '/fox.png',
      imageCaption: '금메달을 받아서 기쁜 여우',
      description: '당신은 UX 고수! 대단 하시네요',
      medal: '🥇',
    }
  }

  if (score >= 30) {
    return {
      image: '/penguin.png',
      imageCaption: '은메달 이지만, 자신과 비슷한 색이라 신난 펭귄',
      description: '당신은 UX 중수 잘했어요!',
      medal: '🥈',
    }
  }

  return {
    image: '/cat.png',
    imageCaption: '메달을 못받았지만 행복한 고양이',
    description: '고생했어요',
    medal: '🥉',
  }
}

const ResultTitle = ({ optionScore, orderScore, nickname }: Props) => {
  const total = useIncreseNumber(optionScore + orderScore)
  const order = useIncreseNumber(orderScore)
  const option = useIncreseNumber(optionScore)
  const { description, image, imageCaption, medal } = getArticles(optionScore + orderScore)

  return (
    <>
      <h1 className='animate-fade-right p-5 pb-0 text-lg font-bold'>{nickname}님의 점수 에요</h1>
      <div className='flex animate-fade-right px-5 text-sm font-semibold text-gray-500'>{description}</div>
      <figure className='flex w-full flex-col items-center justify-center'>
        <Image src={image} width={250} height={250} alt='hero' className='drop-shadow-lg' />
        <figcaption>
          <span className='SUITE-Regular text-sm text-gray-600'>{nickname} 님은</span>
          <div className='rounded-xl bg-blue-50 p-2 px-4'>
            <span className='SUITE-Regular text-xl font-bold text-stone-700'>{imageCaption}</span>
          </div>
        </figcaption>
      </figure>
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
            <div className='h-fit w-fit rounded-full shadow-2xl hover:animate-wiggle'>
              <div className='animate-wiggle text-3xl font-semibold text-gray-600 drop-shadow-xl animate-thrice'>
                {medal}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResultTitle

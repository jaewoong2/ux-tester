import { getAnswer, getJsonByUuid } from '@/app/supabase-server'
import getOrderScore from '@/lib/getOrderScore'
import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  params?: {
    key: string
    jsonId: string
  }
  searchParams?: any
}

const Page = async ({ params }: Props) => {
  const json = await getJsonByUuid(params?.jsonId)
  const result = await getAnswer(params?.jsonId)
  const answers = result.flatMap((v) => v.data)

  const a = json.data.flatMap((v) => JSON.parse(v.json ?? ''))

  return (
    <section>
      <h1 className='p-5 pb-0 text-lg font-bold'>결과와 함께 점수를 알려드릴께요 :)</h1>
      <div className='relative flex w-full flex-col items-center justify-center gap-3 p-5'>
        <span className='rounded-xl p-5 text-4xl text-black'>
          {answers.map((v) => (v?.score ? v?.score * 5 : 0)).reduce((a, b) => a + b) +
            getOrderScore(a.map((v) => v.itemKey))}
        </span>
        <span className='text-sm'>조금 치시는데요?</span>
        <div className='absolute flex h-full w-full items-center'>
          <div className='h-2 w-full'></div>
        </div>
      </div>
      <div className='flex w-full gap-5 overflow-scroll p-5 py-10 pt-0 md:px-24'>
        {answers.map((v) => (
          <div
            key={v?.id}
            className={twMerge(
              'relative flex w-full flex-shrink-0 flex-col rounded-lg border border-opacity-60 bg-stone-100 px-5 py-3'
            )}
          >
            <div
              className={twMerge(
                'absolute left-0 top-0 h-2 w-full rounded-t-lg',
                v?.score ? 'bg-blue-200' : 'bg-red-200'
              )}
            ></div>
            <div className='flex h-24 w-full items-center justify-between'>
              <div>
                <h2 className='text-lg font-bold'>{v?.title}</h2>
                <h3 className='text-sm font-semibold'>{v?.optionTitle}</h3>
              </div>
              <div className=''>
                {v?.score ? (
                  <Image src={'/good.png'} width={90} height={90} alt='잘했어요' />
                ) : (
                  <Image src={'/bad.png'} width={40} height={40} alt='아쉬워요' />
                )}
              </div>
            </div>
            <div className='relative flex w-full justify-center p-3 text-sm italic text-gray-600'>
              <div className=''></div>
              <div className='relative z-10 w-full'>{v?.answerTitle}</div>
            </div>
            <div className='py-10 text-sm text-gray-800'>{v?.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Page

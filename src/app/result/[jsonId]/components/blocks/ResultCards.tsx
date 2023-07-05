'use client'
import React, { useMemo, useState } from 'react'
import { CgLink } from 'react-icons/cg'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Tooltip } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

import { FcInfo } from 'react-icons/fc'
import Link from 'next/link'

import { Database } from '../../../../../types/supabase'
import useScrollButton from '../../../../../app/[key]/hooks/useScrollButton'
import KakaoIcon from '../../../../../app/[key]/components/Icons/KakaoIcon'
import { useAppDispatch } from '../../../../../store/hooks'
import { setNickName, setSelected, setStatus } from '../../../../../store/slices/signupSlice'
import { PrimaryItem } from '../../../../../types'

import ResultCard from '../atoms/ResultCard'
import { ORDER_DESCRIPTION, getOrderName } from '../../utils'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'
import { BASEURL } from '../../../../../constants'

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
  order: string[]
}

const ResultCards = ({ answers, selected, nickname, order }: Props) => {
  const pathname = usePathname()
  const { handleClickScrollButton, isNextButtonVisible, isPrevButtonVisible, wrapper } =
    useScrollButton<HTMLDivElement>()

  const copy = useCopyToClipboard()
  const [copySuccess, setCopySuccess] = useState(false)

  const orders = useMemo(() => getOrderName(order).join('→'), [order])

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

  const handleShareButton = () => {
    copy(BASEURL + pathname)
    setCopySuccess(true)
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
          <Tooltip
            label='클립 보드에 복사 하였어요'
            fontSize='sm'
            hasArrow
            isOpen={copySuccess}
            bg='gray.300'
            color='black'
            className='z-[12] px-4 py-2 font-bold'
            direction='rtl'
            placement='top'
            onOpen={() => {
              setTimeout(() => {
                setCopySuccess(false)
              }, 1000)
            }}
            borderRadius={'12px'}
          >
            <button
              className='w-fit rounded-full bg-slate-100 p-2 shadow-md transition-transform hover:-translate-y-1'
              onClick={handleShareButton}
            >
              <CgLink className='h-6 w-6 text-blue-400' />
            </button>
          </Tooltip>
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
      <h2 className='p-5 pb-0 pt-3 text-lg font-bold'>더 자세히 알아 볼까요?</h2>
      <div className='flex w-full gap-5 overflow-scroll p-5 pb-0 pt-0' ref={wrapper}>
        <ResultCard
          answer={orders}
          description={ORDER_DESCRIPTION}
          isGood={null}
          key={'order'}
          subTitle={'정보를 받는 순서'}
          title={'입력 필드 순서'}
        />
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
              className='z-[12] flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 p-0 text-xl shadow-md hover:bg-slate-100'
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
              className='z-[12] flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 p-0 text-xl shadow-md hover:bg-slate-100'
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </div>
      <div className='ml-5 rounded-lg bg-blue-200 p-5 shadow-lg'>
        <div className='flex items-center gap-2 text-lg '>
          <FcInfo />
          <h2 className='font-bold'>재밌게 즐기셨나요?</h2>
        </div>
        <strong className='w-full text-sm font-semibold text-gray-800'>
          UI/UX 에 정답은 없으며, 사용자의 필요와 서비스에 맞게 개선하고 변화해야 해요. 재미로 즐겨주세요 :)
        </strong>
      </div>
    </div>
  )
}

export default ResultCards

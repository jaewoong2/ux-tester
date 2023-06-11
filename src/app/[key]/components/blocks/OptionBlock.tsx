'use client'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import Drawer from './Drawer'
import { useMediaQuery } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { handleChangeOptions, nextCurrent, prevCurrent, setOptionsMap, setStatus } from '@/store/slices/signupSlice'
import markdownToHtml from '@/lib/markdownToHtml'
import useGetOptions from '../../hooks/useGetOptions'
import CheckIcon from '@/components/Icons/CheckIcon'
import Image from 'next/image'

const sleep = () =>
  new Promise((reslove) =>
    setTimeout(() => {
      reslove(true)
    }, 1000)
  )

const OptionBlockContents = () => {
  const { optionsMap, currentIndex, selected } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()
  const { data: options } = useGetOptions({ itemId: Number(selected[currentIndex]?.id) })
  const [clickedIndex, setClickedIndex] = useState(-1)

  const optionIndex = currentIndex in optionsMap ? optionsMap[currentIndex] : 0
  const target = options?.[optionIndex]

  const handleClickButton = useCallback(
    (step: number, option?: { key: string; value: string }) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (clickedIndex > -1) return

      if (option) {
        setClickedIndex(+e.currentTarget.id)
        await sleep()
        setClickedIndex(-1)
        dispatch(handleChangeOptions({ key: option.key, value: option.value }))
      }

      if (optionIndex + step === -1) {
        dispatch(prevCurrent())
        dispatch(setOptionsMap({ selectedIndex: currentIndex, optionIndex }))
        return
      }

      if (optionIndex + step === options?.length) {
        dispatch(nextCurrent())
        dispatch(setOptionsMap({ selectedIndex: currentIndex, optionIndex }))
        return
      }

      dispatch(setOptionsMap({ selectedIndex: currentIndex, optionIndex: optionIndex + step }))
    },
    [currentIndex, dispatch, optionIndex, options?.length, clickedIndex]
  )

  const handleClickCTA = () => {
    dispatch(setStatus({ status: '완료' }))
  }

  if (currentIndex >= selected.length) {
    return (
      <div className='h-full w-full'>
        <h2 className='text-xl font-bold'>회원가입 과정을 만드셨어요!</h2>
        <div className='flex w-full scale-x-[-1] items-center justify-center p-10 pt-5'>
          <Image src={'/heart.gif'} alt='thumbUp' width='200' height={'200'} />
          <span className='sr-only'>
            <a href='https://www.flaticon.com/free-animated-icons/like' title='like animated icons'>
              Like animated icons created by Freepik - Flaticon
            </a>
          </span>
        </div>
        <div className='flex animate-fade-in-left flex-col'>
          <Button className='w-full bg-blue-500 text-white' colorScheme='twitter' onClick={handleClickCTA}>
            확인
          </Button>
          <label className='flex w-full justify-end text-xs'>내가 만든 회원가입 진행 하고, 점수 확인 할까요?</label>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={'flex w-full flex-col gap-5 '}>
        <div className='flex w-full items-center justify-between'>
          <button type='button' onClick={handleClickButton(-1)}>
            <FaArrowLeft className='text-xl' cursor={'pointer'} />
          </button>
          <p className='text-xs text-gray-600'>
            {optionIndex + 1}/{options?.length}
          </p>
        </div>
        <div>
          <h2 className='text-xl font-bold'>{target?.title}</h2>
          <p className='text-sm text-gray-600'>{target?.description}</p>
        </div>
      </div>
      <section className='w-full '>
        <div className='flex w-full flex-col gap-2'>
          {target?.values?.map((value: any, index: number) => (
            <div key={value.key}>
              <Button
                id={`${index}`}
                onClick={handleClickButton(1, {
                  key: `${target.key}`,
                  value: value.value,
                })}
                type='button'
                colorScheme='twitter'
                className='flex min-h-[3rem] w-full justify-start gap-2 whitespace-break-spaces bg-blue-500 text-left text-sm font-normal text-white'
              >
                {clickedIndex === index && <CheckIcon variant='white' isSuccess={true} className='blue h-5 w-5' />}
                <span>{index + 1}.</span>
                {markdownToHtml(value.content)}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const OptionBlock = () => {
  const { status } = useAppSelector((state) => state.signup)
  const [isMobile, drawerLeft] = useMediaQuery(['(max-width: 720px)', '(max-width: 1300px)'])
  const [optionStatus, setOptionStauts] = useState<
    'normal' | 'animate-fade-out-up' | 'hidden' | 'animate-fade-in-down'
  >('normal')
  const { onOpen, isOpen, onClose, ...rest } = useDisclosure()

  useEffect(() => {
    if (status === '완료') {
      setOptionStauts('animate-fade-out-up')
      onClose()

      setTimeout(() => {
        setOptionStauts('hidden')
      }, 500)
    } else {
      setOptionStauts('animate-fade-in-down')
      onOpen()
    }
  }, [onClose, onOpen, status])

  if (status === '순서') {
    return null
  }

  return drawerLeft ? (
    <Drawer
      placement={!isMobile ? 'left' : 'bottom'}
      contents={{}}
      size={'sm'}
      onOpen={onOpen}
      defaultIsOpen={true}
      id={'drawer'}
      isOpen={isOpen}
      onClose={onClose}
      {...rest}
    >
      <Suspense fallback={<div>로딩중...</div>}>
        <OptionBlockContents />
      </Suspense>
    </Drawer>
  ) : (
    <div
      className={`absolute right-full top-5 mr-10 flex w-[350px] flex-col gap-16 rounded-xl border bg-white p-10 ${optionStatus}`}
    >
      <Suspense fallback={<div>로딩중...</div>}>
        <OptionBlockContents />
      </Suspense>
    </div>
  )
}

export default OptionBlock

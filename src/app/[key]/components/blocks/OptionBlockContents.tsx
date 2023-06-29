import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'
import { twMerge } from 'tailwind-merge'
import { FaArrowLeft } from 'react-icons/fa'

import markdownToHtml from '../../../../lib/markdownToHtml'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import {
  handleChangeOptions,
  prevCurrent,
  setOptionsMap,
  nextCurrent,
  setStatus,
} from '../../../../store/slices/signupSlice'
import useGetOptions from '../../hooks/useGetOptions'
import usePostResult from '../../hooks/usePostResult'
import CheckIcon from '../Icons/CheckIcon'
import { IMAGE } from '../../../../constants'

const sleep = () =>
  new Promise((reslove) =>
    setTimeout(() => {
      reslove(true)
    }, 1000)
  )

const OptionBlockContents = () => {
  const { optionsMap, currentIndex, selected, nickname } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()
  const { data: options } = useGetOptions({ itemId: Number(selected[currentIndex]?.id) })
  const [clickedIndex, setClickedIndex] = useState(-1)
  const { trigger } = usePostResult()

  const navigator = useRouter()
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

  const handleClickCTA = async () => {
    try {
      const response = await trigger({ json: selected.map(({ currentValue, ...rest }) => rest), nickname: nickname })
      navigator.push(`/result/${response?.uuid}_${response?.userId}`)
      dispatch(setStatus({ status: '결과' }))
    } catch (err) {
      console.error(err)
    }
  }

  if (currentIndex >= selected.length) {
    return (
      <div className='h-full w-full p-4'>
        <h2 className='text-xl font-bold'>회원가입 과정을 만드셨어요!</h2>
        <div className='flex w-full scale-x-[-1] items-center justify-center p-8 pt-5'>
          <div className='aspect-square h-auto w-[140px]'>
            <Image
              src={IMAGE.heart}
              alt='thumbUp'
              width='140'
              height='140'
              className='h-auto w-auto'
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Ww8AAn8BfiZXqxQAAAAASUVORK5CYII='
            />
          </div>
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
    <div className='flex h-full w-full flex-col gap-10 p-5'>
      <div className={'flex w-full flex-col gap-5 '}>
        <div className='flex w-full items-center justify-between'>
          <button type='button' onClick={handleClickButton(-1)}>
            <FaArrowLeft className='text-xl' cursor={'pointer'} />
          </button>
          <p className='text-xs text-gray-600'>
            {optionIndex + 1}/{options?.length}
          </p>
        </div>
        <div className='flex w-full items-center justify-between'>
          <div>
            <h2 className='text-xl font-bold'>{target?.title}</h2>
            <p className='text-sm text-gray-600'>{target?.description}</p>
          </div>
          {target?.icon && (
            <Image src={target?.icon} width={60} height={40} className='h-auto w-auto max-w-[60px]' alt='icon' />
          )}
        </div>
      </div>
      <section className='w-full'>
        <div className='flex w-full flex-col justify-center gap-2'>
          {target?.values?.map((value: any, index: number) => (
            <div key={value.key} className='w-full'>
              <Button
                id={`${index}`}
                onClick={handleClickButton(1, {
                  key: `${target.key}`,
                  value: value.value,
                })}
                type='button'
                colorScheme='twitter'
                className={twMerge(
                  'flex h-full min-h-[3rem] w-full justify-start gap-2',
                  'whitespace-break-spaces bg-blue-500 text-left text-sm font-normal text-white'
                )}
              >
                <div className='flex items-center gap-2'>
                  {clickedIndex === index && <CheckIcon variant='white' isSuccess={true} className='blue h-5 w-5' />}
                  {markdownToHtml(value.content)}
                </div>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default OptionBlockContents

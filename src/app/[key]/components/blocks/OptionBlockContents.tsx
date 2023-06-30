import React, { useCallback, useState } from 'react'
import Image from 'next/image'
import { Button } from '@chakra-ui/react'
import { twMerge } from 'tailwind-merge'
import { FaArrowLeft } from 'react-icons/fa'

import markdownToHtml from '../../../../lib/markdownToHtml'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { handleChangeOptions, prevCurrent, setOptionsMap, nextCurrent } from '../../../../store/slices/signupSlice'
import useGetOptions from '../../hooks/useGetOptions'
import CheckIcon from '../Icons/CheckIcon'

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

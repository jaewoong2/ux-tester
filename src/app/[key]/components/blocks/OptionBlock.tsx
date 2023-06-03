'use client'
import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import Drawer from './Drawer'
import { useMediaQuery } from '@chakra-ui/react'
import { useAppSelector } from '@/store/hooks'

type Props = {
  options: any
}

const OptionBlockContents = ({ options }: Props) => {
  const [optionIndex, setOptionIndex] = useState(0)
  const target = options.data[optionIndex]

  const handleClickButton = (step: number) => {
    if (optionIndex + step === -1) return
    if (optionIndex + step === options.data.length) return
    setOptionIndex((prev) => prev + step)
  }

  return (
    <>
      <div className={'flex w-full flex-col gap-5 '}>
        <FaArrowLeft className='text-xl' onClick={() => handleClickButton(-1)} cursor={'pointer'} />
        <div>
          <h2 className='text-xl font-bold'>{target.title}</h2>
          <p className='text-sm text-gray-600'>{target.description}</p>
        </div>
      </div>
      <form className='w-full'>
        <div className='flex w-full flex-col gap-2'>
          {target.values.map((value: any, index: number) => (
            <div key={value.key}>
              <Button
                onClick={() => handleClickButton(1)}
                type='button'
                colorScheme='twitter'
                className='flex min-h-[3rem] w-full justify-start gap-2 whitespace-break-spaces bg-blue-500 text-left font-normal text-white'
              >
                <span>{index + 1}.</span>
                {value.content}
              </Button>
            </div>
          ))}
        </div>
      </form>
    </>
  )
}

const OptionBlock = ({ options }: Props) => {
  const { status } = useAppSelector((state) => state.signup)
  const [isMobile, drawerLeft] = useMediaQuery(['(max-width: 720px)', '(max-width: 1300px)'])

  if (status !== '설정') return null

  return drawerLeft ? (
    <Drawer placement={!isMobile ? 'left' : 'bottom'} contents={{}} size={'sm'}>
      <OptionBlockContents options={options} />
    </Drawer>
  ) : (
    <div className='absolute right-full top-5 mr-10 flex w-[350px] flex-col gap-16 rounded-xl border bg-white p-10'>
      <OptionBlockContents options={options} />
    </div>
  )
}

export default OptionBlock

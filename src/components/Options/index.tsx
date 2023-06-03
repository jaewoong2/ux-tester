'use client'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { nextCurrent, prevCurrent, setStatus } from '@/store/slices/signupSlice'
import { Button, FormLabel, Input, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'
import Bottom from '../Bottom'
import Contents from './Contents'

function markdownToHtml(str: string) {
  const boldRegExp = /\*\*(.*?)\*\*/g
  const value = str.split(boldRegExp)

  if (value.length > 1) {
    return (
      <div className='flex gap-1'>
        {value
          .splice(1)
          .map((text, index) => (index % 2 === 0 ? <strong key={text}>{text}</strong> : <p key={text}>{text}</p>))}
      </div>
    )
  }

  return str
}

const Options = () => {
  const { selected, status, currentIndex } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  const target = selected[currentIndex]

  if (status !== '설정') return <div />

  return (
    <aside className='absolute right-full top-0 flex w-full max-w-md justify-center p-10'>
      <div className='flex h-fit w-full flex-col gap-2 rounded-xl border px-5 py-10'>
        <Contents />
        <div className='flex w-full gap-4'>
          <Bottom />
        </div>
      </div>
    </aside>
  )
}

export default Options

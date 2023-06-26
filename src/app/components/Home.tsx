'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Input, Spinner } from '@chakra-ui/react'
import { twMerge } from 'tailwind-merge'

import { useAppDispatch } from '@/store/hooks'
import { reset } from '@/store/slices/signupSlice'
import NicknameForm from './NicknameForm'
import Banner from './Banner'

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div className='flex h-full w-full flex-col'>
      <Banner>
        <div className='PyeongChangPeace-Bold text-3xl'>
          나만의 <br /> 회원가입 UX 테스트
        </div>
      </Banner>
      <NicknameForm />
    </div>
  )
}

export default Home

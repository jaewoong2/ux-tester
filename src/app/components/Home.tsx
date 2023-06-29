'use client'
import React, { useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { reset } from '../../store/slices/signupSlice'
import Banner from './Banner'

const Home = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div className='flex h-full w-full flex-col'>
      <Banner />
    </div>
  )
}

export default Home

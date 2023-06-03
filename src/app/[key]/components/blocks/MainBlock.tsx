'use client'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { init } from '@/store/slices/signupSlice'
import { PrimaryItem } from '@/types'
import OrderSetting from './OrderSetting'
import OptionSetting from './OptionSetting'

type Props = {
  items: PrimaryItem[] | undefined | null
}

const MainBlock = ({ items }: Props) => {
  const { status } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (items) {
      dispatch(init({ items }))
    }
  }, [items, dispatch])

  return (
    <div className='relative flex h-full w-full max-w-lg flex-col border bg-white p-3'>
      {status === '순서' && <OrderSetting />}
      {status === '설정' && <OptionSetting />}
    </div>
  )
}

export default MainBlock

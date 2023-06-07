'use client'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { init } from '@/store/slices/signupSlice'
import OrderSetting from './OrderSetting'
import OptionSetting from './OptionSetting'
import FinalSetting from './FinalSetting'
import { PrimaryItem } from '@/types'

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
  }, [])

  return (
    <>
      {status === '순서' && <OrderSetting />}
      {status === '설정' && <OptionSetting />}
      {status === '완료' && <FinalSetting />}
    </>
  )
}

export default MainBlock

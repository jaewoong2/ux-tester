'use client'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { init, setNickName } from '@/store/slices/signupSlice'
import OrderSetting from './OrderSetting'
import OptionSetting from './OptionSetting'
import FinalSetting from './FinalSetting'
import { PrimaryItem } from '@/types'
import { notFound } from 'next/navigation'

type Props = {
  items: PrimaryItem[] | undefined | null
  nickname?: string | null
}

const MainBlock = ({ items, nickname }: Props) => {
  const { status, ...state } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (items) {
      dispatch(init({ items }))
    }

    if (nickname) {
      dispatch(setNickName({ nickname }))
    }
  }, [nickname, items, dispatch])

  if (!state.nickname) {
    notFound()
  }

  return (
    <>
      {status === '순서' && <OrderSetting />}
      {status === '설정' && <OptionSetting />}
      {status === '완료' && <FinalSetting />}
    </>
  )
}

export default MainBlock

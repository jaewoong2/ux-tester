import React from 'react'
import MainBlock from '../blocks/MainBlock'
import { getItems } from '@/app/supabase-server'
import OptionBlock from '../blocks/OptionBlock'

const Main = async () => {
  const item = await getItems()

  return (
    <>
      <MainBlock items={item?.data} />
      <OptionBlock />
    </>
  )
}

export default Main

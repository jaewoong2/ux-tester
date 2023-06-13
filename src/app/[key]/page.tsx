import React from 'react'
import MainBlock from './components/blocks/MainBlock'
import OptionBlock from './components/blocks/OptionBlock'
import { getItems } from '../supabase-server'

const Page = async () => {
  const item = await getItems()

  return (
    <>
      <MainBlock items={item?.data} />
      <OptionBlock />
    </>
  )
}

export default Page

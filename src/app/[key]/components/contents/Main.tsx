import React, { PropsWithChildren } from 'react'
import MainBlock from '../blocks/MainBlock'
import { getItems } from '@/app/supabase-server'

const Main = async ({ children }: PropsWithChildren) => {
  const item = await getItems()

  return (
    <div className='relative min-w-[512px] max-sm:w-full max-sm:min-w-full'>
      <MainBlock items={item?.data} />
      {children}
    </div>
  )
}

export default Main

import React from 'react'
import Spinner from './components/Icons/Spinner'

const Loading = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
      <Spinner className='animate-spin text-2xl animate-duration-[2000]' />
      <span className='text-sm font-bold'>폼 만드는 중</span>
    </div>
  )
}

export default Loading

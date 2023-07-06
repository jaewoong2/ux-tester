import React from 'react'
import Spinner from '../Icons/Spinner'

const Loading = () => {
  return (
    <div className='flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-2'>
      <Spinner className='animate-spin text-xl' />
      <span className='text-xs'>잠시만 기다려주세요</span>
    </div>
  )
}

export default Loading

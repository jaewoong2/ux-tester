import { SpinnerIcon } from '@chakra-ui/icons'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex h-full min-h-[300px] w-full flex-col items-center justify-center gap-2'>
      <SpinnerIcon className='animate-spin text-xl' />
      <span className='text-xs'>준비중</span>
    </div>
  )
}

export default Loading

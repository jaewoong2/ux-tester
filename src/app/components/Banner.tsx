import Image from 'next/image'
import React, { PropsWithChildren } from 'react'

const Banner = ({ children }: PropsWithChildren) => {
  return (
    <div className='relative z-0 flex w-full items-center justify-center'>
      <div className='PyeongChangPeace-Bold absolute z-10 flex h-full w-full items-center justify-center text-center text-2xl text-blue-400'>
        {children}
      </div>
      <Image
        src={'/paper2.png'}
        width={520}
        height={1024}
        alt='background-image'
        className='h-auto w-auto drop-shadow-md'
        priority
      />
    </div>
  )
}

export default React.memo(Banner)

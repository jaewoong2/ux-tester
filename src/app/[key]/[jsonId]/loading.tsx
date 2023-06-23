import React from 'react'
import Image from 'next/image'

const Loading = () => {
  return (
    <div className='flex h-full w-full flex-col gap-10'>
      <div className='flex w-full justify-center'>
        <Image src={'/star.gif'} alt='회원가입완료 이미지' width={250} height={100} className='h-auto w-auto' />
      </div>
      <div className='flex w-full flex-col items-center p-10'>
        <div className='w-fit animate-fade-right'>
          <div className='text-md text-blue-400'>테스트가 완료 되었어요😀</div>
          <div className='text-lg font-semibold text-gray-700'>환영해요!</div>
        </div>
      </div>
    </div>
  )
}

export default Loading

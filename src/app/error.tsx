'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'

import { IMAGE } from '../constants'

const ErrorComponent = () => {
  const navigator = useRouter()

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-3'>
      <Image
        src={IMAGE.bad}
        width={128}
        height={128}
        alt='error'
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Ww8AAn8BfiZXqxQAAAAASUVORK5CYII='
      />
      <div className='flex flex-col gap-1 font-bold'>
        <span className='text-red-400'>오류가 발생 했어요</span>
        <Button onClick={() => navigator.back()} className='bg-red-200 hover:bg-red-300'>
          되돌아가기
        </Button>
      </div>
    </div>
  )
}

export default ErrorComponent

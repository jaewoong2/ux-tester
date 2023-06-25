'use client'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const ErrorComponent = () => {
  const navigator = useRouter()

  return (
    <main className='container mx-auto flex min-h-full justify-center'>
      <div className='relative mx-auto min-w-full max-w-[512px] max-sm:w-full max-sm:min-w-full'>
        <div className='relative mx-auto flex h-full w-full max-w-lg flex-col border-x-2 border-black bg-slate-50 p-3'>
          <div className='flex h-full w-full flex-col items-center justify-center gap-3'>
            <Image src={'/bad.png'} width={128} height={128} alt='error' />
            <div className='flex flex-col gap-1 font-bold'>
              <span className='text-red-400'>오류가 발생 했어요</span>
              <Button onClick={() => navigator.back()} className='bg-red-200 hover:bg-red-300'>
                되돌아가기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ErrorComponent

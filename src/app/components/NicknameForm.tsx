import React from 'react'
import useNickname from '../hooks/useNickname'
import { Input, Spinner } from '@chakra-ui/react'
import { twMerge } from 'tailwind-merge'
import CTAButton from './CTAButton'

const NicknameForm = () => {
  const { data, handleChange, handleClick, isLoading, nickname, status } = useNickname()

  return (
    <form className='flex flex-col gap-5 p-10 pb-4'>
      <div className='flex flex-col'>
        <label className='p-2 text-sm font-semibold'>닉네임을 정해주세요</label>
        <div className='relative'>
          <Input
            className={twMerge('w-full rounded-xl border-2 border-slate-200 p-5', data ? 'border-blue-400' : '')}
            placeholder='닉네임'
            value={nickname}
            onChange={handleChange}
            autoFocus
          />
          {isLoading && (
            <div className='absolute left-0 top-0 z-10 flex h-full w-full items-center justify-start gap-4 rounded-xl border-2 bg-slate-50 p-5'>
              <Spinner className='p-2' size={'sm'} color='gray' />
              {nickname}
            </div>
          )}
          {nickname && (
            <button onClick={handleClick} type='button'>
              <div className='absolute right-5 top-0 z-[11] flex h-full items-center'>&times;</div>
            </button>
          )}
        </div>
        {status === 'error' && (
          <div className='animate-fade-down px-2 py-1 text-xs text-red-400'>이미 존재하는 닉네임 입니다</div>
        )}
      </div>
      <CTAButton data={data} isLoading={isLoading} nickname={nickname} status={status} />
    </form>
  )
}

export default NicknameForm

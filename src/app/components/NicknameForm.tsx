import React from 'react'
import useNickname from '../hooks/useNickname'
import { Spinner } from '@chakra-ui/react'
import { twMerge } from 'tailwind-merge'
import CTAButton from './CTAButton'

const NicknameForm = () => {
  const { data, handleChange, handleClick, isLoading, nickname, status } = useNickname()

  return (
    <form className='flex flex-col items-end gap-5'>
      <div className='flex w-full flex-col'>
        <div className='relative w-full px-5'>
          <input
            className={twMerge(
              'w-full rounded-xl border-0 bg-transparent px-2 py-2 outline-none',
              isLoading ? 'text-transparent' : ''
            )}
            placeholder='닉네임'
            value={nickname}
            onChange={handleChange}
            autoFocus
          />
          {isLoading && (
            <div className='absolute left-1 top-0 z-10 flex h-full w-full items-center justify-start gap-4 rounded-xl bg-transparent'>
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
        {status === 'error' ? (
          <div className='animate-fade-down px-6 py-1 text-xs text-red-400'>이미 존재하는 닉네임 입니다</div>
        ) : (
          <div className='animate-fade-down px-6 py-1 text-xs text-blue-600'>닉네임을 입력 해주세요</div>
        )}
      </div>
      <CTAButton data={data} isLoading={isLoading} nickname={nickname} status={status} />
    </form>
  )
}

export default NicknameForm

import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import useNickname from '../hooks/useNickname'
import { twMerge } from 'tailwind-merge'

type Props = Omit<ReturnType<typeof useNickname>, 'handleClick' | 'handleChange'>

const CTAButton = ({ data, nickname, status, isLoading }: Props) => {
  return (
    <Link
      className={twMerge('w-full text-xl font-bold', !data && 'cursor-not-allowed')}
      href={status === 'success' ? `signup?nickname=${nickname}` : '#'}
    >
      <Button
        type='submit'
        colorScheme='twitter'
        disabled={status !== 'success'}
        isDisabled={status !== 'success'}
        isLoading={isLoading}
        className={twMerge(
          'w-full rounded-xl bg-blue-500 p-6 text-sm text-white shadow-md transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-100 disabled:hover:bg-gray-400'
        )}
      >
        테스트 하러가기
      </Button>
    </Link>
  )
}

export default CTAButton

import React from 'react'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import { twMerge } from 'tailwind-merge'

import useNickname from '../hooks/useNickname'

type Props = Omit<ReturnType<typeof useNickname>, 'handleClick' | 'handleChange'> & { className?: string }

const CTAButton = ({ data, nickname, status, isLoading, className }: Props) => {
  return (
    <Link
      className={twMerge('w-fit text-xl font-bold', !data && 'cursor-not-allowed')}
      href={status === 'success' ? `signup?nickname=${nickname}` : '#'}
    >
      <Button
        type='submit'
        colorScheme='twitter'
        disabled={status !== 'success'}
        isDisabled={status !== 'success'}
        isLoading={isLoading}
        className={twMerge(
          'rounded-sm bg-transparent p-4 text-sm text-gray-600 transition-colors hover:bg-transparent disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-100 disabled:hover:bg-transparent',
          className
        )}
      >
        테스트 하러가기
      </Button>
    </Link>
  )
}

export default CTAButton

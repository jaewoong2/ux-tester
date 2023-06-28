import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import useNickname from '../hooks/useNickname'
import { twMerge } from 'tailwind-merge'

type Props = Omit<ReturnType<typeof useNickname>, 'handleClick' | 'handleChange'>

const CTAButton = ({ data, nickname, status, isLoading }: Props) => {
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
          'rounded-sm bg-transparent p-4 text-sm text-gray-600 transition-colors hover:bg-transparent disabled:cursor-not-allowed disabled:bg-transparent disabled:opacity-100 disabled:hover:bg-transparent'
        )}
      >
        테스트 하러가기
      </Button>
    </Link>
  )
}

export default CTAButton

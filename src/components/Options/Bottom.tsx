import { PrimaryItem } from '@/types'
import { Button } from '@chakra-ui/react'
import React from 'react'

type Props = {
  currentIndex: number
  selected: PrimaryItem[]
  onClickNext: () => void
  onClickCTA: () => void
}

const Bottom = ({ currentIndex, selected, onClickNext, onClickCTA }: Props) => {
  return (
    <div className='flex w-full gap-4'>
      {currentIndex < selected.length - 1 && (
        <Button colorScheme='blue' className='mt-10 w-full bg-blue-600' onClick={onClickNext}>
          다음
        </Button>
      )}
      {currentIndex === selected.length - 1 && (
        <Button colorScheme='blackAlpha' className='mt-10 w-full bg-stone-400' onClick={onClickCTA}>
          확인
        </Button>
      )}
    </div>
  )
}

export default Bottom

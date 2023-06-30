import React from 'react'
import Image from 'next/image'
import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setStatus } from '@/store/slices/signupSlice'
import { IMAGE } from '@/constants'
import usePostResult from '../../hooks/usePostResult'

const OptionBlockFinal = () => {
  const navigator = useRouter()

  const { selected, nickname } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  const { trigger } = usePostResult()

  const handleClickCTA = async () => {
    try {
      const response = await trigger({
        json: selected.map(
          ({ description, id, itemKey, key, optionValue, isError, placeholder, thumbnail, title, type }) => ({
            description,
            id,
            itemKey,
            key,
            optionValue,
            isError,
            placeholder,
            thumbnail,
            title,
            type,
          })
        ),
        nickname,
      })
      navigator.push(`/result/${response?.uuid}_${response?.userId}`)
      dispatch(setStatus({ status: '결과' }))
    } catch (err) {
      throw new Error()
    }
  }

  return (
    <div className='h-full w-full p-4'>
      <h2 className='text-xl font-bold'>회원가입 과정을 만드셨어요!</h2>
      <div className='flex w-full scale-x-[-1] items-center justify-center p-8 pt-5'>
        <div className='aspect-square h-auto w-[140px]'>
          <Image
            src={IMAGE.heart}
            alt='thumbUp'
            width='140'
            height='140'
            className='h-auto w-auto'
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Ww8AAn8BfiZXqxQAAAAASUVORK5CYII='
          />
        </div>
        <span className='sr-only'>
          <a href='https://www.flaticon.com/free-animated-icons/like' title='like animated icons'>
            Like animated icons created by Freepik - Flaticon
          </a>
        </span>
      </div>
      <div className='flex animate-fade-in-left flex-col'>
        <Button className='w-full bg-blue-500 text-white' colorScheme='twitter' onClick={handleClickCTA}>
          확인
        </Button>
        <label className='flex w-full justify-end text-xs'>내가 만든 회원가입 진행 하고, 점수 확인 할까요?</label>
      </div>
    </div>
  )
}

export default OptionBlockFinal

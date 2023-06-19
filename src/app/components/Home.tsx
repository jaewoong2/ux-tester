'use client'
import { useAppDispatch } from '@/store/hooks'
import { setNickName } from '@/store/slices/signupSlice'
import { Button, Input, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import useSWRMutation, { MutationFetcher } from 'swr/mutation'
import { twMerge } from 'tailwind-merge'
import useDebounce from '../[key]/hooks/useDebounce'

type Status = 'normal' | 'success' | 'error'

const fetcher: MutationFetcher<{ message: string; status: number }, { nickname: string }, string> = (url, { arg }) =>
  fetch(url + `?nickname=${arg.nickname}`, { method: 'POST', cache: 'force-cache', body: JSON.stringify(arg) }).then(
    (res) => res.json()
  )

const Home = () => {
  const [status, setStatus] = useState<Status>('normal')
  const { trigger, reset, data, isMutating: isLoading } = useSWRMutation('api/nickname', fetcher)

  const dispatch = useAppDispatch()
  const navigator = useRouter()
  const [nickname, setNickname] = useState('')
  const deboucnedNickanme = useDebounce(nickname, 1000)

  const handleDispatchNickName = () => {
    if (!nickname || status !== 'success') return
    dispatch(
      setNickName({
        nickname: nickname,
      })
    )
    navigator.push('/signup')
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    handleDispatchNickName()
  }

  const handldeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStatus('normal')
    setNickname(e.target.value)
  }

  const handleTrigger = useCallback(async () => {
    try {
      if (!deboucnedNickanme) return

      if (nickname === deboucnedNickanme) {
        await trigger({ nickname: deboucnedNickanme })
      }
      setStatus('success')
    } catch (err) {
      reset()
      setStatus('error')
    }
  }, [deboucnedNickanme, nickname, trigger, reset])

  useEffect(() => {
    handleTrigger()
  }, [handleTrigger])

  return (
    <div className='relative mx-auto h-full w-full max-w-md border bg-white shadow-xl'>
      <div className='z-0 w-full'>
        <Image src={'/bg.png'} width={496} height={1024} alt='background-image' className='w-full' />
      </div>
      <form className='flex flex-col gap-10 p-10' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='p-2 text-sm font-semibold'>닉네임을 정해주세요</label>
          <div className='relative'>
            <Input
              className={twMerge('w-full rounded-xl border-2 border-slate-200 p-5', data ? 'border-blue-400' : '')}
              placeholder='닉네임'
              value={nickname}
              onChange={handldeChange}
              autoFocus
            />
            {isLoading && (
              <div className='absolute left-0 top-0 z-10 flex h-full w-full items-center justify-start gap-4 rounded-xl border-2 bg-white p-5'>
                <Spinner className='p-2' size={'sm'} color='gray' />
                {nickname}
              </div>
            )}
            {nickname && <div className='absolute right-5 top-0 flex h-full items-center'>&times;</div>}
          </div>
          {status === 'error' && (
            <div className='animate-fade-down px-2 py-1 text-xs text-red-400'>이미 존재하는 닉네임 입니다</div>
          )}
        </div>
      </form>
      <div className='absolute top-64 flex w-full items-center justify-center p-10'>
        <Link className={twMerge('h-full w-full text-xl font-bold', !data && 'cursor-not-allowed')} href={'/signup'}>
          <Button
            type='submit'
            onClick={handleDispatchNickName}
            colorScheme='twitter'
            disabled={status !== 'success'}
            isDisabled={status !== 'success'}
            isLoading={isLoading}
            className={twMerge(
              'h-full w-full rounded-xl bg-blue-500 p-4 text-sm text-white shadow-md transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-100 disabled:hover:bg-gray-400'
            )}
          >
            테스트 하러가기
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Home

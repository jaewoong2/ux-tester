'use client'
import { useAppDispatch } from '@/store/hooks'
import { setNickName } from '@/store/slices/signupSlice'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import useSWRMutation, { MutationFetcher } from 'swr/mutation'
import { twMerge } from 'tailwind-merge'

const fetcher: MutationFetcher<{ message: string; status: number }, { nickname: string }, string> = (url, { arg }) =>
  fetch(url + `?nickname=${arg.nickname}`, { method: 'POST', cache: 'force-cache', body: JSON.stringify(arg) }).then(
    (res) => res.json()
  )

const Home = () => {
  const { trigger, reset, data, isMutating: isLoading } = useSWRMutation('api/nickname', fetcher)

  const dispatch = useAppDispatch()
  const navigator = useRouter()
  const $input = useRef<null | HTMLInputElement>(null)

  const handleDispatchNickName = () => {
    if (!$input.current) return
    dispatch(
      setNickName({
        nickname: $input.current.value,
      })
    )
    navigator.push('/signup')
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    handleDispatchNickName()
  }

  const handleFocusOut: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value) {
      trigger({ nickname: e.target.value })
    }
  }

  return (
    <div className='relative mx-auto h-full w-full max-w-md border bg-white shadow-xl'>
      <div className='z-0 w-full'>
        <Image src={'/bg.png'} width={496} height={1024} alt='background-image' className='w-full' />
      </div>
      <form className='flex flex-col gap-10 p-10' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='p-2 text-sm font-semibold'>닉네임을 정해주세요</label>
          <div className='relative'>
            <input
              className={twMerge('w-full rounded-xl border-2 border-slate-200 p-3', data ? 'border-blue-400' : '')}
              placeholder='닉네임'
              ref={$input}
              onBlur={handleFocusOut}
              autoFocus
            />
            {$input.current?.value && (
              <div className='absolute right-5 top-0 flex h-full items-center'>
                <button
                  onClick={() => reset()}
                  type='button'
                  className={twMerge(
                    'flex h-6 w-6 animate-fade-left items-center justify-center rounded-full text-gray-400 hover:text-gray-700',
                    data ? 'text-blue-400' : ''
                  )}
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
      <div className='absolute top-64 flex w-full items-center justify-center p-10'>
        <Link
          onClick={handleDispatchNickName}
          className={twMerge('h-full w-full text-xl font-bold', !data && 'cursor-not-allowed')}
          href={'/signup'}
        >
          <Button
            type='submit'
            colorScheme='twitter'
            disabled={!data}
            isDisabled={!data}
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

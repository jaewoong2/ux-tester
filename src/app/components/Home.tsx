'use client'
import { useAppDispatch } from '@/store/hooks'
import { setNickName } from '@/store/slices/signupSlice'
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
  const { trigger, reset, data } = useSWRMutation('api/nickname', fetcher)

  const dispatch = useAppDispatch()
  const navigator = useRouter()
  const $input = useRef<null | HTMLInputElement>(null)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    if ($input.current) {
      e.preventDefault()
      dispatch(setNickName({ nickname: $input.current.value }))
      navigator.push('/signup')
    }
  }

  const handleFocusOut: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value) {
      trigger({ nickname: e.target.value })
    }
  }

  return (
    <div className='h-full w-full max-w-md border shadow-xl'>
      <div className='mx-auto mt-5 flex w-[90%] flex-col gap-5 rounded-lg border-2 border-black bg-[#dde1e7] p-5'>
        <div className='h-14 w-full pr-10'>
          <div className='flex h-14 w-full items-center justify-end gap-5 rounded-xl p-5 shadow-trend'>
            <button className='flex h-9 w-9 items-center justify-center rounded-full font-bold text-slate-500 shadow-trend-inset'>
              U
            </button>
            <button className='flex h-9 w-9 items-center justify-center rounded-full font-bold text-slate-500 shadow-trend'>
              X
            </button>
          </div>
        </div>
        <div className='h-14 w-full pl-10'>
          <div className='flex h-14 w-full items-center justify-end rounded-xl pr-2 shadow-trend-inset'>
            <span className='PyeongChangPeace-Bold text-2xl font-bold drop-shadow-md'>회원가입 유-엑스 능력평가</span>
          </div>
        </div>
        <div className='h-14 w-full pr-10'>
          <div className='flex h-14 w-full items-center gap-5 rounded-xl p-5 shadow-trend'>
            <button className='flex h-9 w-9 items-center justify-center rounded-full font-bold text-slate-500 shadow-trend-inset'>
              x
            </button>
            <button className='flex h-9 w-9 items-center justify-center rounded-full font-bold text-slate-500 shadow-trend'>
              +
            </button>
            <button className='flex h-9 w-9 items-center justify-center rounded-full font-bold text-slate-500 shadow-trend-inset'>
              -
            </button>
          </div>
        </div>
      </div>
      {/* <div className='px-5'>
        <div className='PyeongChangPeace-Bold flex w-full justify-center bg-black py-5 text-2xl font-bold text-white'>
          나만의 회원가입 만들기
        </div>
      </div> */}
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
        <div className='flex w-full items-center justify-center'>
          <button
            type='submit'
            disabled={!data}
            className={twMerge(
              'h-full w-full border-2 border-black bg-blue-500 p-6 text-sm text-white transition-colors hover:bg-blue-400',
              data ? 'animate-fade-in-down ' : 'animate-fade-out-up opacity-0'
            )}
          >
            <Link className='text-xl font-bold' href={'/signup'}>
              만들러 가자
            </Link>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home

import Image from 'next/image'
import React, { PropsWithChildren } from 'react'

import NicknameForm from './NicknameForm'
import { IMAGE } from '../../constants'
import { FcCollaboration } from 'react-icons/fc'
import HambergerMenuList from './HambergerMenuList'

const Banner = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex w-full items-center justify-center overflow-scroll'>
      <div className='flex w-full flex-col overflow-y-scroll rounded-xl border bg-white'>
        <div className='h-20 w-full bg-blue-200'>
          <header className='flex w-full items-center justify-between p-4'>
            <div className='flex aspect-square h-auto w-10 items-center justify-center rounded-full border bg-blue-50 p-1'>
              <FcCollaboration className='text-lg' />
            </div>
            <span className='flex w-full justify-center font-semibold'>나만의 회원가입 UX 테스트</span>
            <HambergerMenuList />
          </header>
        </div>
        <div className='px-4 py-5'>
          <div className='chat chat-start w-full'>
            <div className='chat-image avatar'>
              <div className='w-10 rounded-full border bg-blue-50 p-1'>
                <Image src={IMAGE.favicon} width={40} height={40} className='h-auto w-auto' alt='image' />
              </div>
            </div>
            <div className='chat-header'>
              김똥
              <time className=' pl-2 text-xs opacity-50'>5분전</time>
            </div>
            <div className='chat-bubble bg-blue-200 text-gray-800'>야! 너 이거 해볼래?</div>
          </div>
          <div className='chat chat-start'>
            <div className='w-2/3'>
              <Image src={IMAGE.og} width={512} height={512} className='h-auto w-auto' alt='image' />
            </div>
          </div>
          <div className='chat chat-end w-full'>
            <div className='chat-header'>
              나<time className=' pl-2 text-xs opacity-50'>30초전</time>
            </div>
            <div className='chat-bubble bg-gray-200 text-gray-800'>오~ 재밌겠다</div>
          </div>
          <div className='chat chat-end w-full'>
            <div className='chat-header'>
              나<time className=' pl-2 text-xs opacity-50'>10초전</time>
            </div>
            <div className='chat-bubble bg-gray-200 text-gray-800'>이거 점수도 매겨주네</div>
          </div>
          <div className='chat chat-start w-full'>
            <div className='chat-image avatar'>
              <div className='w-10 rounded-full border bg-blue-50 p-1'>
                <Image src={IMAGE.favicon} width={40} height={40} className='h-auto w-auto' alt='image' />
              </div>
            </div>
            <div className='chat-header'>
              김똥
              <time className=' pl-2 text-xs opacity-50'>1초전</time>
            </div>
            <div className='chat-bubble bg-blue-200 text-gray-800'>빨리 해봐 ㅋㅋ 밑에 닉네임 입력하면 돼</div>
          </div>
        </div>
        <div className='h-36 w-full rounded-xl rounded-t-none border-t bg-blue-100'>
          <NicknameForm />
        </div>
      </div>
      {children}
    </div>
  )
}

export default React.memo(Banner)

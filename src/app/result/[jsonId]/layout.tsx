import React, { PropsWithChildren, Suspense } from 'react'
import { notFound } from 'next/navigation'

import Loading from './loading-coponents'
import { getNickname } from '../../../app/supabase-server'
import { METADATA } from '../../../constants'

export const metadata = {
  ...METADATA,
  title: '나의 회원가입 UX 테스트 | 결과',
}

type Props = {
  params?: {
    key: string
    jsonId: string
  }
}

const Layout = async ({ children, params }: PropsWithChildren<Props>) => {
  const [, userId] = params?.jsonId ? params?.jsonId.split('_') : ['', '']
  const nickname = await getNickname(userId)

  if (!nickname?.data.nickname) {
    notFound()
  }

  return <Suspense fallback={<Loading nickname={nickname.data.nickname} />}>{children}</Suspense>
}

export default Layout

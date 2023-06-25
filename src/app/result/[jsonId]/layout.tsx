import React, { PropsWithChildren, Suspense } from 'react'
import Loading from './loading-coponents'
import { getNickname } from '@/app/supabase-server'
import { notFound } from 'next/navigation'

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

import React from 'react'
import { LayoutProps } from '../../../.next/types/app/[key]/layout'

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='container mx-auto flex min-h-full justify-center'>
      <div className='relative min-w-[512px] shadow-xl max-sm:w-full max-sm:min-w-full'>
        <div className='relative flex h-full w-full max-w-lg flex-col border bg-white p-3'>{children}</div>
      </div>
    </main>
  )
}

export default Layout

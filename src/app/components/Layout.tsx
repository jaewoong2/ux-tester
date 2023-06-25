import React, { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className='container mx-auto flex min-h-full justify-center'>
      <div className='relative mx-auto min-w-full max-w-[512px] max-sm:w-full max-sm:min-w-full'>
        <div className='relative mx-auto flex h-full w-full max-w-lg flex-col border-x-2 border-black bg-slate-50 p-3'>
          {children}
        </div>
      </div>
    </main>
  )
}

export default Layout

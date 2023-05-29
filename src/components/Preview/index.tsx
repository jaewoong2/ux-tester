'use client'
import React, { PropsWithChildren } from 'react'

const Preview = ({ children }: PropsWithChildren) => {
  return <section className='absolute left-full top-0 flex w-full max-w-md justify-center p-10'>{children}</section>
}

export default Preview

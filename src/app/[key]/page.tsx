import React from 'react'
import Main from './components/contents/Main'

const Page = async () => {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Main />
    </>
  )
}

export default Page

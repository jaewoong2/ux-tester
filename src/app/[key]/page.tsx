import React from 'react'
import Options from './components/contents/Options'
import Main from './components/contents/Main'

const Page = async () => {
  return (
    <main className='container mx-auto flex min-h-full justify-center'>
      {/* @ts-expect-error Async Server Component */}
      <Main>
        <Options />
      </Main>
    </main>
  )
}

export default Page

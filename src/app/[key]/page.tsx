import React from 'react'
import Options from './components/contents/Options'
import Main from './components/contents/Main'

type PageProps = {
  params: {
    key: string
  }
  searchParams: {
    itemId: string
  }
}

const Page = async ({ params }: PageProps) => {
  return (
    <main className='container mx-auto flex min-h-full justify-center'>
      {/* @ts-expect-error Async Server Component */}
      <Main>
        {/* @ts-expect-error Async Server Component */}
        <Options itemId={+params.itemId} />
      </Main>
    </main>
  )
}

export default Page

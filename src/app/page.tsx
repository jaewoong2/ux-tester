'use client'
import Contents from '@/components/Contents'
import Options from '@/components/Options'
import Preview from '@/components/Preview'

export default function Home() {
  return (
    <main className='container mx-auto grid min-h-full grid-cols-[3fr_5fr_5fr] border'>
      <Options />
      <Contents />
      <Preview />
    </main>
  )
}

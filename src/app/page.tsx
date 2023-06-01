import Contents from '@/components/Contents'
import { getItems, getSession } from './supabase-server'

export default async function Home() {
  const data = await Promise.all([getSession(), getItems()])

  console.log(data[0], data[1])

  return (
    <main className='container mx-auto flex min-h-full justify-center'>
      <Contents />
    </main>
  )
}

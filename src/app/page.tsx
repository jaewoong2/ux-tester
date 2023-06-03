import Contents from '@/components/Contents'
import './globals.css'
import { getItems } from './supabase-server'

export default async function Home() {
  const items = await getItems()

  return (
    <main className='container mx-auto flex min-h-full justify-center'>
      <Contents items={items?.data} />
    </main>
  )
}

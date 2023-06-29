import Home from './components/Home'
export const runtime = 'edge'

export default async function Page() {
  return (
    <main className='relative z-10 h-full w-full backdrop-blur-sm'>
      <div className='container mx-auto flex h-full min-h-full justify-center'>
        <Home />
      </div>
    </main>
  )
}

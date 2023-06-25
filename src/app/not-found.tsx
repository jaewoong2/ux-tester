import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
  return (
    <main className='container mx-auto flex min-h-full justify-center'>
      <div className='relative mx-auto min-w-full max-w-[512px] max-sm:w-full max-sm:min-w-full'>
        <div className='relative mx-auto flex h-full w-full max-w-lg flex-col border-x-2 border-black bg-slate-50 p-3'>
          <div className='flex h-full w-full flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
              <Image src={'/munji.png'} width={128} height={128} alt='notfound' className='h-auto w-auto' />
              <div className='text-xl font-bold'>잘못된 접근 이에요</div>
              <Link
                href={'/'}
                className='mt-4 w-fit rounded-lg bg-slate-200 p-3 px-6 text-sm font-bold shadow-lg hover:bg-slate-300'
              >
                홈으로 가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFound

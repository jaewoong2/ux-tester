import Image from 'next/image'

export default async function Home() {
  return (
    <main className='h-full w-full bg-slate-50'>
      <div className='container mx-auto flex h-full min-h-full justify-center py-4'>
        <div className='h-full w-full max-w-md rounded-xl border bg-white shadow-xl'>
          <div className='flex w-full flex-col gap-10 p-20'>
            <Image src={'/ABC.png'} width={468} height={200} alt='hero' className='drop-shadow-xl' />
            <div className='PyeongChangPeace-Bold flex w-full justify-center text-2xl font-bold drop-shadow-md'>
              나만의 회원가입을 만들자
            </div>
          </div>
          <form className='flex flex-col gap-5 p-10'>
            <div>
              <label className='p-2 text-sm font-semibold'>닉네임을 정해주세요</label>
              <input
                className='w-full rounded-xl border border-slate-200 p-3 shadow-inner shadow-slate-200'
                placeholder='초코코'
              />
            </div>
            <div className='w-full p-5'>
              <button className='w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-gray-500 shadow-inner shadow-slate-200 transition-colors hover:bg-blue-50'>
                테스트 시작하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

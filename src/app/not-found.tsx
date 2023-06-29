import Image from 'next/image'
import Link from 'next/link'

import { IMAGE } from '../constants'

const NotFound = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <Image
        src={IMAGE.munji}
        width={128}
        height={128}
        alt='notfound'
        className='h-auto w-auto'
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Ww8AAn8BfiZXqxQAAAAASUVORK5CYII='
      />
      <div className='text-xl font-bold'>잘못된 접근 이에요</div>
      <Link
        href={'/'}
        className='mt-4 w-fit rounded-lg bg-slate-200 p-3 px-6 text-sm font-bold shadow-lg hover:bg-slate-300'
      >
        홈으로 가기
      </Link>
    </div>
  )
}

export default NotFound

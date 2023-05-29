import React from 'react'
import { twMerge } from 'tailwind-merge'
type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Empty = ({ className, ...rest }: Props) => {
  return (
    <div
      className={twMerge(
        'flex h-[110px] w-full flex-col justify-center rounded-md border border-dashed p-3',
        className
      )}
      {...rest}
    >
      <h3 className='text-xl font-bold'>현재 위치에 들어갈 카드를 골라주세요 🧐</h3>
      <p>직접 만드는 유저 경험</p>
      <p className='py-2 text-sm italic text-gray-500'>정답은 없어요 :) 직접 만들어 가봐요</p>
    </div>
  )
}

export default Empty

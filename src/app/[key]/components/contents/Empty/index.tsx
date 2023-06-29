import React from 'react'
import { twMerge } from 'tailwind-merge'
type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Empty = ({ className, ...rest }: Props) => {
  return (
    <div
      className={twMerge(
        'flex h-[110px] w-full flex-col justify-center rounded-md border-2 border-dashed border-black p-3',
        className
      )}
      {...rest}
    >
      <h3 className='text-lg font-bold'>현재 위치의 요소를 골라주세요</h3>
      <p className='text-sm'>체크버튼을 누르거나, 드래그 해서 옮겨주세요 😎</p>
    </div>
  )
}

export default Empty

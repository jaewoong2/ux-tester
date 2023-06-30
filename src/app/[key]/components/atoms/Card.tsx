import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  left?: React.ReactNode
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Card = ({ left, children, className, title, ...rest }: PropsWithChildren<Props>) => {
  return (
    <div className={twMerge('rounded-md py-3 pr-3', className)} {...rest}>
      {left}
      <div>
        <h3 className='text-xl font-bold'>{title}</h3>
        <span className='text-sm text-gray-600'>{children}</span>
      </div>
    </div>
  )
}

export default Card

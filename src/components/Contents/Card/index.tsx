import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Card = ({ children, className, title, ...rest }: PropsWithChildren<Props>) => {
  return (
    <div className={twMerge('w-full rounded-md border border-dashed p-3', className)} {...rest}>
      <h3 className='text-xl font-bold'>{title}</h3>
      {children}
    </div>
  )
}

export default Card
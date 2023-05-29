import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({
  children,
  className,
  ...rest
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <div className='w-full bg-white pl-0'>
      <button {...rest} className={twMerge('rounded-xl bg-slate-50 px-8 py-4 hover:bg-slate-100', className)}>
        {children}
      </button>
    </div>
  )
}

export default Button

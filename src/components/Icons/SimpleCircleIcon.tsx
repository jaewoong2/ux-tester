import React from 'react'

const SimpleCircleIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      version='1'
      viewBox='0 0 48 48'
      enableBackground='new 0 0 48 48'
      height='1em'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle fill='inherit' cx='24' cy='24' r='21'></circle>
    </svg>
  )
}

export default SimpleCircleIcon

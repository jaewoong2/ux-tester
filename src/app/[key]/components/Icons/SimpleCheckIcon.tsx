import React from 'react'

const SimpleCheckIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke='currentColor'
      fill='currentColor'
      strokeWidth='0'
      version='1'
      viewBox='0 0 48 48'
      width={'1rem'}
      height={'1rem'}
      enableBackground='new 0 0 48 48'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <polygon fill='inherit' points='40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9'></polygon>
    </svg>
  )
}

export default SimpleCheckIcon

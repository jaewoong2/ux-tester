import React from 'react'
import './index.css'
import { MinusIcon } from '@chakra-ui/icons'

function CheckIcon({ className, isSuccess, variant }: { className?: string; isSuccess?: boolean; variant?: string }) {
  return (
    <div className='wrapper'>
      {isSuccess ? (
        <svg
          className={variant ? `checkmark_${variant} ${className}` : `checkmark ${className}`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 52 52'
        >
          <circle
            className={variant ? `checkmark__circle_${variant}` : 'checkmark__circle'}
            cx='26'
            cy='26'
            r='25'
            fill='none'
          />
          <path
            className={variant ? `checkmark__check_${variant}` : 'checkmark__check'}
            fill='none'
            d='M14.1 27.2l7.1 7.2 16.7-16.8'
          />
        </svg>
      ) : (
        <MinusIcon color={'red.400'} />
      )}
    </div>
  )
}

export default CheckIcon

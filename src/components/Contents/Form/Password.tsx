import React, { useState } from 'react'
import { FormControl, FormLabel, FormHelperText, FormErrorMessage, FormControlProps, Input } from '@chakra-ui/react'
import { FcCheckmark } from 'react-icons/fc'

type Props = {
  variant?: string
} & FormControlProps

const Password = (props: Props) => {
  const [input, setInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  const isError = input === ''

  return (
    <FormControl isInvalid={isError} {...props}>
      <FormLabel>비밀번호</FormLabel>
      <Input type='password' value={input} onChange={handleInputChange} />
      <FormHelperText>
        <span className='flex items-center gap-2'>
          <FcCheckmark className='text-xs' />
          <p className='text-xs'>규칙을 정해주세요.</p>
        </span>
      </FormHelperText>
    </FormControl>
  )
}

export default Password

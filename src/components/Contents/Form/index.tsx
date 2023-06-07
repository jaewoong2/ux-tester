import React from 'react'
import { FormControl, FormLabel, FormControlProps, InputProps, InputGroup, Button } from '@chakra-ui/react'
import { twMerge } from 'tailwind-merge'

import { PrimaryItem } from '@/types'
import Email from './Email'
import Password from './Password'

type OptionDB = {
  rule: 'button' | 'input'
  placeholder: 'email' | 'example'
  next: 'signup' | 'contents'
  duplicate: 'yes' | 'no'
  email: 'normal' | 'domain' | 'domain-select'
  password: 'yes' | 'no'
}

type Props = {
  label?: string
  type?: InputProps['type']
  variant?: string
  options: PrimaryItem['optionValue'] & Partial<OptionDB>
  index: number
  itemKey?: string | null
} & FormControlProps

const Form = ({ label, type, options, itemKey, index, ...props }: Props) => {
  if (type === 'button') {
    return (
      <div className='w-full p-4'>
        <Button
          form='signup'
          type='submit'
          colorScheme='gray'
          className='flex w-full items-center justify-center gap-2 bg-slate-200 text-sm'
        >
          {options?.next === 'contents' ? <p>콘텐츠 보러가기</p> : <p>회원가입 하기</p> ?? '다음'}
        </Button>
      </div>
    )
  }

  return (
    <FormControl {...props} className={twMerge('bg-white py-5 pr-5', props.className)}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {type !== 'password' && (
          <Email
            index={index}
            type={type}
            options={options}
            placeholder={options?.placeholder === 'example' ? 'your.example.id' : '이메일을 입력하세요...'}
          />
        )}
        {type === 'password' && (
          <Password index={index} isPasswordCheck={itemKey === 'passwordCheck'} options={options} />
        )}
      </InputGroup>
    </FormControl>
  )
}

export default Form

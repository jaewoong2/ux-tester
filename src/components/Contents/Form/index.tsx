import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormControlProps,
  InputProps,
  InputGroup,
  InputRightAddon,
  Select,
} from '@chakra-ui/react'
import { FcLock, FcRight } from 'react-icons/fc'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import { Item } from '@/types'
import SimpleCheckIcon from '@/components/Icons/SimpleCheckIcon'

type Props = {
  label?: string
  type?: InputProps['type']
  helper?: Item['form']['rules']
  variant?: string
  options?: Item['form']['options']
} & FormControlProps

const Form = ({ label, type, helper, options, ...props }: Props) => {
  const [input, setInput] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

  if (type === 'button') {
    return (
      <div className='w-full p-4'>
        <Button className='flex w-full items-center justify-center gap-2'>
          다음 <FcRight className='text-xl' />
        </Button>
      </div>
    )
  }
  return (
    <FormControl {...props} className={twMerge('bg-white py-5 pr-5', props.className)}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input type={type} value={input} onChange={handleInputChange} />
        {options?.domain === 'domain' && (
          <InputRightAddon className='flex gap-2 p-3'>
            <p>@</p>
            <Input variant={'unstyled'} />
          </InputRightAddon>
        )}
        {options?.domain === 'normal' && (
          <InputRightAddon className='flex gap-2 p-3'>
            <p>@</p>
            <Select variant={'unstyled'}>
              <option>naver.com</option>
              <option>google.com</option>
              <option>kakao.com</option>
              <option>직접 입력</option>
            </Select>
          </InputRightAddon>
        )}
        {options?.password === 'yes' && (
          <InputRightAddon>
            <FcLock />
          </InputRightAddon>
        )}
      </InputGroup>
      <span className='mt-2 flex items-center gap-2'>
        {helper?.map(({ label, validator }) => (
          <>
            <SimpleCheckIcon className='fill-green-500 text-xs' />
            <p className='text-xs text-green-800'>{label ?? '규칙을 정해주세요.'}</p>
          </>
        ))}
      </span>
    </FormControl>
  )
}

export default Form

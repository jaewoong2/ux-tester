import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormControlProps,
  InputProps,
  InputGroup,
  InputRightAddon,
  Button,
  Select,
} from '@chakra-ui/react'
import { FcLock } from 'react-icons/fc'
import { twMerge } from 'tailwind-merge'
import { Item } from '@/types'
import SimpleCheckIcon from '@/components/Icons/SimpleCheckIcon'

type Props = {
  label?: string
  type?: InputProps['type']
  helper?: Item['form']['rules']
  variant?: string
  options: Item['form']['options']
  index: number
} & FormControlProps

const Form = ({ label, type, helper, options, ...props }: Props) => {
  if (type === 'button') {
    return (
      <div className='w-full p-4'>
        <Button type='submit' className='flex w-full items-center justify-center gap-2 bg-slate-200 text-sm'>
          {options?.['label'] ?? '다음'}
        </Button>
      </div>
    )
  }

  return (
    <FormControl {...props} className={twMerge('bg-white py-5 pr-5', props.className)}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {type !== 'password' && (
          <Input
            type={type}
            className='w-full'
            placeholder={options?.placeholder === 'example' ? 'your.example.id' : '이메일을 입력하세요...'}
          />
        )}
        {type === 'password' && <Input type={type} placeholder={'*********'} />}
        {options?.domain === 'domain' && (
          <InputRightAddon className='flex w-[40%] gap-2 p-3 pr-0 text-sm'>
            <p>@</p>
            <Input variant={'unstyled'} placeholder='example.com' className='w-[100%]' />
          </InputRightAddon>
        )}
        {options?.domain === 'domain-select' && (
          <InputRightAddon className='flex gap-2 p-3 pr-0 text-sm'>
            <p>@</p>
            <Select variant={'unstyled'} className='text-sm'>
              <option>naver.com</option>
              <option>google.com</option>
              <option>kakao.com</option>
            </Select>
          </InputRightAddon>
        )}
        {options?.password === 'yes' && (
          <InputRightAddon>
            <FcLock />
          </InputRightAddon>
        )}
        {options?.duplicate === 'yes' && (
          <Button type='button' size={'md'} className='ml-4 w-fit bg-slate-100 px-6 text-sm'>
            중복확인
          </Button>
        )}
      </InputGroup>
      <span className='mt-2 flex items-center gap-2'>
        {helper?.map(({ label }) => (
          <div key={props.key + label} className='flex items-center gap-1'>
            <SimpleCheckIcon className='fill-green-500 text-xs' />
            <p className='text-xs text-green-800'>{label ?? '규칙을 정해주세요.'}</p>
          </div>
        ))}
      </span>
    </FormControl>
  )
}

export default Form

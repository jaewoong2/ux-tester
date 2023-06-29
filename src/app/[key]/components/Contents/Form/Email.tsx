import React, { useEffect, useState } from 'react'
import { MinusIcon } from '@chakra-ui/icons'
import { Button, Input, InputGroup, InputProps, InputRightAddon, Select } from '@chakra-ui/react'

import { twMerge } from 'tailwind-merge'

import useDebounce from '../../../hooks/useDebounce'
import useDispatchForm from '../../../hooks/useDispatchForm'
import SimpleCheckIcon from '../../../components/Icons/SimpleCheckIcon'
import validateEmail from '../../../../../lib/validateEmail'
import { PrimaryItem } from '../../../../../types'

type OptionDB = {
  rule: 'button' | 'input'
  placeholder: 'email' | 'example'
  next: 'signup' | 'contents'
  duplicate: 'yes' | 'no'
  email: 'normal' | 'domain' | 'domain-select'
  password: 'yes' | 'no'
}
type Props = {
  type?: InputProps['type']
  placeholder?: InputProps['placeholder']
  options?: PrimaryItem['optionValue'] & Partial<OptionDB>

  index: number
}

const Email = ({ placeholder, options, index }: Props) => {
  const [, setFormValue, isError, setFormError] = useDispatchForm(index)
  const [value, setValue] = useState<null | string>(null)
  const [email, setEmail] = useState<null | string>(null)
  const isOptionHasDomain = options?.email?.includes('domain')
  const debouncedValue = useDebounce(
    value && (isOptionHasDomain ? email : true) ? value + (isOptionHasDomain ? '@' : '') + email : null,
    200
  )

  const handleChangeValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setEmail(e.target.value)
  }

  const handleClickDuplicateButton = () => {
    if (options?.duplicate === 'no') return
    if (!debouncedValue) return
    setFormError({ duplicate: validateEmail(debouncedValue) })
  }

  useEffect(() => {
    if (!debouncedValue) return

    if (options?.rule === 'input') {
      setFormError({ rule: validateEmail(debouncedValue) })
    }
    if (options?.duplicate === 'no') {
      setFormError({ duplicate: validateEmail(debouncedValue) })
    }

    setFormValue(debouncedValue)
  }, [debouncedValue, options?.duplicate, options?.rule, setFormError, setFormValue])

  return (
    <div className='w-full'>
      <InputGroup className='w-full'>
        <Input
          required
          type={options?.email !== 'normal' ? 'text' : 'email'}
          className='w-full border-2 border-black py-5 hover:border-black'
          placeholder={placeholder}
          value={value ?? ''}
          onChange={handleChangeValue}
        />
        {options?.email === 'domain' && (
          <InputRightAddon className='flex w-[40%] gap-2 border-2 border-l-0 border-black p-3 py-5 pr-0 text-sm'>
            <p>@</p>
            <Input
              required
              variant={'unstyled'}
              placeholder='example.com'
              className='w-[100%]'
              value={email ?? ''}
              onChange={handleChangeEmail}
            />
          </InputRightAddon>
        )}
        {options?.email === 'domain-select' && (
          <InputRightAddon className='flex cursor-pointer gap-2 border-2 border-l-0 border-black p-3 py-5 pr-0 text-sm'>
            <p>@</p>
            <Select required variant={'unstyled'} placeholder='선택' value={email ?? ''} onChange={handleChangeEmail}>
              <option value={'naver.com'}>naver.com</option>
              <option value={'google.com'}>google.com</option>
              <option value={'kakao.com'}>kakao.com</option>
            </Select>
          </InputRightAddon>
        )}
        {options?.duplicate === 'yes' && (
          <Button
            type='button'
            size={'md'}
            className='ml-4 w-fit border-2 border-black bg-slate-100 px-6 py-5 text-sm'
            onClick={handleClickDuplicateButton}
          >
            중복확인
          </Button>
        )}
      </InputGroup>
      <div className='flex items-center gap-2 pt-1 text-xs'>
        <div>
          {(debouncedValue === null || isError.rule === null) && (
            <div className={twMerge('flex animate-fade-in-down items-center gap-1')}>
              <SimpleCheckIcon className='fill-gray-600' />
              <span className={'text-gray-600'}>이메일 형식 확인</span>
            </div>
          )}
          {debouncedValue !== null && isError.rule && (
            <div className={twMerge('flex animate-fade-in-down items-center gap-1')}>
              <SimpleCheckIcon className='fill-green-400' />
              <span className={'text-green-400'}>이메일 형식이 맞아요</span>
            </div>
          )}
          {debouncedValue !== null && isError.rule === false && (
            <div className={twMerge('flex animate-fade-in-down items-center gap-1')}>
              <MinusIcon color={'red.400'} />
              <span className={'text-red-400'}>이메일 형식이 맞지 않아요</span>
            </div>
          )}
        </div>
        <div>
          {(debouncedValue === null || isError.duplicate === null) && (
            <div className={twMerge('flex animate-fade-in-down items-center gap-1')}>
              <SimpleCheckIcon className='fill-gray-600' />
              <span className={'text-gray-600'}>중복 아이디</span>
            </div>
          )}
          {debouncedValue !== null && isError.duplicate && (
            <div className={twMerge('flex animate-fade-in-down items-center gap-1')}>
              <SimpleCheckIcon className='fill-green-400' />
              <span className={'text-green-400'}>중복된 아이디가 없어요</span>
            </div>
          )}
          {debouncedValue !== null && isError.duplicate === false && (
            <div className={twMerge('flex animate-fade-in-down items-center gap-1')}>
              <MinusIcon color={'red.400'} />
              <span className={'text-red-400'}>중복 아이디가 있어요</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Email

import React, { useEffect, useState } from 'react'
import { MinusIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { FcLock, FcUnlock } from 'react-icons/fc'
import { twMerge } from 'tailwind-merge'

import useDebounce from '../../../hooks/useDebounce'
import useDispatchForm from '../../../hooks/useDispatchForm'
import SimpleCheckIcon from '../../../components/Icons/SimpleCheckIcon'
import validatePassword from '../../../../../lib/validatePassword'
import { useAppSelector } from '../../../../../store/hooks'
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
  options?: PrimaryItem['optionValue'] & Partial<OptionDB>
  isPasswordCheck?: boolean
  index: number
}

const Password = ({ options, index, isPasswordCheck }: Props) => {
  const { selected } = useAppSelector((state) => state.signup)
  const [, setFormValue, isError, setFormError] = useDispatchForm(index)
  const [isLock, setIsLock] = useState(true)
  const [password, setPassword] = useState<null | string>(null)
  const debouncedValue = useDebounce(password, 200)
  const [errorMessage, setErrorMessage] = useState({
    normal: '8자 이상',
    success: '8자 이상',
    error: '비밀번호가 8자 보다 짧아요',
  })

  const $password = selected.find((item) => item.itemKey === 'password')

  const handleLockButtonClick = () => {
    setIsLock((prev) => !prev)
  }

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.trim() === '') {
      setFormError({ rule: validatePassword(debouncedValue) })
    }

    setPassword(e.target.value)
  }

  useEffect(() => {
    if (!debouncedValue) return

    if (isPasswordCheck) {
      if (options?.rule === 'input') {
        setFormError({ rule: debouncedValue === $password?.currentValue })
      }
    } else {
      if (options?.rule === 'input') {
        setFormError({ rule: validatePassword(debouncedValue) })
      }
    }
    setFormValue(debouncedValue)
  }, [debouncedValue, isPasswordCheck, options?.rule, $password?.currentValue, setFormError, setFormValue])

  useEffect(() => {
    if (isPasswordCheck) {
      setErrorMessage({
        normal: '동일한 비밀번호',
        success: '동일한 비밀번호',
        error: '한번더 확인 해주세요',
      })
    }
  }, [isPasswordCheck])

  return (
    <div className='w-full'>
      <InputGroup className='w-full'>
        <Input
          value={password ?? ''}
          onChange={handleChangePassword}
          required
          className='border-2 border-black py-5 placeholder:text-xl'
          type={isLock ? 'password' : 'text'}
          placeholder={isLock ? '········' : 'abcd1234'}
        />
        {options?.password === 'yes' && (
          <InputRightAddon
            className='cursor-pointer border-2 border-l-0 border-black py-5'
            onClick={handleLockButtonClick}
          >
            {isLock ? <FcLock /> : <FcUnlock />}
          </InputRightAddon>
        )}
      </InputGroup>
      <div className='flex items-center gap-2 pt-1 text-xs'>
        <div>
          {isError.rule === null && (
            <div className={twMerge('flex animate-fade-in-down items-center gap-1')}>
              <SimpleCheckIcon className='fill-gray-600' />
              <span className={'text-gray-600'}>{errorMessage.normal}</span>
            </div>
          )}
          {debouncedValue !== null && isError.rule && (
            <div className={twMerge('flex animate-fade-in-down items-center gap-1')}>
              <SimpleCheckIcon className='fill-green-400' />
              <span className={'text-green-400'}>{errorMessage.success}</span>
            </div>
          )}
          {debouncedValue !== null && isError.rule === false && (
            <div className={twMerge('flex animate-fade-in-down items-center gap-1')}>
              <MinusIcon color={'red.400'} />
              <span className={'text-red-400'}>{errorMessage.error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Password

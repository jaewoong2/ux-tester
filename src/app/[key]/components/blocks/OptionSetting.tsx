import React from 'react'
import Form from '@/app/[key]/components/contents/Form'
import CheckIcon from '@/app/[key]/components/Icons/CheckIcon'
import SimpleCircleIcon from '@/app/[key]/components/Icons/SimpleCircleIcon'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setIsError, setStatus } from '@/store/slices/signupSlice'
import { FaArrowLeft } from 'react-icons/fa'
import validateEmail from '@/lib/validateEmail'
import validatePassword from '@/lib/validatePassword'

const OptionSetting = () => {
  const { selected, currentIndex } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  const handlePrevButton = () => {
    dispatch(setStatus({ status: '순서' }))
  }

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const emailIndex = selected.findIndex((item) => item.itemKey === 'email')
    const passwordIndex = selected.findIndex((item) => item.itemKey === 'password')
    const passwordCheckIndex = selected.findIndex((item) => item.itemKey === 'passwordCheck')
    const email = selected[emailIndex]
    const password = selected[emailIndex]
    const passwordCheck = selected[emailIndex]

    if (email.optionValue?.rule === 'button') {
      dispatch(
        setIsError({
          value: {
            rule: validateEmail(email?.currentValue),
          },
          index: emailIndex,
        })
      )
    }
    if (password.optionValue?.rule === 'button') {
      dispatch(setIsError({ value: { rule: validatePassword(password.currentValue) }, index: passwordIndex }))
    }
    if (passwordCheck.optionValue?.rule === 'button') {
      dispatch(
        setIsError({
          value: { rule: passwordCheck?.currentValue === password?.currentValue },
          index: passwordCheckIndex,
        })
      )
    }
  }

  return (
    <div className='h-full w-full'>
      <span className='flex items-center pl-5'>
        <FaArrowLeft className=' text-xl' onClick={handlePrevButton} cursor={'pointer'} />
        <h2 className='p-5 text-lg font-semibold'>회원가입</h2>
      </span>
      <form className='w-full' id='signup' onSubmit={handleSubmit}>
        {selected.map((item, index) => (
          <div className={'relative flex items-center overflow-hidden rounded-xl px-2'} key={item.id}>
            <div className='flex w-9 items-center justify-center px-1'>
              {currentIndex === index && <SimpleCircleIcon className='h-5 w-5 fill-[#7ac142]' />}
              {currentIndex !== index && <CheckIcon className='h-5 w-5' isSuccess={currentIndex > index} />}
            </div>
            <Form
              className='px-4'
              label={item.title ?? ''}
              type={item.type ?? 'text'}
              itemKey={item.itemKey}
              options={item.optionValue ?? {}}
              index={index}
            />
          </div>
        ))}
      </form>
    </div>
  )
}

export default OptionSetting

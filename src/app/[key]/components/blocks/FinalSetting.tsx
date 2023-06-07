import React from 'react'
import Form from '@/components/Contents/Form'
import CheckIcon from '@/components/Icons/CheckIcon'
import SimpleCircleIcon from '@/components/Icons/SimpleCircleIcon'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setIsError, setStatus } from '@/store/slices/signupSlice'
import { FaArrowLeft } from 'react-icons/fa'
import validateEmail from '@/lib/validateEmail'
import validatePassword from '@/lib/validatePassword'

const FinalSetting = () => {
  const { selected, currentIndex } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  const handlePrevButton = () => {
    dispatch(setStatus({ status: '설정' }))
  }

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const emailIndex = selected.findIndex((item) => item.itemKey === 'email')
    const passwordIndex = selected.findIndex((item) => item.itemKey === 'password')
    const passwordCheckIndex = selected.findIndex((item) => item.itemKey === 'passwordCheck')
    const email = selected[emailIndex]
    const password = selected[passwordIndex]
    const passwordCheck = selected[passwordCheckIndex]

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

    if (!email.isError.duplicate || !email.isError.rule || !password.isError.rule || !passwordCheck.isError.rule) {
      return
    }
    window.alert('로그인 성공!')
  }

  return (
    <>
      <span className='pl-5'>
        <FaArrowLeft className=' text-xl' onClick={handlePrevButton} cursor={'pointer'} />
      </span>
      <h2 className='p-5 text-lg font-semibold'>회원가입</h2>
      <form className='w-full' id='signup' onSubmit={handleSubmit}>
        {selected.map((item, index) => (
          <div className={'relative flex items-center overflow-hidden rounded-xl px-2'} key={item.id}>
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
    </>
  )
}

export default FinalSetting

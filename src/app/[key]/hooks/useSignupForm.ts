import React, { useCallback } from 'react'
import validateEmail from '@/lib/validateEmail'
import validatePassword from '@/lib/validatePassword'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setStatus, setIsError } from '@/store/slices/signupSlice'

const useSignupForm = () => {
  const { selected } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  const emailIndex = selected.findIndex((item) => item.itemKey === 'email')
  const passwordIndex = selected.findIndex((item) => item.itemKey === 'password')
  const passwordCheckIndex = selected.findIndex((item) => item.itemKey === 'passwordCheck')
  const email = selected[emailIndex]
  const password = selected[passwordIndex]
  const passwordCheck = selected[passwordCheckIndex]

  const handlePrevButton = () => {
    dispatch(setStatus({ status: '설정' }))
  }

  const isFormHasError =
    email.isError.duplicate === false ||
    email.isError.rule === false ||
    password.isError.rule === false ||
    passwordCheck.isError.rule === false

  const handleErrorCheck = useCallback(() => {
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
  }, [
    dispatch,
    email?.currentValue,
    email.optionValue?.rule,
    emailIndex,
    password.currentValue,
    password.optionValue?.rule,
    passwordCheck?.currentValue,
    passwordCheck.optionValue?.rule,
    passwordCheckIndex,
    passwordIndex,
  ])

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      handleErrorCheck()
      if (isFormHasError) return
      dispatch(setStatus({ status: '결과' }))
    },
    [dispatch, handleErrorCheck, isFormHasError]
  )

  return {
    handleSubmit,
    handlePrevButton,
    selected,
  }
}

export default useSignupForm

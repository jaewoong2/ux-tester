import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { useToast } from '@chakra-ui/react'

import validateEmail from '../../../lib/validateEmail'
import validatePassword from '../../../lib/validatePassword'

import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { setStatus, setIsError } from '../../../store/slices/signupSlice'

const useSignupForm = () => {
  const navigation = useRouter()
  const { selected } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()
  const toast = useToast()
  const handlePrevButton = () => {
    dispatch(setStatus({ status: '설정' }))
  }

  const handleErrorCheck = useCallback(() => {
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

    return (
      email.isError.duplicate !== true ||
      email.isError.rule !== true ||
      password.isError.rule !== true ||
      passwordCheck.isError.rule !== true
    )
  }, [dispatch, selected])

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault()
      if (!handleErrorCheck()) {
        dispatch(setStatus({ status: '완료' }))
        navigation.back()
        toast({
          title: '회원가입 완료',
          description: '회원가입이 완료 되었어요 :)',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
      }
    },
    [handleErrorCheck, dispatch, navigation, toast]
  )

  return {
    handleSubmit,
    handlePrevButton,
    selected,
  }
}

export default useSignupForm

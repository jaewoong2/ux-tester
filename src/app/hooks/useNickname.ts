import React, { useCallback, useEffect, useState } from 'react'
import useDebounce from '../[key]/hooks/useDebounce'
import useGetNickname from './useGetNickname'

type Status = 'normal' | 'success' | 'error'

const useNickname = () => {
  const [status, setStatus] = useState<Status>('normal')
  const [nickname, setNickname] = useState('')
  const deboucnedNickanme = useDebounce(nickname, 1000)
  const { trigger, reset: fetchReset, data, isMutating: isLoading } = useGetNickname()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setStatus('normal')
    setNickname(e.target.value)
  }, [])

  const handleClick = useCallback(() => {
    setStatus('normal')
    setNickname('')
  }, [])

  const handleTrigger = useCallback(async () => {
    try {
      if (!deboucnedNickanme) return
      if (nickname === deboucnedNickanme) {
        await trigger({ nickname: deboucnedNickanme })
        setStatus('success')
      }
    } catch (err) {
      fetchReset()
      setStatus('error')
    }
  }, [deboucnedNickanme, nickname, trigger, fetchReset])

  useEffect(() => {
    handleTrigger()
  }, [handleTrigger])

  return {
    nickname,
    handleClick,
    handleChange,
    data,
    isLoading,
    status,
  }
}

export default useNickname

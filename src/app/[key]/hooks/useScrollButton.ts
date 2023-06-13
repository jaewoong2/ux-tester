import { useCallback, useEffect, useRef, useState } from 'react'

const useScrollButton = <T extends HTMLElement>() => {
  const wrapper = useRef<T>(null)
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(true)
  const [isPrevButtonVisible, setIsPrevButtonVisible] = useState(false)

  const handleClickScrollButton = useCallback((step: number) => {
    const currentLeft = wrapper.current?.scrollLeft ?? 0
    wrapper.current?.scrollTo({ left: currentLeft + step })
  }, [])

  useEffect(() => {
    const listener = () => {
      const currentWidth = wrapper.current?.clientWidth ?? 0
      const currentScrollWidth = wrapper.current?.scrollWidth ?? 0
      const currentLeft = wrapper.current?.scrollLeft ?? 0
      setIsNextButtonVisible(currentWidth + currentLeft < currentScrollWidth)
      setIsPrevButtonVisible(currentLeft > 0)
    }

    const wrapperComponent = wrapper.current
    wrapperComponent?.addEventListener('scroll', listener)

    return () => {
      wrapperComponent?.removeEventListener('scroll', listener)
    }
  }, [])

  return { isNextButtonVisible, isPrevButtonVisible, handleClickScrollButton, wrapper }
}

export default useScrollButton

import { useCallback, useState } from 'react'

const useBottomDrawer = () => {
  const [pageY, setPageY] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    setPageY(e.pageY)
  }, [])

  const handleDragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      console.log(e.pageY - pageY)
      if (e.pageY - pageY > 100) {
        setIsOpen(false)
      }

      if (e.pageY - pageY < -100) {
        setIsOpen(true)
      }
    },
    [pageY]
  )

  return { handleDragStart, handleDragEnd, isOpen }
}

export default useBottomDrawer

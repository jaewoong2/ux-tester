import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Button } from '@chakra-ui/react'

import Cards from '../../../../app/[key]/components/contents/DragDrop/Cards'
import EmptyDrop from '../../../../app/[key]/components/contents/DragDrop/EmptyDrop'
import Selected from '../../../../app/[key]/components/contents/DragDrop/Selected'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { addSelected, setStatus, swapSelected } from '../../../../store/slices/signupSlice'

const OrderSetting = () => {
  const [enabled, setEnabled] = useState(false)
  const { cards, selected } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = useCallback(
    ({ source, destination }: DropResult) => {
      if (!destination) return
      if (source.droppableId === 'card' && destination.droppableId === 'empty') {
        dispatch(addSelected({ sourceIndex: source.index }))
      }

      if (source.droppableId === 'selected' && destination.droppableId === 'selected') {
        dispatch(swapSelected({ destinationIndex: destination.index, sourceIndex: source.index }))
      }
    },
    [dispatch]
  )

  // --- requestAnimationFrame 초기화

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  const handleSettingButton = () => {
    dispatch(setStatus({ status: '설정' }))
  }

  if (!enabled) {
    return null
  }

  return (
    <div className='relative flex h-full w-full flex-col justify-between'>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Cards 영역 */}
        <div className=''>
          <Selected
            items={selected}
            draggableProps={{}}
            droppableProps={{ droppableId: 'selected', type: 'selected' }}
          />
          {cards.length > 0 && <EmptyDrop />}
        </div>
        {cards.length > 0 && <Cards items={cards} draggableProps={{}} droppableProps={{ droppableId: 'card' }} />}
      </DragDropContext>
      {cards.length === 0 && (
        <Button
          type='button'
          id={`${selected[0].id}`}
          onClick={handleSettingButton}
          className='mt-10 w-full rounded-md bg-blue-400 px-5 py-3 text-white hover:bg-blue-300'
        >
          옵션 설정하기
        </Button>
      )}
    </div>
  )
}

export default OrderSetting

'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { useAppSelector, useAppDispatch } from '@/store/hooks'

import Cards from './DragDrop/Cards'
import Selected from './DragDrop/Selected'
import EmptyDrop from './DragDrop/EmptyDrop'
import { addSelected, swapSelected, setStatus } from '@/store/slices/signupSlice'
import Form from './Form'
import { twMerge } from 'tailwind-merge'
import CheckIcon from '../Icons/CheckIcon'

const Contents = () => {
  const { cards, selected, status, currentIndex } = useAppSelector((state) => state.signup)
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
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return (
    <div className='flex w-full flex-col gap-5 p-3'>
      {status === '순서' && (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            {/* Cards 영역 */}
            {cards.length > 0 && <Cards items={cards} draggableProps={{}} droppableProps={{ droppableId: 'card' }} />}
            <div className='flex flex-col'>
              <h2 className='p-5 text-lg font-semibold'>회원가입</h2>
              <div>
                <Selected
                  items={selected}
                  draggableProps={{}}
                  droppableProps={{ droppableId: 'selected', type: 'selected' }}
                />
                {cards.length > 0 && <EmptyDrop />}
              </div>
            </div>
          </DragDropContext>
          {cards.length === 0 && (
            <button
              type='button'
              onClick={() => dispatch(setStatus({ status: '설정' }))}
              className='w-full rounded-md bg-blue-400 px-5 py-3 text-white hover:bg-blue-300'
            >
              옵션 설정하기
            </button>
          )}
        </>
      )}
      {status === '설정' && (
        <>
          <h2 className='p-5 text-lg font-semibold'>회원가입</h2>
          {selected.map((item, index) => (
            <div
              className={twMerge(
                'relative flex items-center overflow-hidden rounded-xl px-2',
                currentIndex === index ? 'border border-blue-50' : ''
              )}
              key={item.id}
            >
              <CheckIcon className='h-5 w-5' isSuccess={currentIndex > index} />
              <Form className='px-4' label={item.form.label} type={item.form.type} options={item.form.options} />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Contents

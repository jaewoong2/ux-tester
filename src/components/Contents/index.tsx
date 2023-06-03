'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import { useAppSelector, useAppDispatch } from '@/store/hooks'

import EmptyDrop from './DragDrop/EmptyDrop'
import { addSelected, swapSelected, setStatus, init } from '@/store/slices/signupSlice'
import { twMerge } from 'tailwind-merge'
import CheckIcon from '../Icons/CheckIcon'
import Options from '../Options'
import SimpleCircleIcon from '../Icons/SimpleCircleIcon'
import Cards from './DragDrop/Cards'
import { PrimaryItem } from '@/types'
import Selected from './DragDrop/Selected'
import Link from 'next/link'

type Props = {
  items: PrimaryItem[] | undefined | null
}

const Contents = ({ items }: Props) => {
  const { cards, selected, status, currentIndex } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (items) {
      dispatch(init({ items }))
    }
  }, [items, dispatch])

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
    <div className='relative flex w-full max-w-lg flex-col p-3'>
      <Link href={'/signup/1'}>hi</Link>
      <Options />
      {status === '순서' && (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            {/* Cards 영역 */}
            {cards.length > 0 && <Cards items={cards} draggableProps={{}} droppableProps={{ droppableId: 'card' }} />}
            <Selected
              items={selected}
              draggableProps={{}}
              droppableProps={{ droppableId: 'selected', type: 'selected' }}
            />
            {cards.length > 0 && <EmptyDrop />}
          </DragDropContext>
          {cards.length === 0 && (
            <button
              type='button'
              onClick={() => dispatch(setStatus({ status: '설정' }))}
              className='mt-10 w-full rounded-md bg-blue-400 px-5 py-3 text-white hover:bg-blue-300'
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
            <div className={twMerge('relative flex items-center overflow-hidden rounded-xl px-2')} key={item.id}>
              <div className='flex w-9 justify-center px-1'>
                {currentIndex === index && <SimpleCircleIcon className=' h-5 w-5 fill-[#7ac142]' />}
                {currentIndex !== index && <CheckIcon className='h-5 w-5' isSuccess={currentIndex > index} />}
              </div>
              <form
                className='w-full'
                onChange={(e) => {
                  e.preventDefault()
                  console.log(e)
                }}
              >
                {/* <Form
                  className='px-4'
                  label={item.form.label}
                  type={item.form.type}
                  options={item.form.options}
                  helper={item.form.rules}
                  index={index}
                /> */}
              </form>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Contents

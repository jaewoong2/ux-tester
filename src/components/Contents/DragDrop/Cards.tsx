import { PrimaryItem } from '@/types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Droppable, Draggable, DroppableProps, DraggableProps } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'
import Card from '../Card'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

interface Props {
  items: PrimaryItem[]
  droppableProps: Omit<DroppableProps, 'children'>
  draggableProps: Omit<DraggableProps, 'draggableId' | 'index' | 'children'>
}

const Cards = ({ items, draggableProps, droppableProps }: Props) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(true)
  const [isPrevButtonVisible, setIsPrevButtonVisible] = useState(false)

  const handleClickScrollButton = useCallback((step: number) => {
    const currentLeft = wrapper.current?.scrollLeft ?? 0
    wrapper.current?.scrollTo({ left: currentLeft + step })
  }, [])

  useEffect(() => {
    const listener = () => {
      const currentWidth = wrapper.current?.scrollWidth ?? 0
      const currentLeft = wrapper.current?.scrollLeft ?? 0

      console.log(currentWidth, currentLeft)
      setIsNextButtonVisible(currentWidth > currentLeft)
      setIsPrevButtonVisible(currentLeft > 0)
    }

    const wrapperComponent = wrapper.current
    wrapperComponent?.addEventListener('scroll', listener)

    return () => {
      wrapperComponent?.removeEventListener('scroll', listener)
    }
  }, [])

  return (
    <div className='relative'>
      <Droppable direction='horizontal' isDropDisabled={true} {...droppableProps}>
        {(provided) => {
          return (
            <div ref={wrapper} className='relative w-full gap-5 overflow-auto rounded-sm p-5'>
              <div
                id='dnd-card'
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='flex flex-nowrap gap-5'
              >
                {items.map((item, index) => (
                  <Draggable
                    key={droppableProps.droppableId + item.id}
                    draggableId={droppableProps.droppableId + item.id}
                    index={index}
                    {...draggableProps}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={twMerge('flex-[0_0_auto] cursor-pointer', snapshot.isDragging ? 'shadow-xl' : '')}
                        style={{ ...provided.draggableProps.style, cursor: 'grap' }}
                      >
                        <Card title={item.title ?? 'Title'} className='bg-slate-100 p-3'>
                          {item.description}
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )
        }}
      </Droppable>
      {isPrevButtonVisible && (
        <div className='absolute left-0 top-0 flex h-full items-center'>
          <button
            type='button'
            onClick={() => handleClickScrollButton(-100)}
            className='flex h-8 w-8 items-center justify-center rounded-full border bg-white p-0 text-xl shadow-md hover:bg-slate-100'
          >
            <ChevronLeftIcon />
          </button>
        </div>
      )}
      {isNextButtonVisible && (
        <div className='absolute right-0 top-0 flex h-full items-center'>
          <button
            type='button'
            onClick={() => handleClickScrollButton(100)}
            className='flex h-8 w-8 items-center justify-center rounded-full border bg-white p-0 text-xl shadow-md hover:bg-slate-100'
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  )
}

export default Cards

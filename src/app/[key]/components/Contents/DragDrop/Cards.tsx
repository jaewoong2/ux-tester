import { PrimaryItem } from '@/types'
import React from 'react'
import { Droppable, Draggable, DroppableProps, DraggableProps } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'
import Card from '../Card'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import useScrollButton from '@/app/[key]/hooks/useScrollButton'
import SimpleCheckIcon from '../../Icons/SimpleCheckIcon'
import { useAppDispatch } from '@/store/hooks'
import { addSelected } from '@/store/slices/signupSlice'

interface Props {
  items: PrimaryItem[]
  droppableProps: Omit<DroppableProps, 'children'>
  draggableProps: Omit<DraggableProps, 'draggableId' | 'index' | 'children'>
}

const Cards = ({ items, draggableProps, droppableProps }: Props) => {
  const { handleClickScrollButton, isNextButtonVisible, isPrevButtonVisible, wrapper } =
    useScrollButton<HTMLDivElement>()
  const dispatch = useAppDispatch()

  const handleCheckClick = (index: number) => {
    dispatch(addSelected({ sourceIndex: index }))
  }

  return (
    <div className='relative w-full border-t-2 border-black'>
      <Droppable direction='horizontal' isDropDisabled={true} {...droppableProps}>
        {(provided) => {
          return (
            <div ref={wrapper} className='w-full gap-5 overflow-auto rounded-sm py-5'>
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
                        <Card
                          title={item.title ?? 'Title'}
                          className={twMerge(
                            'relative border-2 border-black bg-slate-50 p-3 shadow-md',
                            snapshot.isDragging
                              ? 'animate-wiggle border-blue-500 bg-blue-50 shadow-xl animate-infinite'
                              : ''
                          )}
                        >
                          {item.description}
                          <button
                            type='button'
                            onClick={() => handleCheckClick(index)}
                            className='absolute -right-4 -top-4 aspect-square rounded-full border-2 border-black bg-slate-50 p-1 text-black'
                          >
                            <SimpleCheckIcon className='h-4 w-4' />
                          </button>
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
            className='flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 p-0 text-xl shadow-md hover:bg-slate-100'
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
            className='flex h-8 w-8 items-center justify-center rounded-full border bg-slate-50 p-0 text-xl shadow-md hover:bg-slate-100'
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  )
}

export default Cards

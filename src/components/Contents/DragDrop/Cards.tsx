import { PrimaryItem } from '@/types'
import React from 'react'
import { Droppable, Draggable, DroppableProps, DraggableProps } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'
import Card from '../Card'

interface Props {
  items: PrimaryItem[]
  droppableProps: Omit<DroppableProps, 'children'>
  draggableProps: Omit<DraggableProps, 'draggableId' | 'index' | 'children'>
}

const Cards = ({ items, draggableProps, droppableProps }: Props) => {
  return (
    <Droppable direction='horizontal' isDropDisabled={true} {...droppableProps}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='flex w-full flex-nowrap gap-5 overflow-auto rounded-sm p-5'
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
      )}
    </Droppable>
  )
}

export default Cards

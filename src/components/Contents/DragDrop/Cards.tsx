import { Item } from '@/types'
import React from 'react'
import { Droppable, Draggable, DroppableProps, DraggableProps } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'
import Card from '../Card'

interface Props<T = Item> {
  items: T[]
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
          className='flex w-full flex-nowrap gap-5 overflow-auto bg-slate-50 p-5'
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
                  <Card title={item.content.title} className='bg-white p-3'>
                    {item.content.description}
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

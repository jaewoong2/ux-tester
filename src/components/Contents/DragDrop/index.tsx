import React from 'react'
import { Droppable, Draggable, DroppableProps, DraggableProps } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'

type Item = {
  id: string
  content: React.ReactNode
}

interface Props<T = Item> {
  items: T[]
  droppableProps: Omit<DroppableProps, 'children'>
  draggableProps: Omit<DraggableProps, 'draggableId' | 'index' | 'children'>
}

const DragDrop = ({ items, draggableProps, droppableProps }: Props) => {
  return (
    <Droppable {...droppableProps}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='flex w-full flex-nowrap gap-5 overflow-x-auto bg-slate-50 p-5'
        >
          {items.map((item, index) => (
            <Draggable key={item.id} index={index} draggableId={item.id} {...draggableProps}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={twMerge('flex-[0_0_auto] cursor-pointer')}
                  style={{ ...provided.draggableProps.style, cursor: 'grap' }}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  )
}

export default DragDrop

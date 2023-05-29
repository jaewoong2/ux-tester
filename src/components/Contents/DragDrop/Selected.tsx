import { Item } from '@/types'
import React from 'react'
import { Droppable, Draggable, DroppableProps, DraggableProps } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'
import Form from '../Form'
import { GrDrag } from 'react-icons/gr'

interface Props<T = Item> {
  items: T[]
  droppableProps: Omit<DroppableProps, 'children'>
  draggableProps: Omit<DraggableProps, 'draggableId' | 'index' | 'children'>
}

const Selected = ({ items, draggableProps, droppableProps }: Props) => {
  return (
    <Droppable {...droppableProps}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col'>
          {items.map((item, index) => (
            <Draggable
              key={droppableProps.droppableId + item.id}
              draggableId={droppableProps.droppableId + item.id}
              index={index}
              {...draggableProps}
            >
              {(provided, snapshot) => (
                <>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={twMerge(
                      'flex flex-[0_0_auto] cursor-pointer items-center overflow-hidden rounded-xl',
                      snapshot.isDragging ? 'shadow-lg' : ''
                    )}
                    style={{ ...provided.draggableProps.style, cursor: 'unset' }}
                  >
                    <p {...provided.dragHandleProps} className='px-3'>
                      <GrDrag />
                    </p>
                    <Form label={item.form.label} type={item.form.type} />
                  </div>
                </>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Selected

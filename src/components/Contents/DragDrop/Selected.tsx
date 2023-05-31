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
    <div className='flex flex-col pt-10'>
      <h2 className='p-5 text-lg font-semibold'>회원가입</h2>
      <div>
        <Droppable {...droppableProps} key={droppableProps.droppableId}>
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
                    <div
                      key={item.id}
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
                      <Form
                        label={item.form.label}
                        type={item.form.type}
                        helper={item.form.rules}
                        key={item.id}
                        index={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}

export default Selected

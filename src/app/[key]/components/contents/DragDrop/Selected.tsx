import { PrimaryItem } from '@/types'
import React from 'react'
import { Droppable, Draggable, DroppableProps, DraggableProps } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'

import Form from '../Form/index'
import { GrDrag } from 'react-icons/gr'

interface Props {
  items: PrimaryItem[]
  droppableProps: Omit<DroppableProps, 'children'>
  draggableProps: Omit<DraggableProps, 'draggableId' | 'index' | 'children'>
}

const Selected = ({ items, draggableProps, droppableProps }: Props) => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-1 px-3'>
        <h2 className='text-lg font-semibold'>회원가입 순서 정하기</h2>
        <div className='flex items-center gap-1 text-sm text-gray-500'>
          <span className='aspect-square rounded-full bg-slate-100 p-1'>
            <GrDrag />
          </span>
          을 통해 순서를 바꿀 수 있어요
        </div>
      </div>
      <div>
        <Droppable {...droppableProps} key={droppableProps.droppableId}>
          {(provided) => (
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
                        'flex flex-[0_0_auto] cursor-pointer items-center overflow-hidden rounded-xl bg-slate-50',
                        snapshot.isDragging ? 'shadow-lg' : ''
                      )}
                      style={{ ...provided.draggableProps.style, cursor: 'unset' }}
                    >
                      <div {...provided.dragHandleProps} className='px-3'>
                        <GrDrag />
                      </div>
                      <Form
                        label={item.title ?? 'title'}
                        type={item.type ?? 'text'}
                        placeholder={item.placeholder ?? 'placeholder'}
                        options={{}}
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

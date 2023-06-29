import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Empty from '../Empty/index'

const EmptyDrop = () => {
  return (
    <Droppable droppableId='empty'>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className='p-5'>
          <Empty className={`${snapshot.isDraggingOver ? 'border-solid bg-slate-200' : ''}`} />
          <div className='sr-only'>{provided.placeholder}</div>
        </div>
      )}
    </Droppable>
  )
}

export default EmptyDrop

'use client'
import React from 'react'

import type { IColumnComponent } from '@/app/Board/_components/Column/types';
import { Droppable } from 'react-beautiful-dnd';
import Task from '@/app/Board/_components/Task';
import {
  ColumnContainer,
  ColumnDescription,
  ColumnRole,
  ColumnTaskList
} from '@/app/Board/_components/Column/wind'

export default function Column(
  {
    id,
    role,
    taskList,
    description,
    handleUpdateTask,
    handleDeleteTask
  }: IColumnComponent
) {
  return (
    <ColumnContainer>
      <div>
        <ColumnRole>
          {role}
        </ColumnRole>
        <ColumnDescription>
          {description}
        </ColumnDescription>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <ColumnTaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            //@ts-ignore
            isDraggingOver={snapshot.isDraggingOver}
          >
            {taskList && taskList.map((task, index) => (
              <Task
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
                key={index}
                index={index}
                task={task}
              />
            ))}
            {provided.placeholder}
          </ColumnTaskList>
        )}
      </Droppable>
    </ColumnContainer>
  )
}

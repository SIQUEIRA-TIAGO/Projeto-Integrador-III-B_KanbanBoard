'use client'

import React from 'react'
import {
  ColumnContainer,
  ColumnDescription,
  ColumnRole,
  ColumnTaskList
} from './wind'
import { Droppable } from 'react-beautiful-dnd';
import { ITask } from '../Task/types';
import Task from '../Task';

export default function Column(
  {
    id,
    role,
    taskList,
    description,
    handleUpdateTask,
    handleDeleteTask
  }: {
    id: string
    role: 'A fazer' | 'Fazendo' | 'Feito'
    taskList?: ITask[]
    description?: string
    handleUpdateTask?: (task: ITask, index: number) => void
    handleDeleteTask?: (index: number) => void
  }
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

'use client'
import React, { useState } from 'react'

import type { ITaskComponent } from '@/app/Board/_components/Task/types';
import { FaCalendarDay as DateIcon } from "react-icons/fa6";
import TaskModal from '@/app/Board/_components/TaskModal';
import { Draggable } from 'react-beautiful-dnd';
import {
  TaskContainer,
  TaskDeadLine,
  TaskDescription,
  TaskHeader,
  TaskPriority
} from '@/app/Board/_components/Task/wind';
import { Avatar, Tooltip } from 'antd'


export default function Task(
  {
    task,
    index,
    handleUpdateTask,
    handleDeleteTask
  }: ITaskComponent
) {
  const {
    id,
    description,
    deadLine,
    member,
    priority
  } = task

  const [editTaskModalOpen, setEditTaskModalOpen] = useState<boolean>(false)

  return (
    <Draggable draggableId={id} key={id} index={index}>
      {(provided, snapshot) => (
        <>
          <TaskContainer
            onClick={() => setEditTaskModalOpen(true)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {
              (deadLine || priority || member) &&
              <TaskHeader>
                {
                  (deadLine || member) &&
                  <TaskHeader>
                    {
                      member &&
                      <Tooltip title={member}>
                        <Avatar className='bg-gray-400 text-[#1f1f1f]' shape='square' size='small'>
                          {member.slice(0, 1).toUpperCase()}
                        </Avatar>
                      </Tooltip>
                    }
                    {
                      deadLine &&
                      <TaskDeadLine>
                        <DateIcon size={14} />
                        {deadLine}
                      </TaskDeadLine>
                    }
                  </TaskHeader>
                }
                {
                  priority &&
                  <TaskPriority priority={priority} />
                }
              </TaskHeader>
            }
            <TaskDescription>
              {description}
            </TaskDescription>
            {/* @ts-ignore */}
            {provided.placeholder}
          </TaskContainer >
          <TaskModal
            index={index}
            taskToUpdate={task}
            open={editTaskModalOpen}
            setOpen={setEditTaskModalOpen}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
          />
        </>
      )}
    </Draggable>
  )
}

// class="h-6 w-6 rounded-lg ring-2 ring-white"
// src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
// alt=""

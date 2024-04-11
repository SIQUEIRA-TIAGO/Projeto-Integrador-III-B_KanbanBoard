'use client'

import React, { useState } from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { FaPlus as PlusIcon } from "react-icons/fa";
import Column from "./_components/Column";
import {
    KanbanArea,
    KanbanBoard,
    KanbanColumnsArea,
    MainContainer,
    PageTitle,
    ProjectTitle
} from "./wind";
import { ITask } from "./_components/Task/types";
import { Button } from "antd";
import TaskModal from "./_components/TaskModal";

export default function Board() {
    const [openNewTaskModal, setOpenNewTaskModal] = useState<boolean>(false)

    const [toDo, setToDo] = useState<ITask[]>([])
    const [doing, setDoing] = useState<ITask[]>([])
    const [done, setDone] = useState<ITask[]>([])

    const onDragEnd = ({ destination, source, draggableId, }: DropResult) => {
        const task = [...toDo, ...doing, ...done]
            .find(el => el.id === draggableId)

        switch (source.droppableId) {
            case '1':
                setToDo((prev) => [...prev.filter(el => el.id !== draggableId)])
                break
            case '2':
                setDoing((prev) => [...prev.filter(el => el.id !== draggableId)])
                break
            case '3':
                setDone((prev) => [...prev.filter(el => el.id !== draggableId)])
                break
        }

        if (!task) return
        switch (destination?.droppableId) {
            case '1':
                setToDo((prev) => {
                    const newList = [...prev]
                    newList.splice(destination.index, 0, task)

                    return newList
                })
                break;
            case '2':
                setDoing((prev) => {
                    const newList = [...prev]
                    newList.splice(destination.index, 0, task)

                    return newList
                })
                break;
            case '3':
                setDone((prev) => {
                    const newList = [...prev]
                    newList.splice(destination.index, 0, task)

                    return newList
                })
                break;
        }
    }

    const handleCreateTask = (task: ITask) => {
        setToDo(prev => [...prev, task])
    }

    return (
        <MainContainer>
            <PageTitle>
                Quadro Kanban
            </PageTitle>
            <KanbanArea>
                <DragDropContext onDragEnd={onDragEnd}>
                    <KanbanBoard>
                        <ProjectTitle>
                            Nome do projeto
                        </ProjectTitle>
                        <KanbanColumnsArea>
                            <Column
                                id="1"
                                taskList={toDo}
                                role="A fazer"
                                description="Atividades em aberto, não resolvidas."
                                handleUpdateTask={(task, index) => {
                                    setToDo((prev) => {
                                        const newList = [...prev]
                                        newList.splice(index, 1, task)

                                        console.log(newList)
                                        return newList
                                    })
                                }}
                                handleDeleteTask={(index) => {
                                    setToDo((prev) => {
                                        const newList = [...prev]
                                        newList.splice(index, 1)

                                        return newList
                                    })
                                }}
                            />
                            <Column
                                id="2"
                                taskList={doing}
                                role="Fazendo"
                                description="Atividades em andamento, sendo realizadas."
                                handleUpdateTask={(task, index) => {
                                    setDoing((prev) => {
                                        const newList = [...prev]
                                        newList.splice(index, 1, task)

                                        return newList
                                    })
                                }}
                                handleDeleteTask={(index) => {
                                    setDoing((prev) => {
                                        const newList = [...prev]
                                        newList.splice(index, 1)

                                        return newList
                                    })
                                }}
                            />
                            <Column
                                id="3"
                                taskList={done}
                                role="Feito"
                                description="Atividades finalizadas, concluídas."
                                handleUpdateTask={(task, index) => {
                                    setDone((prev) => {
                                        const newList = [...prev]
                                        newList.splice(index, 1, task)

                                        return newList
                                    })
                                }}
                                handleDeleteTask={(index) => {
                                    setDone((prev) => {
                                        const newList = [...prev]
                                        newList.splice(index, 1)

                                        return newList
                                    })
                                }}
                            />
                        </KanbanColumnsArea>
                        <Button
                            icon={<PlusIcon />}
                            onClick={() => setOpenNewTaskModal(true)}
                            type="primary"
                        >
                            NOVA ATIVIDADE
                        </Button>
                        <TaskModal
                            open={openNewTaskModal}
                            setOpen={setOpenNewTaskModal}
                            handleCreateTask={handleCreateTask}
                        />
                    </KanbanBoard>
                </DragDropContext>
            </KanbanArea>
        </MainContainer>
    );
}

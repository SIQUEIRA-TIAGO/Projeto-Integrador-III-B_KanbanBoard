'use client'
import React, { useEffect, useState } from "react";

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import type { ITask } from "@/app/board/_components/Task/types";
import TaskModal from "@/app/board/_components/TaskModal";
import Column from "@/app/board/_components/Column";
import { FaPlus as PlusIcon } from "react-icons/fa";
import { Button, Input } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons"
import { FloatButton } from 'antd';
import {
    KanbanArea,
    KanbanBoard,
    KanbanColumnsArea,
    MainContainer,
    PageTitle,
    ProjectTitle
} from "@/app/board/wind";

export default function Board() {
    const [openNewTaskModal, setOpenNewTaskModal] = useState<boolean>(false)
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [projectTitle, setProjectTitle] = useState<string>("Nome do projeto");

    const [toDo, setToDo] = useState<ITask[]>([])
    const [doing, setDoing] = useState<ITask[]>([])
    const [done, setDone] = useState<ITask[]>([])

    useEffect(() => {
        const _toDo = localStorage.getItem('toDo')
        if (_toDo) setToDo(JSON.parse(_toDo))

        const _doing = localStorage.getItem('doing')
        if (_doing) setDoing(JSON.parse(_doing))

        const _done = localStorage.getItem('done')
        if (_done) setDone(JSON.parse(_done))

        const _projectTitle = localStorage.getItem('projectTitle')
        if (_projectTitle) setProjectTitle(_projectTitle)
    }, [])

    useEffect(() => {
        localStorage.setItem('toDo', JSON.stringify(toDo))
    }, [toDo])

    useEffect(() => {
        localStorage.setItem('doing', JSON.stringify(doing))
    }, [doing])

    useEffect(() => {
        localStorage.setItem('done', JSON.stringify(done))
    }, [done])

    useEffect(() => {
        localStorage.setItem('projectTitle', projectTitle)
    }, [projectTitle])

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

    const newProject = () => {
        setDoing([])
        setDone([])
        setToDo([])
        setIsEditable(false)
        setProjectTitle('Novo projeto')
    }

    return (
        <MainContainer>
            <div className="w-full border shadow-sm flex justify-between items-center p-8">
                <PageTitle>
                    TaskFlow
                </PageTitle>
                <Button onClick={() => newProject()} className="w-32 h-10 font-bold" type="primary">
                    Novo projeto
                </Button>
            </div>
            <KanbanArea>
                <DragDropContext onDragEnd={onDragEnd}>
                    <KanbanBoard>
                        <div className="flex gap-4 justify-start items-center">
                            <Button onClick={() => setIsEditable(!isEditable)} icon={isEditable ? <CheckOutlined className="text-lg" /> : <EditOutlined className="text-lg" />} />
                            {
                                isEditable ? (
                                    <Input className="text-2xl font-bold h-12" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} />
                                ) : (
                                    <ProjectTitle>{projectTitle}</ProjectTitle>
                                )
                            }


                        </div>
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
                        <FloatButton className="w-16 h-16 right-16 bottom-16" icon={<PlusIcon />} onClick={() => setOpenNewTaskModal(true)} type="primary" />
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

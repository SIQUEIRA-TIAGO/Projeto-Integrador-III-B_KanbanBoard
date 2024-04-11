'use client'

import { Button, ConfigProvider, DatePicker, Form, FormProps, Input, Modal, Select } from 'antd';
import React, { type ChangeEvent, Dispatch, SetStateAction } from 'react'
import { ITask } from '../Task/types';
import { OptionContainer, OptionPriorityColor } from './wind';
import locale from 'antd/locale/pt_BR';
import { v4 } from 'uuid';
import dayjs from 'dayjs';

export default function TaskModal(
    {
        open,
        setOpen,
        handleCreateTask,
        handleUpdateTask,
        index,
        taskToUpdate,
        handleDeleteTask
    }: {
        open: boolean
        setOpen: Dispatch<SetStateAction<boolean>>
        handleCreateTask?: (task: ITask) => void
        handleUpdateTask?: (task: ITask, index: number) => void
        handleDeleteTask?: (index: number) => void
        taskToUpdate?: ITask
        index?: number
    }
) {

    const [form] = Form.useForm<ITask>();

    const onFinish: FormProps<ITask>["onFinish"] = (values) => {
        console.log('Success:', values);
        if (taskToUpdate && index !== undefined) {
            handleUpdateTask && handleUpdateTask({
                ...values,
                id: taskToUpdate.id
            }, index)
            setOpen(false)
            return
        }

        handleCreateTask && handleCreateTask({
            ...values,
            id: v4()
        })
        form.resetFields()
        setOpen(false)
    };

    const onFinishFailed: FormProps<ITask>["onFinishFailed"] = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    const handleOk = () => {
        form.submit()
    };

    const handleCancel = () => {
        form.resetFields()
        setOpen(false)
    };

    const onPriorityChange = (value: 1 | 2 | 3 | 4) => {
        form.setFieldsValue({
            ...form.getFieldsValue,
            priority: value
        });
    };

    const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        form.setFieldsValue({
            ...form.getFieldsValue,
            description: e.target.value
        });
    };

    const onMemberChange = (e: ChangeEvent<HTMLInputElement>) => {
        form.setFieldsValue({
            ...form.getFieldsValue,
            member: e.target.value
        });
    };

    const onDeadLineChange = (_: any, value: string | string[]) => {
        if (Array.isArray(value)) return

        form.setFieldsValue({
            ...form.getFieldsValue,
            deadLine: value
        });
    };

    return (
        <>
            <Modal
                title="Atividade"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={() => {
                    const defaultButtons = [
                        <Button key="cancel" onClick={handleCancel}>
                            Cancelar
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleOk}>
                            Confirmar
                        </Button>,
                    ]
                    if (
                        taskToUpdate
                        && handleDeleteTask
                        && index !== undefined
                    ) {
                        return [
                            <Button
                                danger
                                key={'delete'}
                                type="default"
                                onClick={() => handleDeleteTask(index)}
                            >
                                Excluir
                            </Button>,
                            ...defaultButtons
                        ]
                    }

                    return defaultButtons
                }}
            >
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        initialValue={taskToUpdate?.priority}
                        name="priority"
                        label="Prioridade"
                        tooltip="Defina o nível de prioridade da sua atividade"
                    >
                        <Select
                            style={{ width: '100%' }}
                            options={[
                                { label: 'Baixa', value: 1, },
                                { label: 'Moderada', value: 2, },
                                { label: 'Alta', value: 3, },
                                { label: 'Urgente', value: 4, }
                            ]}
                            optionRender={({ label, value }) => (
                                <OptionContainer>
                                    <span>
                                        {/* @ts-ignore */}
                                        <OptionPriorityColor priority={value} />
                                    </span>
                                    {label}
                                </OptionContainer>
                            )}
                            onChange={onPriorityChange}
                        />
                    </Form.Item>
                    <Form.Item
                        initialValue={taskToUpdate?.description}
                        name="description"
                        label="Descrição da atividade"
                        tooltip="Descreva sua atividade"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea onChange={onDescriptionChange} autoSize />
                    </Form.Item>
                    <Form.Item
                        initialValue={taskToUpdate?.member}
                        name="member"
                        label="Atribuir membro"
                        tooltip="Digite o nome de um membro para atribuí-lo"
                    >
                        <Input onChange={onMemberChange} />
                    </Form.Item>
                    <Form.Item
                        initialValue={taskToUpdate?.deadLine}
                        name="deadLine"
                        label="Data de entrega"
                        tooltip="Defina a data de entrega da sua atividade"
                    >
                        <ConfigProvider locale={locale}>
                            <DatePicker
                                defaultValue={
                                    taskToUpdate?.deadLine
                                        ? dayjs(taskToUpdate?.deadLine, 'DD/MM')
                                        : undefined
                                }
                                onChange={onDeadLineChange}
                                format={'DD/MM'}
                                style={{
                                    width: '100%'
                                }}
                            />
                        </ConfigProvider>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

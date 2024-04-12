'use client'

import React, {
    type ForwardedRef,
    type PropsWithChildren,
    useEffect,
    useRef,
    forwardRef
} from "react"

export const TaskContainer = forwardRef((
    {
        isDragging,
        ...props
    }: PropsWithChildren<JSX.IntrinsicElements['div'] & {
        isDragging: boolean;
    }>,
    ref: ForwardedRef<HTMLDivElement>
): JSX.Element => {
    return (
        <div
            ref={ref}
            className='rounded-md p-5 border bg-[#1f1f1f] flex flex-col gap-4'
            style={{
                opacity: isDragging ? '0.50' : '1'
            }}
            {...props}
        />
    );
});

// Adicionando um displayName para ajudar na depuração
TaskContainer.displayName = 'TaskContainer';

export const TaskHeader = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <div className='flex items-center gap-3' {...props} />
}

export const TaskDeadLine = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <div
        className='flex items-center text-sm gap-2 font-medium text-gray-400'
        {...props}
    />
}

export const TaskDescription = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <p
        className='whitespace-break-spaces text-gray-400'
        style={{
            overflowWrap: 'anywhere'
        }}
        {...props}
    />
}

export const TaskPriority = (
    {
        priority,
        ...props
    }: PropsWithChildren<JSX.IntrinsicElements['div'] & {
        priority: 1 | 2 | 3 | 4
    }>
): JSX.Element => {

    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const div = divRef.current
        if (!div) return

        switch (priority) {
            case 1:
                div.classList.remove(...[
                    'bg-yellow-500',
                    'bg-orange-500',
                    'bg-red-500'
                ])
                div.classList.add('bg-green-500')
                break;
            case 2:
                div.classList.remove(...[
                    'bg-green-500',
                    'bg-orange-500',
                    'bg-red-500'
                ])
                div.classList.add('bg-yellow-500')
                break;
            case 3:
                div.classList.remove(...[
                    'bg-green-500',
                    'bg-yellow-500',
                    'bg-red-500'
                ])
                div.classList.add('bg-orange-500')
                break;
            case 4:
                div.classList.remove(...[
                    'bg-green-500',
                    'bg-yellow-500',
                    'bg-orange-500'
                ])
                div.classList.add('bg-red-500')
                break;
        }

    }, [divRef, priority])

    return <div
        className='w-full h-4 rounded'
        title={(() => {
            switch (priority) {
                case 1:
                    return 'Prioridade Baixa'
                case 2:
                    return 'Prioridade Moderada'
                case 3:
                    return 'Prioridade Alta'
                case 4:
                    return 'Prioridade Urgente'
            }
        })()}
        ref={divRef}
        {...props}
    />
}
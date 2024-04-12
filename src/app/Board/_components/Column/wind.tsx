'use client'

import React, {
    type ForwardedRef,
    type PropsWithChildren,
    forwardRef,
} from "react"

export const ColumnContainer = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <div
        className='flex flex-col gap-2 grow basis-[317px] max-w-[425px] h-full'
        {...props}
    />
}

export const ColumnRole = (
    props: PropsWithChildren<JSX.IntrinsicElements['h3']>
): JSX.Element => {
    return <h3 className='font-bold text-xl' {...props} />
}

export const ColumnDescription = (
    props: PropsWithChildren<JSX.IntrinsicElements['p']>
): JSX.Element => {
    return <p className='font-medium text-sm' {...props} />
}

export const ColumnTaskList = forwardRef((
    props: PropsWithChildren<JSX.IntrinsicElements['div']>,
    ref: ForwardedRef<HTMLDivElement>
): JSX.Element => {
    return (
        <div
            ref={ref}
            className='h-[60vh] overflow-auto flex flex-col gap-3 p-3 rounded-lg border shadow-md'
            {...props}
        />
    );
});

ColumnTaskList.displayName = 'ColumnTaskList';
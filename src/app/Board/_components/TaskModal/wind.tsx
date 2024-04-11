'use client'
import React, { useEffect, useRef, type PropsWithChildren, } from "react"

export const OptionContainer = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <div className='flex gap-2 item-center' {...props} />
}

export const OptionPriorityColor = (
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
                div.classList.add('bg-green-500')
                break
            case 2:
                div.classList.add('bg-yellow-500')
                break
            case 3:
                div.classList.add('bg-orange-500')
                break
            case 4:
                div.classList.add('bg-red-500')
                break
        }
    }, [divRef, priority])

    return <div
        className='h-full w-2 rounded'
        ref={divRef}
        {...props}
    />
}
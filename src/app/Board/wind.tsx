'use client'

import React, { PropsWithChildren } from "react"

export const MainContainer = (
    props: PropsWithChildren<JSX.IntrinsicElements['main']>
): JSX.Element => {
    return <main
        className="min-h-screen w-full bg-gradient-to-tr from-[#141e30] to-[#243b55]"
        {...props}
    />
}

export const PageTitle = (
    props: PropsWithChildren<JSX.IntrinsicElements['h1']>
): JSX.Element => {
    return <h1
        className="p-10 text-3xl font-bold text-white text-center"
        {...props}
    />
}

export const KanbanArea = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <div
        className="h-full flex justify-center align-start pb-10 pl-8 pr-8"
        {...props}
    />
}

export const KanbanBoard = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <div
        className="p-6 flex flex-col gap-4 h-full w-full max-w-[1350px] bg-white rounded-lg"
        {...props}
    />
}

export const ProjectTitle = (
    props: PropsWithChildren<JSX.IntrinsicElements['h3']>
): JSX.Element => {
    return <h3 className="text-2xl font-bold" {...props} />
}

export const KanbanColumnsArea = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <div className="h-full flex gap-4 flex-wrap" {...props} />
}
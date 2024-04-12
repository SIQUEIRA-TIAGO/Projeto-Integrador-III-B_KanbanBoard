'use client'

import React, { type PropsWithChildren } from "react"
import { josefin } from "../_components/fonts";

export const MainContainer = (
    props: PropsWithChildren<JSX.IntrinsicElements['main']>
): JSX.Element => {
    return <main
        className="min-h-screen w-full"
        {...props}
    />
}

export const PageTitle = (
    props: PropsWithChildren<JSX.IntrinsicElements['h1']>
): JSX.Element => {
    return <h1
        className={`${josefin.className} text-3xl font-semibold antialiased flex justify-start items-center`}
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
    return <h3 className="text-2xl font-bold h-12 flex justify-start items-center" {...props} />
}

export const KanbanColumnsArea = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <div className="h-full flex gap-4 flex-wrap" {...props} />
}
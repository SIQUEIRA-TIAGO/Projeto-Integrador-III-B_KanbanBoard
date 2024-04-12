'use client'

import React, { type PropsWithChildren } from "react"
import { josefin } from "../_components/fonts";

export const MainContainer = (
    props: PropsWithChildren<JSX.IntrinsicElements['main']>
): JSX.Element => {
    return <main
        className="min-h-screen w-full flex flex-col justify-center items-center"
        {...props}
    />
}

export const FormContainer = (
    props: PropsWithChildren<JSX.IntrinsicElements['div']>
): JSX.Element => {
    return <div
        className="w-80 h-96 rounded-lg border shadow-xl flex flex-col justify-center items-center p-6 gap-4"
        {...props}
    />
}

export const Logo = (
    props: PropsWithChildren<JSX.IntrinsicElements['h1']>
): JSX.Element => {
    return <h1
        className={`${josefin.className} text-3xl font-semibold antialiased`}
        {...props}
    />
}


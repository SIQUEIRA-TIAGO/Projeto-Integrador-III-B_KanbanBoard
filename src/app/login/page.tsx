'use client'
import React, { useState } from "react";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    MainContainer,
    FormContainer,
    Logo
} from "@/app/login/wind";
import { useRouter } from "next/navigation";


export default function Login() {
    const router = useRouter()
    const [loadings, setLoadings] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function auth() {
        setLoadings(true)

        const format = `${username}:${password}`;
        const base64Format = btoa(format);
        if (base64Format == process.env.USER_TOKEN) {
            router.push('/board')
        } else {
            toast.error("Usuário e/ou senha incorretos!")
            setLoadings(false)
        }
    }

    return (
        <MainContainer>
            <ToastContainer />
            <FormContainer>
                <Logo>TaskFlow</Logo>
                <Input
                    size="large"
                    placeholder="usuário"
                    prefix={<UserOutlined />}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input.Password
                    size="large"
                    placeholder="senha"
                    prefix={<LockOutlined />}
                    iconRender={(visible) => (visible
                        ? <EyeTwoTone />
                        : <EyeInvisibleOutlined />
                    )}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    className="w-full h-10 font-bold"
                    type="primary"
                    loading={loadings} onClick={() => auth()}
                >
                    ENTRAR
                </Button>
            </FormContainer>
        </MainContainer>
    )
}

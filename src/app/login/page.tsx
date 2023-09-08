'use client'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import Login from '@/components/login/Login'

function Auth() {
  return (
    <NextUIProvider>
      <div className="bg-slate-300 w-full h-screen flex items-center justify-center">
        <Login />
      </div>
    </NextUIProvider>
  )
}

export default Auth

'use client'
import React from 'react'
import { Button, NextUIProvider } from '@nextui-org/react'
import Login from '@/components/login/Login'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/react'

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

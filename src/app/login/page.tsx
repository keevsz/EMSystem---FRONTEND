'use client'
import React from 'react'
import { Button, NextUIProvider } from '@nextui-org/react'
import Login from '@/components/login/Login'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import SchoolPng from '../../../public/school.png'
import { useRouter } from 'next/navigation'

function Auth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  return (
    <NextUIProvider>
      <div className="bg-slate-300 w-full h-screen flex items-center justify-center">
        {!status ? (
          <>Cargando</>
        ) : status === 'unauthenticated' ? (
          <Login />
        ) : (
          <div className="bg-white p-10 text-center justify-center w-1/4 flex flex-col">
            <h3 className="text-xl font-bold">IEP </h3>
            <div className="flex justify-center ">
              <Image src={SchoolPng} width={100} alt="School icon"></Image>
            </div>
            <h4 className="text-xl font-bold">Rayitos del sol</h4>

            <Button
              type="submit"
              name="btnRegister"
              className="mt-3 w-full rounded-sm"
              color="primary"
              onClick={() => {
                router.push('/')
              }}
            >
              Ingresar
            </Button>
          </div>
        )}
      </div>
    </NextUIProvider>
  )
}

export default Auth

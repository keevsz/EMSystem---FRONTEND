'use client'
import React from 'react'
import { Input, Button, NextUIProvider } from '@nextui-org/react'
import Image from 'next/image'
import SchoolPng from '../../../public/school.png'
import { useRouter } from 'next/navigation'

function Auth() {
  const router = useRouter()
  return (
    <NextUIProvider>
      <div className="bg-slate-300 w-full h-screen flex items-center justify-center">
        <div className="bg-white p-10 text-center justify-center w-1/4 flex flex-col">
          <h3 className="text-xl font-bold">IEP</h3>
          <div className="flex justify-center ">
            <Image src={SchoolPng} width={100} alt="School icon"></Image>
          </div>
          <h4 className="text-xl font-bold">Rayitos del sol</h4>
          <Input
            isRequired
            type="text"
            label="Usuario"
            className="my-2 w-full"
          />
          <Input
            isRequired
            type="password"
            label="Contraseña"
            className="my-2 w-full"
          />
          <Button
            onClick={() => {
              router.push('/')
            }}
            className="mt-3 w-full rounded-sm"
            color="primary"
          >
            Ingresar
          </Button>
        </div>
      </div>
    </NextUIProvider>
  )
}

export default Auth

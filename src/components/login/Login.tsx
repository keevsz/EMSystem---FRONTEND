'use client'

import React, { FormEvent, useState } from 'react'
import { Input, Button, Spinner } from '@nextui-org/react'
import Image from 'next/image'
import SchoolPng from '../../../public/school.png'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Login() {
  const [error, setError] = useState('')

  const { data: session, status, update } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'authenticated') return router.push('/')

    const formData = new FormData(e.currentTarget)

    const res = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    })
    if (res?.error) return setError(res.error as string)
    if (res?.ok) return router.push('/')
  }

  return (
    <div className="bg-white p-10 text-center justify-center w-1/4 flex flex-col">
      <h3 className="text-xl font-bold">IEP </h3>
      <div className="flex justify-center ">
        <Image
          priority
          src={SchoolPng}
          width={100}
          alt="School icon"
        ></Image>
      </div>
      <h4 className="text-xl font-bold">Rayitos del sol</h4>

      <form action="" onSubmit={handleSubmit}>
        <div
          className=" flex flex-col justify-center items-center"
          style={{ minHeight: 150 }}
        >
          {status === 'unauthenticated' ? (
            <>
              <Input
                isRequired
                type="text"
                name="username"
                label="Usuario"
                className="my-2 w-full"
              />
              <Input
                isRequired
                type="password"
                name="password"
                label="Contraseña"
                className="my-2 w-full"
              />
            </>
          ) : status === 'authenticated' ? (
            <div className="font-semibold">
              <h3> Sesión activa</h3>
              <h4>
                {session.user.firstName} {session.user.lastName}
              </h4>
              <h4>como {session.user.username}</h4>
            </div>
          ) : (
            <Spinner size="lg" color="default" />
          )}
        </div>
        <Button
          type="submit"
          name="btnRegister"
          className="mt-3 w-full rounded-sm"
          color="primary"
        >
          Ingresar
        </Button>
        <div className="h-4 pt-2">
          <span className="text-red-500 text-sm ">
            {error && 'Credenciales incorrectas'}
          </span>
        </div>
      </form>
    </div>
  )
}

export default Login

'use client'

import React, { FormEvent, useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import Image from 'next/image'
import SchoolPng from '../../../public/school.png'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Login() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
    <form
      action=""
      onSubmit={handleSubmit}
      className="bg-white p-10 text-center justify-center w-1/4 flex flex-col"
    >
      <h3 className="text-xl font-bold">IEP </h3>
      <div className="flex justify-center ">
        <Image src={SchoolPng} width={100} alt="School icon"></Image>
      </div>
      <h4 className="text-xl font-bold">Rayitos del sol</h4>
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
  )
}

export default Login

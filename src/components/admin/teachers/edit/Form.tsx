'use client'

import React, { FormEvent, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import {
  fetchCreateTeacher,
  fetchEditUser,
  fetchUploadImg,
} from '@/app/api/users/route'
import { useSession } from 'next-auth/react'
import { ITeacher, IUser } from '@/types/user'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props {
  user: IUser
}

function Form({ user }: Props) {
  const { data } = useSession()
  const [selected, setSelected] = React.useState('m')

  const [userData, setUserData] = useState<Partial<IUser>>({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    password: '',
  })
  const [pic, setPic] = useState<any>(user.avatar)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const router = useRouter()

  const fetchEditTeacherFn = async () => {
    let picToSend = pic === user.avatar ? user.avatar : pic
    if (!userData.firstName || !userData.lastName || !userData.username) {
      return Promise.reject('Datos invalidos')
    }
    await fetchEditUser(
      data?.backendTokens.accessToken!,
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username,
        password: userData.password,
        avatar: picToSend,
        role: user.role,
      },
      user._id
    )
    router.push('/users')
    router.refresh()
  }

  const uploadImage = async (files: File) => {
    const response: any = await fetchUploadImg(files)
    setPic(response.data.url)
  }

  const handleSubmit = async () => {
    toast.promise(fetchEditTeacherFn(), {
      loading: 'Guardando...',
      success: <b>Cambios guardados.</b>,
      error: (error) => <b>{error}</b>,
    })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold">Editar datos generales del usuario</h3>
      <div className="flex gap-4 items-center">
        <Image
          alt="Pic"
          width={500}
          height={500}
          src={pic}
          className="w-36 h-36 text-large rounded-sm"
        ></Image>
        <div>
          <div className="flex gap-3">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) return
                uploadImage(e.target.files[0])
                e.target.value = ''
              }}
              className="hidden "
              id="file_input"
              type="file"
              accept=".jpg,.jpeg,.png"
            />

            <Button fullWidth>
              <label
                className="cursor-pointer bg-gray-300 w-full h-full flex justify-center items-center"
                htmlFor="file_input"
              >
                Editar
              </label>
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setPic(user.avatar)
              }}
            >
              Restablecer
            </Button>
          </div>
          <div>JPG, JPEG o PNG permitidos. Tamaño máximo de 800K.</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
        <Input
          fullWidth
          type="text"
          label="Nombre de usuario"
          variant="bordered"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        <Input
          fullWidth
          type="password"
          label="Ingrese nueva contraseña"
          variant="bordered"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
        <Input
          fullWidth
          type="text"
          label="Nombres"
          variant="bordered"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
        />
        <Input
          fullWidth
          type="text"
          label="Apellidos"
          variant="bordered"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
      </div>
      <Button
        color="success"
        onClick={handleSubmit}
        type="button"
        className="w-32 text-center"
      >
        Guardar cambios
      </Button>
    </form>
  )
}

export default Form

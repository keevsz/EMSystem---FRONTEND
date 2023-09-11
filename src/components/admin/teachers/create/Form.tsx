'use client'

import React, { FormEvent, useState } from 'react'
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react'
import { fetchCreateTeacher, fetchUploadImg } from '@/app/api/users/route'
import { useSession } from 'next-auth/react'
import { ITeacher } from '@/types/user'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import pic_change from './pic_change.png'
import Image from 'next/image'
import DividerC from '@/components/common/DividerC'

function Form() {
  const { data } = useSession()
  const [selected, setSelected] = React.useState('m')
  const [pic, setPic] = useState<any>(pic_change)

  const router = useRouter()

  const fetchCreateTeacherFn = async (e: FormEvent<HTMLFormElement>) => {
    let setPic = pic === pic_change ? null : pic

    const formData = new FormData(e.currentTarget)
    let teacherData: ITeacher = {
      username: formData.get('username')?.toString()!,
      email: formData.get('email')?.toString()!,
      firstName: formData.get('firstName')?.toString()!,
      lastName: formData.get('lastName')?.toString()!,
      phoneNumber: formData.get('phoneNumber')?.toString()!,
      birthdate: formData.get('birthdate')?.toString()!,
      gender: selected,
      avatar: setPic,
    }
    if (
      !teacherData.email ||
      !teacherData.firstName ||
      !teacherData.lastName ||
      !teacherData.phoneNumber ||
      !teacherData.username
    ) {
      return Promise.reject('Datos invalidos')
    }
    await fetchCreateTeacher(data?.backendTokens.accessToken!, teacherData)
    router.push('/users')
    router.refresh()
  }

  const uploadImage = async (files: File) => {
    const response: any = await fetchUploadImg(files)
    await setPic(response.data.url)
  }

  const handleUploadImage = async(files: File) => {
    toast.promise(uploadImage(files), {
      loading: 'Cargando...',
      success: <b>Imagen cargada.</b>,
      error: (error) => <b>No se pudo cargar la imagen</b>,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast.promise(fetchCreateTeacherFn(e), {
      loading: 'Guardando...',
      success: <b>Profesor registrado.</b>,
      error: (e) => <b>{e.toString()}</b>,
    })
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold -mb-6">Registrar nuevo profesor</h3>
      <DividerC />
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
                handleUploadImage(e.target.files[0])
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
                setPic(pic_change)
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
          required
        />
        <Input
          fullWidth
          type="text"
          label="email"
          variant="bordered"
          name="email"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
        <Input
          fullWidth
          type="text"
          label="Nombres"
          variant="bordered"
          name="firstName"
          required
        />
        <Input
          fullWidth
          type="text"
          label="Apellidos"
          variant="bordered"
          name="lastName"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        <Input
          type="text"
          label="Teléfono celular"
          variant="bordered"
          name="phoneNumber"
          required
          fullWidth
        />

        <Input
          type="date"
          variant="bordered"
          label="Fecha de nacimiento"
          placeholder="Select date"
          name="birthdate"
          fullWidth
        />

        <RadioGroup value={selected} onValueChange={setSelected}>
          <Radio value="m" defaultChecked>
            Masculino
          </Radio>
          <Radio value="f">Femenino</Radio>
        </RadioGroup>
      </div>
      <Button color="success" type="submit" className="w-32 text-center">
        Guardar cambios
      </Button>
    </form>
  )
}

export default Form

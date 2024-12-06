'use client'

import React, { useState } from 'react'
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react'
import { fetchUpdateProfile, fetchUploadImg } from '@/app/api/users/route'
import { useSession } from 'next-auth/react'
import { IParent, IStudent, ITeacher, IUser } from '@/types/user'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props {
  user: ITeacher & IUser & IStudent & IParent
}

function Form({ user }: Props) {
  const { data, update } = useSession()

  const INITIAL_DATA: IUser & ITeacher & IStudent & IParent = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username,
    password: '',
    birthdate: user?.birthdate,
    email: user?.email,
    gender: user?.gender,
    phoneNumber: user?.phoneNumber,
    _id: user?._id,
    avatar: user?.avatar,
    isActive: user?.isActive,
    role: user?.role,
    address: user?.address,
    dni: user?.dni,
    relation: user?.relation,
  }

  const [userData, setUserData] = useState<
    IUser & ITeacher & IStudent & IParent
  >(INITIAL_DATA)
  const [pic, setPic] = useState<any>(user.avatar)
  const [selected, setSelected] = React.useState(user.gender || 'm')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const router = useRouter()

  const fetchEditUserFn = async () => {
    let picToSend = pic === user.avatar ? user.avatar : pic
    if (!userData.firstName || !userData.lastName || !userData.username) {
      return Promise.reject('Datos invalidos')
    }

    const dataToSend: any = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      password: userData.password,
      birthdate: userData.birthdate,
      email: userData.email,
      gender: selected,
      phoneNumber: userData.phoneNumber,
      avatar: picToSend,
      role: user.role,
      relation: userData.relation,
      dni: userData.dni,
    }

    await fetchUpdateProfile(
      data?.backendTokens.accessToken!,
      dataToSend,
      user._id
    )
    update()
    router.refresh()
    router.push('/')
  }

  const uploadImage = async (files: File) => {
    const response: any = await fetchUploadImg(files)
    await setPic(response.data.url)
  }

  const handleUploadImage = async (files: File) => {
    toast.promise(uploadImage(files), {
      loading: 'Cargando...',
      success: <b>Imagen cargada.</b>,
      error: (error) => <b>No se pudo cargar la imagen</b>,
    })
  }

  const handleSubmit = async () => {
    toast.promise(fetchEditUserFn(), {
      loading: 'Guardando...',
      success: <b>Cambios guardados.</b>,
      error: (error) => <b>{error.toString()}</b>,
    })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex gap-4 items-center">
        <Image
          alt="Pic"
          width={500}
          height={500}
          src={pic}
          className="w-36 h-36 text-large rounded-sm"
        ></Image>
        <div>
          {user.role === 'student' ? (
            ''
          ) : (
            <>
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

                <div className='flex justify-center items-center gap-2 flex-wrap'>
                  <Button fullWidth>
                    <label
                      className="cursor-pointer bg-gray-300 w-full h-full flex justify-center items-center"
                      htmlFor="file_input"
                    >
                      Editar
                    </label>
                  </Button>
                  <Button
                    fullWidth
                    color="danger"
                    onClick={() => {
                      setPic(user.avatar)
                    }}
                  >
                    Restablecer
                  </Button>
                </div>
              </div>
              <div className='text-xs text-bold mt-2'>JPG, JPEG o PNG permitidos. Tamaño máximo de 800K.</div>
            </>
          )}
        </div>
      </div>
      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 ${
          user.role !== 'student'
            ? 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
            : ''
        }`}
      >
        <Input
          fullWidth
          type="text"
          label="Nombre de usuario"
          variant="bordered"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
        {user.role === 'student' ? (
          ''
        ) : (
          <Input
            fullWidth
            type="password"
            label="Ingrese nueva contraseña"
            variant="bordered"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        )}
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
      {/* //TODO: Teacher imputs */}
      {user.role === 'teacher' ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            <Input
              fullWidth
              type="text"
              label="email"
              variant="bordered"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Teléfono celular"
              variant="bordered"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            <Input
              type="date"
              variant="bordered"
              label="Fecha de nacimiento"
              placeholder="Select date"
              name="birthdate"
              value={userData.birthdate}
              onChange={handleChange}
              fullWidth
            />
            <RadioGroup value={selected} onValueChange={setSelected}>
              <Radio value="m" defaultChecked>
                Masculino
              </Radio>
              <Radio value="f">Femenino</Radio>
            </RadioGroup>
          </div>
        </>
      ) : null}

      {/* //TODO: Parent imputs */}
      {user.role === 'parent' ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            <Input
              fullWidth
              type="text"
              label="email"
              variant="bordered"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Teléfono celular"
              variant="bordered"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            <Input
              fullWidth
              type="text"
              label="DNI"
              variant="bordered"
              name="dni"
              value={userData.dni}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Relación con hijo"
              variant="bordered"
              name="relation"
              value={userData.relation}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </>
      ) : null}

      {/* //TODO: Student imputs */}
      {user.role === 'student' ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            <Input
              fullWidth
              type="text"
              label="DNI"
              variant="bordered"
              name="dni"
              value={userData.dni}
              onChange={handleChange}
            />
            <Input
              type="text"
              label="Dirección"
              variant="bordered"
              name="address"
              value={userData.address}
              onChange={handleChange}
              fullWidth
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
            <Input
              type="date"
              variant="bordered"
              label="Fecha de nacimiento"
              placeholder="Select date"
              name="birthdate"
              value={userData.birthdate}
              onChange={handleChange}
              fullWidth
            />
            <RadioGroup value={selected} onValueChange={setSelected}>
              <Radio value="m" defaultChecked>
                Masculino
              </Radio>
              <Radio value="f">Femenino</Radio>
            </RadioGroup>
          </div>
        </>
      ) : null}
      {user.role === 'student' ? (
        ''
      ) : (
        <Button
          color="success"
          onClick={handleSubmit}
          type="button"
          className="w-32 text-center"
        >
          Guardar cambios
        </Button>
      )}
    </form>
  )
}

export default Form

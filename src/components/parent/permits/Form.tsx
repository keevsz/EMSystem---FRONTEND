'use client'

import React, { useState, useEffect } from 'react'
import { Textarea, Button, Select, SelectItem } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { IStudentP, ITeacher } from '@/types/user'
import { fetchCreatePermit } from '@/app/api/permits/permitsAPI'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


interface Props {
  studentsC: IStudentP[]
  teachersC: ITeacher[]
}

const INITIAL_DATA = {
  teacher: '',
  student: '',
  description: '',
}
export default function FormCreatePermit({ studentsC, teachersC }: Props) {
  const [data, setData] = useState(INITIAL_DATA)

  const { data: session, status } = useSession()
  const router = useRouter()

  const fetchCreatePermitFN = async () => {
    if (
      !data.description.trim().length ||
      !data.teacher.trim().length ||
      !data.student.trim().length
    ) {
      throw new Error(`Complete todos los campos`)
    }
    await fetchCreatePermit(session?.backendTokens.accessToken!, data)
    setData(INITIAL_DATA)
    router.push('/parent/permits')
    router.refresh()
  }

  const createPermit = async () => {
    toast.promise(fetchCreatePermitFN(), {
      loading: 'Cargando...',
      success: <b>Permiso enviado</b>,
      error: (error) => <b>{error.message}</b>,
    })
  }

  if (!session) return <></>

  return (
    <div className="w-full flex flex-col gap-4 py-4">
      <div className="text-lg font-semibold">Nuevo permiso</div>
      <div className="flex">
        <div className="flex justify-end items-center w-20">Padre: </div>
        <Textarea
          variant="flat"
          size="sm"
          maxRows={1}
          labelPlacement="outside-left"
          placeholder="Ingrese el motivo de la falta"
          value={session?.user.firstName + ' ' + session?.user.lastName}
          isDisabled
        />
      </div>
      <div className="flex ">
        <div className="flex justify-end items-center w-20">Estudiante: </div>
        <Select
          items={studentsC}
          className="mx-1"
          placeholder="Seleccionar estudiante"
          onChange={(e) => {
            setData({ ...data, student: e.target.value })
          }}
        >
          {(student) => (
            <SelectItem key={student.user._id!}>
              {student.user.firstName + ' ' + student.user.lastName}
            </SelectItem>
          )}
        </Select>
      </div>
      <div className="flex ">
        <div className="flex justify-end items-center w-20">Profesor: </div>
        <Select
          items={teachersC}
          className="mx-1"
          placeholder="Seleccionar profesor"
          onChange={(e) => {
            setData({ ...data, teacher: e.target.value })
          }}
        >
          {(teacher) => (
            <SelectItem key={teacher._id!}>
              {teacher.user?.firstName + ' ' + teacher.user?.lastName}
            </SelectItem>
          )}
        </Select>
      </div>
      <div className="flex">
        <div className="flex justify-end items-center w-20">Motivo: </div>
        <Textarea
          variant="flat"
          labelPlacement="outside-left"
          placeholder="Ingrese el motivo de la falta"
          value={data.description}
          onValueChange={(e) => {
            setData({ ...data, description: e })
          }}
        />
      </div>
      <div className="flex justify-center">
        <Button variant="flat" color="success" onClick={createPermit}>
          Enviar
        </Button>
      </div>
    </div>
  )
}

'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { fetchParentDetails } from '@/app/api/users/route'
import { IStudentP } from '@/types/user'
import Link from 'next/link'
import { EditIcon } from '@/components/admin/users/table/EditIcon'
import { fetchDegrees, fetchSchoolYears } from '@/app/api/courses/route'
import { SchoolYear } from '@/types/tuition'

function ParentStudentsList() {
  const { data, status } = useSession()
  const [teacherStudents, setTeacherStudents] = useState<IStudentP[]>([])
  const [studentSelected, setStudentSelected] = useState('')
  const [degrees, setDegrees] = useState<IDegree[]>([])
  const [sys, setSys] = useState<SchoolYear[]>([])
  const [filter, setFilter] = useState({
    degree: '',
    schoolYear: '',
  })

  const fetchSelectsData = async () => {
    const degrees = await fetchDegrees(data?.backendTokens.accessToken!)
    setDegrees(degrees)
    const sy = await fetchSchoolYears(data?.backendTokens.accessToken!)
    setSys(sy)
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSelectsData()
    }
  }, [status])

  useEffect(() => {
    const fetchTeacherData = async () => {
      const teacherData = await fetchParentDetails(
        data?.backendTokens.accessToken!,
        data?.user._id!
      )
      setTeacherStudents(teacherData.students)
    }

    if (status === 'authenticated') {
      fetchTeacherData()
    }
  }, [status, data])

  useEffect(() => {
    console.log(studentSelected)
  }, [studentSelected])

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center pt-10">
        <Spinner />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <div>
        <div>Seleccionar periodo y grado</div>
        <div className="flex gap-5">
          <Select
            items={degrees}
            label="Grado"
            placeholder="Selecciona un grado"
            onChange={(e) => {
              setFilter({
                ...filter,
                degree: e.target.value,
              })
            }}
          >
            {(degree) => (
              <SelectItem key={degree._id}>
                {`${degree.level} - ${degree.grade}`}
              </SelectItem>
            )}
          </Select>

          <Select
            items={sys}
            label="Año"
            placeholder="Selecciona un año"
            onChange={(e) => {
              setFilter({
                ...filter,
                schoolYear: e.target.value,
              })
            }}
          >
            {(sys) => <SelectItem key={sys._id}>{sys.year}</SelectItem>}
          </Select>
          <Button>Buscar</Button>
        </div>
      </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nombres y apellidos</TableColumn>
          <TableColumn>DNI</TableColumn>
          {/* <TableColumn className="flex items-center">Notas</TableColumn> */}
        </TableHeader>
        <TableBody>
          {teacherStudents.map((student) => {
            return (
              <TableRow key={student._id}>
                <TableCell>
                  {student.user.firstName} {student.user.lastName}
                </TableCell>
                <TableCell>{student.dni}</TableCell>
                {/* <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip
                      content="Ver notas"
                      onClick={() => {
                        console.log('clicked')
                        setStudentSelected(student._id!)
                      }}
                    >
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell> */}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ParentStudentsList

'use client'

import {
  fetchDegrees,
  fetchSchoolYears,
  fetchTeacherCourses,
} from '@/app/api/courses/route'
import { ITeacherCourse } from '@/types/course'
import { SchoolYear } from '@/types/tuition'
import { Button, Card, Select, SelectItem } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function TeacherCourses() {
  const { data: session } = useSession()
  const [filter, setFilter] = useState({
    degree: '',
    schoolYear: '',
  })
  const [teacherCourses, setTeacherCourses] = useState<ITeacherCourse[]>([])
  const [degrees, setDegrees] = useState<IDegree[]>([])
  const [sys, setSys] = useState<SchoolYear[]>([])

  const fetchSelectsData = async () => {
    const degrees = await fetchDegrees(session?.backendTokens.accessToken!)
    setDegrees(degrees)
    const sy = await fetchSchoolYears(session?.backendTokens.accessToken!)
    setSys(sy)
  }

  const fetchTeacherCoursesFn = async () => {
    const teacherCourses = await fetchTeacherCourses(
      session?.backendTokens.accessToken!,
      filter
    )
    setTeacherCourses(teacherCourses)
  }

  useEffect(() => {
    fetchSelectsData()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">Nivel educativo</h2>

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
        <Button onClick={fetchTeacherCoursesFn}>Buscar</Button>
      </div>

      <div className='text-2xl grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-4 gap-y-4"'>
        {teacherCourses.length ? (
          teacherCourses?.map((tc: ITeacherCourse, index: number) => {
            return (
              <div key={index}>
                <Link href={`/teacher/courses/${tc._id}`}>
                  <Card
                    className="p-10 cursor-pointer hover:opacity-70"
                    key={index}
                  >
                    <strong>{tc.course.name}</strong>
                    {tc.teacher.user?.lastName}
                  </Card>
                </Link>
              </div>
            )
          })
        ) : (
          <div className="flex justify-center items-center pt-10 font-semibold">
            Seleccione el grado y el año
          </div>
        )}
      </div>
    </div>
  )
}

export default TeacherCourses

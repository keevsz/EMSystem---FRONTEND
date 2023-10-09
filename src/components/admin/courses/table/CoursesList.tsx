'use client'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import React, { useState, useEffect } from 'react'
import { Input } from '@nextui-org/react'
import { fetchCreateCourse, fetchEditCourse } from '@/app/api/courses/route'
import { useSession } from 'next-auth/react'
import { EditIcon } from '../../users/table/EditIcon'
import toast from 'react-hot-toast'
import { Course } from '@/types/course'
interface Props {
  courses: Course[]
}

const INTIAL_COURSE_DATA = { name: '', description: '' }
function CoursesList({ courses }: Props) {
  const { data } = useSession()
  const [coursesFiltered, setCoursesFiltered] = useState(courses)
  const [filter, setFilter] = useState('')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [courseData, setCourseData] = useState<Course>(INTIAL_COURSE_DATA)
  const [isEdited, setIsEdited] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setFilter(e.target.value)
    if (e.target.value.trim().length < 1) {
      setCoursesFiltered(courses)
      return
    }
  }

  const fetchCreateCourseFN = async (onClose: () => void) => {
    if (
      courseData.name.trim().length < 1 ||
      courseData.description.trim().length < 1
    ) {
      throw new Error('Ingrese un nombre y descripción válido')
    }

    let course: Course
    if (isEdited === false) {
      course = await fetchCreateCourse(
        data?.backendTokens.accessToken!,
        courseData
      )
      setCoursesFiltered([...coursesFiltered, course])
      setCourseData(INTIAL_COURSE_DATA)
      onClose()
    } else {
      course = await fetchEditCourse(
        data?.backendTokens.accessToken!,
        courseData,
        courseData._id!
      )
      const newArray = coursesFiltered.map((courseI) => {
        return courseI._id === course._id ? course : courseI
      })
      setCoursesFiltered(newArray)
      setCourseData(INTIAL_COURSE_DATA)
      onClose()
    }
  }

  const handleSubmitFormCourse = async (onClose: () => void) => {
    toast.promise(fetchCreateCourseFN(onClose), {
      loading: 'Guardando...',
      success: <b>Cambios guardados.</b>,
      error: (error) => <b>{error.toString()}</b>,
    })
  }

  const handleCourseData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setCoursesFiltered(
      coursesFiltered.filter((course) =>
        course.name.toLowerCase().includes(filter.toLocaleLowerCase())
      )
    )
  }, [filter])

  return (
    <div className="flex flex-col gap-2">
      <div className="text-2xl font-bold">Cursos</div>
      <div className="pb-4 flex dark:bg-gray-900 ">
        <div className="relative w-full mt-1 flex justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={filter}
            onChange={handleSearch}
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar curso"
          />
          <Button
            color="primary"
            onPress={() => {
              onOpen()
              setIsEdited(false)
            }}
          >
            Nuevo curso
          </Button>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {isEdited? 'Editar curso': 'Registrar nuevo curso'}
                </ModalHeader>
                <ModalBody>
                  Datos del curso
                  <Input
                    value={courseData.name}
                    name="name"
                    onChange={handleCourseData}
                    placeholder="Nombre"
                  ></Input>
                  <Input
                    value={courseData.description}
                    name="description"
                    onChange={handleCourseData}
                    placeholder="Descripción"
                  ></Input>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      setCourseData(INTIAL_COURSE_DATA)
                      onClose()
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleSubmitFormCourse(onClose)
                    }}
                  >
                    Registrar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>

      <div className="block max-h-64 overflow-x-auto shadow-md sm:rounded-lg">
        {coursesFiltered?.length === 0 ? (
          <div className="flex justify-center items-center h-36 text-xl font-semibold">
            Aún no se han registrado cursos
          </div>
        ) : (
          <table className="w-full rounded text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Materia</th>
                <th className="px-6 py-3">Descripción</th>
                <th className="px-6 py-3">Código</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="max-h-64 overflow-y-auto">
              {coursesFiltered?.map((course) => {
                return (
                  <tr
                    key={course._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {course._id}
                    </th>
                    <td className="px-6 py-4">{course.name}</td>
                    <td className="px-6 py-4">{course.description}</td>
                    <td className="px-6 py-4">{course.code}</td>
                    <td className="py-4 flex justify-center items-center">
                      <Tooltip content="Editar">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <div
                            onClick={() => {
                              onOpen()
                              setCourseData({
                                _id: course._id,
                                name: course.name,
                                description: course.description,
                              })
                              setIsEdited(true)
                            }}
                          >
                            <EditIcon />
                          </div>
                        </span>
                      </Tooltip>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default CoursesList

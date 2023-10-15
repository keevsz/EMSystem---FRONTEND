'use client'
import {
  fetchCourses,
  fetchCreateTeacherCourse,
  fetchTeacherCourses,
} from '@/app/api/courses/route'
import { fetchCreateSchoolYear } from '@/app/api/users/route'
import BtnBackComponent from '@/components/common/BtnBackComponent'
import { Course, IStudentTeacherCourse, ITeacherCourse } from '@/types/course'
import { ITeacher } from '@/types/user'
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  schoolYears: ISchoolYear[]
  degrees: IDegree[]
  courses: Course[]
  teachers: ITeacher[]
}

function SchoolYears({ schoolYears, degrees, courses, teachers }: Props) {
  const { data: session, status, update } = useSession()

  const [sy, setSy] = useState(schoolYears)

  const [updatedCourses, setUpdatedCourses] = useState(courses)
  const [courseName, setCourseName] = useState('')
  const [page, setPage] = useState(0)
  const [info, setInfo] = useState<any>({
    course: '',
    degree: {},
    schoolYear: {},
    teacher: '',
  })

  const [newYear, setNewYear] = useState(0)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const submitNewSchoolYear = async () => {
    const newSy = await fetchCreateSchoolYear(
      session?.backendTokens.accessToken!,
      {
        year: newYear,
      }
    )
    setSy(sy.concat(newSy))
    setNewYear(0)
  }

  const handleSubmit = async () => {
    if (newYear === 0) return
    toast.promise(submitNewSchoolYear(), {
      loading: 'Guardando...',
      success: <b>Cambios guardados.</b>,
      error: (error) => {
        setNewYear(0)
        return <b>{error.toString()}</b>
      },
    })
  }

  const [teacherCourse, setTeacherCourse] = useState([])

  const handleFetchCourses = async () => {
    const { degree, schoolYear } = {
      degree: info.degree._id,
      schoolYear: info.schoolYear._id,
    }
    const coursesResponse = await fetchTeacherCourses(
      session?.backendTokens.accessToken!,
      { degree, schoolYear }
    )
    setTeacherCourse(coursesResponse)
  }

  const [studentTeacherCourseData, setStudentTeacherCourseData] = useState<
    IStudentTeacherCourse[]
  >([])

  const [newTeacherCourse, setNewTeacherCourse] = useState({
    degree: '',
    schoolYear: '',
    course: '',
    teacher: '',
  })

  const fetchCreateTeacherCourseFN = async (onClose: () => void) => {
    await fetchCreateTeacherCourse(
      session?.backendTokens.accessToken!,
      newTeacherCourse
    )
    onClose()
    handleFetchCourses()
  }
  const handleSubmitFormTeacherCourse = async (onClose: () => void) => {
    toast.promise(fetchCreateTeacherCourseFN(onClose), {
      loading: 'Guardando...',
      success: <b>Agregado correctamente.</b>,
      error: (error) => <b>{error.toString()}</b>,
    })
  }

  useEffect(() => {
    if (page > 0) {
      handleFetchCourses()
      setNewTeacherCourse({
        ...newTeacherCourse,
        degree: info.degree._id,
        schoolYear: info.schoolYear._id,
      })
    }
  }, [info.schoolYear, info.degree, page])

  const yearsSchoolComponent = (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold flex gap-5 justify-between">
        <div>Años escolares</div>
        <div className="flex gap-4">
          <Input
            value={newYear.toString()}
            onChange={(e) => {
              setNewYear(+e.target.value)
            }}
            type="number"
            variant="bordered"
            placeholder="Nuevo año"
          />
          <Button onClick={handleSubmit}>Nuevo año</Button>
        </div>
      </div>
      <div className="divide-x-4"></div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-4 gap-y-4"'>
        {sy
          .sort((a, b) => b.year - a.year)
          .map((SchoolYear) => (
            <Card key={SchoolYear.year}>
              <CardBody
                onClick={() => {
                  setPage(1)
                  setInfo({ ...info, schoolYear: SchoolYear })
                }}
                className="text-center cursor-pointer hover:opacity-50"
              >
                {SchoolYear.year}
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  )

  const degreesComponent = (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <div
          className="w-min"
          onClick={() => {
            setPage(0)
          }}
        >
          <BtnBackComponent />
        </div>
        <div className="text-xl font-bold">Grado</div>
      </div>
      <div>
        <div className="divide-x-4"></div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-4 gap-y-4"'>
          {degrees
            .sort((a, b) => a.grade - b.grade)
            .map((degree) => (
              <Card key={degree._id}>
                <CardBody
                  onClick={() => {
                    setInfo({ ...info, degree: degree })
                    setPage(2)
                  }}
                  className="text-center cursor-pointer hover:opacity-50"
                >
                  {degree.grade}° {degree.level}
                </CardBody>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )

  const coursesComponent = (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <div className="flex">
          <div
            className="w-min"
            onClick={() => {
              setTeacherCourse([])
              setPage(1)
            }}
          >
            <BtnBackComponent />
          </div>
          <div className="text-xl font-bold">
            Asignar: {info.schoolYear.year} - {info.degree.grade}° de{' '}
            {info.degree.level}
          </div>
        </div>
      </div>
      <div>
        <Button
          color="primary"
          onPress={async () => {
            onOpen()
            let coursesUpdated = await fetchCourses(
              session?.backendTokens.accessToken!
            )
            setUpdatedCourses(coursesUpdated)
          }}
        >
          Registrar nuevo
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {info.schoolYear.year} - {info.degree.grade}° de{' '}
                  {info.degree.level}
                </ModalHeader>
                <ModalBody>
                  <Select
                    items={updatedCourses}
                    label="Curso"
                    placeholder="Selecciona un curso"
                    onChange={(e) => {
                      setNewTeacherCourse({
                        ...newTeacherCourse,
                        course: e.target.value,
                      })
                    }}
                  >
                    {(course) => (
                      <SelectItem key={course._id!}>{course.name}</SelectItem>
                    )}
                  </Select>

                  <Select
                    items={teachers}
                    label="Profesor"
                    placeholder="Seleccionar un profesor"
                    onChange={(e) => {
                      setNewTeacherCourse({
                        ...newTeacherCourse,
                        teacher: e.target.value,
                      })
                    }}
                  >
                    {(teacher) => (
                      <SelectItem key={teacher._id!}>
                        {teacher.user!.lastName}
                      </SelectItem>
                    )}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose()
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleSubmitFormTeacherCourse(onClose)
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
      {teacherCourse?.length ? (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-4 gap-y-4"'>
          {teacherCourse.map((c: ITeacherCourse) => (
            <Card key={c._id}>
              <CardBody
                onClick={() => {
                  setPage(3)
                  setStudentTeacherCourseData(c.students!)
                  setCourseName(c.course.name)
                }}
                className="text-center cursor-pointer hover:opacity-50"
              >
                <div className="text-lg font-bold">{c.course.name}</div>
                <div>{c.teacher.user!.firstName}</div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div className="h-24 text-xl font-semibold flex justify-center items-center">
          Aún no se han registrado alumnos
        </div>
      )}
    </div>
  )

  const studentTeacherCourse = (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <div
          className="w-min"
          onClick={() => {
            setPage(2)
            setStudentTeacherCourseData([])
          }}
        >
          <BtnBackComponent />
        </div>
        <div className="text-xl font-bold">
          {info.schoolYear.year} | {info.degree.grade}° de {info.degree.level} |{' '}
          {courseName}
        </div>
      </div>
      <div>
        <div className="divide-x-4"></div>
        <div className="font-semibold text-lg">Estudiantes</div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Nombres y apellidos</TableColumn>
            <TableColumn>Nombre de usuario</TableColumn>
            <TableColumn>DNI</TableColumn>
          </TableHeader>
          <TableBody>
            {studentTeacherCourseData.map((stc) => {
              return (
                <TableRow key={stc._id}>
                  <TableCell>
                    {stc.user.firstName} {stc.user.lastName}
                  </TableCell>
                  <TableCell>{stc.user.username}</TableCell>
                  <TableCell>{stc.dni}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )

  const pages = [
    yearsSchoolComponent,
    degreesComponent,
    coursesComponent,
    studentTeacherCourse,
  ]
  return pages[page]
}

export default SchoolYears

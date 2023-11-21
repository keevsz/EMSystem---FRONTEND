'use client'

import { fetchReport } from '@/app/api/notes/notesAPI'
import { fetchStudentsFiltered } from '@/app/api/users/route'
import BtnBackComponent from '@/components/common/BtnBackComponent'
import { Course } from '@/types/course'
import { INoteReport } from '@/types/note'
import { IStudentP, ITeacher } from '@/types/user'
import {
  Button,
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(...registerables)

interface Props {
  schoolYears: ISchoolYear[]
  degrees: IDegree[]
  courses: Course[]
  teachers: ITeacher[]
}

function SearchReport({ schoolYears, degrees, courses, teachers }: Props) {
  const { data: session } = useSession()
  const [page, setPage] = useState(0)
  const [info, setInfo] = useState<any>({
    degree: {},
    schoolYear: {},
  })

  const [students, setStudents] = useState<IStudentP[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [report, setReport] = useState<INoteReport>()

  const fetchStudents = async () => {
    const filter = {
      degree: info.degree._id,
      schoolYear: info.schoolYear._id,
    }
    const studentsFetched = await fetchStudentsFiltered(
      session?.backendTokens.accessToken!,
      filter
    )
    setStudents(studentsFetched)
  }

  const fetchNotesReport = async () => {
    const filter = {
      degreeId: info.degree._id,
      schoolYearId: info.schoolYear._id,
      studentId: selectedStudentId,
    }

    const notesReport = await fetchReport(
      session?.backendTokens.accessToken!,
      filter
    )
    console.log(notesReport)
    setReport(notesReport)
  }

  useEffect(() => {
    if (page > 2) {
      fetchNotesReport()
    }
  }, [selectedStudentId, page])

  useEffect(() => {
    if (page > 1) {
      fetchStudents()
    }
  }, [info.schoolYear, info.degree, page])

  const yearsSchoolComponent = (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold flex gap-5 justify-between">
        <div>Años escolares</div>
      </div>
      <div className="divide-x-4"></div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-4 gap-y-4"'>
        {schoolYears
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

  const studentsList = (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <div
          className="w-min"
          onClick={() => {
            setPage(1)
            setStudents([])
          }}
        >
          <BtnBackComponent />
        </div>
        <div className="text-xl font-bold">
          {info.schoolYear.year} | {info.degree.grade}° de {info.degree.level}
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
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              return (
                <TableRow key={student._id}>
                  <TableCell>
                    {student.user.firstName} {student.user.lastName}
                  </TableCell>
                  <TableCell>{student.user.username}</TableCell>
                  <TableCell>{student.dni}</TableCell>
                  <TableCell
                    onClick={() => {
                      setSelectedStudentId(student._id!)
                      setPage(3)
                    }}
                    className="cursor-pointer"
                  >
                    Ver
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )

  const colors: any = {
    'AD (Excelente)': 'green',
    'A (Bueno)': 'blue',
    'B (Regular)': 'yellow',
    'C (Deficiente)': 'red',
  }

  const notesReport = (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <div
          className="w-min"
          onClick={() => {
            setPage(2)
          }}
        >
          <BtnBackComponent />
        </div>
        <div className="text-xl font-bold">
          {info.schoolYear.year} | {info.degree.grade}° de {info.degree.level}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-semibold text-lg">Notas del alumno</div>
        <div className="flex row gap-5">
          <div className="w-full flex flex-col gap-2">
            <div>
              <strong>Nombre del estudiante:</strong> {report?.student}
            </div>
            <div>
              <strong>Grado: </strong>
              {info.degree.grade}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-end justify-end">
              <br />
            </div>
            <div>
              <strong>Año escolar:</strong> {info.schoolYear.year}
            </div>
          </div>
        </div>
        {report ? (
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Curso</TableColumn>
              <TableColumn>U1</TableColumn>
              <TableColumn>U2</TableColumn>
              <TableColumn>U3</TableColumn>
              <TableColumn>Nota final</TableColumn>
            </TableHeader>
            <TableBody>
              {report!.notes.map((notes, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{notes.course}</TableCell>
                    <TableCell>{notes.units[0].note}</TableCell>
                    <TableCell>{notes.units[1].note}</TableCell>
                    <TableCell>{notes.units[2].note}</TableCell>
                    <TableCell>
                      {notes.finalNote} - {notes.finalLetter}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <></>
        )}
      </div>

      <div>
        <Bar
          style={{ width: '400px', height: '400px' }}
          title="Gráfico de notas"
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: 20,
                ticks: {
                  stepSize: 1, // Define el tamaño del paso
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Gráfico de notas',
              },
            },
          }}
          data={{
            labels: report?.notes.map((n) => n.course),
            datasets: [
              {
                label: 'Notas',
                data: report?.notes.map((n) => n.finalNote),
                backgroundColor: report?.notes.map(
                  (item) => colors[item.finalLetter] || 'gray'
                ),
              },
            ],
          }}
        ></Bar>
      </div>
      <div className="flex justify-center items-center">
        <a
          target="_blank"
          href={`/reports/notes/pdf?studentId=${selectedStudentId}&degreeId=${info.degree._id}&schoolYearId=${info.schoolYear._id}`}
          className="bg-green-600 py-2 px-6 rounded-md text-white"
        >
          PDF
        </a>
      </div>
    </div>
  )

  const pages = [
    yearsSchoolComponent,
    degreesComponent,
    studentsList,
    notesReport,
  ]
  return pages[page]
}

export default SearchReport

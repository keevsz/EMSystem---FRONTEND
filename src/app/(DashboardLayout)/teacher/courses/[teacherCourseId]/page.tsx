'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchTeacherCourse } from '@/app/api/courses/route'
import { useSession } from 'next-auth/react'
import { IStudentTeacherCourse, ITeacherCourse } from '@/types/course'
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
  Spinner,
} from '@nextui-org/react'
import { fetchEditNotes, fetchStudentNote } from '@/app/api/notes/notesAPI'
import { INote, IUnit } from '@/types/note'
import toast from 'react-hot-toast'
import BtnBack from '@/components/common/BtnBack'

function TeacherCoursesStudents() {
  const params = useParams()
  const { data: session } = useSession()

  const [teacherCourse, setTeacherCourse] = useState<ITeacherCourse>()

  const [notes, setNotes] = useState<IUnit[]>()
  const [finalNote, setFinalNote] = useState<number>(0)
  const [noteId, setNoteId] = useState('')

  const fetchTeacherCoursesFN = async () => {
    const teacherCourseStudents = await fetchTeacherCourse(
      session?.backendTokens.accessToken!,
      params.teacherCourseId as string
    )
    console.log({ teacherCourseStudents })
    setTeacherCourse(teacherCourseStudents)
  }

  const fetchNotesFn = async (studentId: string, teacherCourseId: string) => {
    const studentNote: INote = await fetchStudentNote(
      session?.backendTokens.accessToken!,
      { teacherCourseId, studentId }
    )
    setNotes(studentNote.units)
    setFinalNote(studentNote.finalNote)
    setNoteId(studentNote._id)
  }
  useEffect(() => {
    if (!session) return
    fetchTeacherCoursesFN()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    const weight = [0.33, 0.33, 0.34]
    setFinalNote(
      Number(
        notes?.reduce((a, c, index) => a + weight[index] * c.note, 0).toFixed(2)
      )
    )
  }, [notes])

  const fetchUpdateNotesFN = async () => {
    const updateNotes = await fetchEditNotes(
      session?.backendTokens.accessToken!,
      notes!.map((note) => {
        return {
          unit: note.unit,
          note: note.note,
        }
      }),
      noteId
    )
    setNotes(updateNotes.units)
  }

  const handleFetchUpdateNotes = async () => {
    toast.promise(fetchUpdateNotesFN(), {
      loading: 'Cargando...',
      success: <b>Cambios guardados.</b>,
      error: (error) => <b>{error.message}</b>,
    })
  }

  if (!session) return <></>

  return (
    teacherCourse && (
      <div className="flex flex-col gap-3">
        <div className="text-xl flex flex-colr gap-3">
          <BtnBack route="/teacher/courses"></BtnBack>

          <div>
            <strong>Curso: </strong> {teacherCourse?.course.name}
          </div>
          <div>
            <strong>Año: </strong> {teacherCourse?.schoolYear.year}
          </div>
          <div>
            <strong>Grado: </strong>
            {teacherCourse?.degree.grade}
          </div>
          <div>
            <strong>Nivel: </strong>
            {teacherCourse!.degree!.level!.charAt(0).toUpperCase() +
              teacherCourse?.degree.level.slice(1)}
          </div>
        </div>
        <div>
          <div className="text-lg">
            <strong>Estudiantes:</strong>
          </div>
          <Card className="cursor-pointer hover:opacity-70">
            <CardBody className="flex flex-col justify-between">
              {teacherCourse && (
                <Accordion>
                  {teacherCourse!.students!.map(
                    (student: IStudentTeacherCourse, index: number) => {
                      return (
                        <AccordionItem
                          key={index}
                          aria-label="Accordion 1"
                          title={
                            <div className="flex flex-row gap-3 items-center">
                              <Avatar src={student.user.avatar}></Avatar>
                              <div className="text-lg font-medium">
                                {student.user.firstName} {student.user.lastName}
                              </div>
                            </div>
                          }
                          indicator={({ isOpen }) =>
                            isOpen ? (
                              <div>x</div>
                            ) : (
                              <div className="font-semibold">Ver notas</div>
                            )
                          }
                          onPress={() => {
                            fetchNotesFn(student._id, teacherCourse._id)
                          }}
                        >
                          <>
                            {notes ? (
                              <div className="mx-10">
                                <div className="flex flex-col gap-2">
                                  {notes?.map((unit) => {
                                    return (
                                      <div
                                        key={unit._id}
                                        className="flex justify-between text-xl"
                                      >
                                        <div className="flex flex-row items-center">
                                          <strong className="font-semibold">
                                            Unidad {unit.unit}
                                          </strong>
                                        </div>
                                        <div className="flex flex-row items-center">
                                          <strong className="font-semibold pr-2">
                                            Nota:
                                          </strong>
                                          <Input
                                            type="number"
                                            name={unit.unit.toString()}
                                            value={unit.note.toString()}
                                            onChange={(e) => {
                                              const newData = notes.map((n) => {
                                                if (
                                                  n.unit ===
                                                  Number(e.target.name)
                                                ) {
                                                  return {
                                                    ...n,
                                                    note: Number(
                                                      e.target.value
                                                    ),
                                                  }
                                                }
                                                return n
                                              })
                                              setNotes(newData)
                                            }}
                                          ></Input>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                                <div className="pt-5 text-xl justify-between items-center flex gap-5">
                                  <strong className="font-semibold">
                                    Nota final: {finalNote} -{' '}
                                    {finalNote <= 20 && finalNote >= 18
                                      ? 'AD (Excelente)'
                                      : finalNote < 18 && finalNote >= 14
                                      ? 'A (Bueno)'
                                      : finalNote < 13 && finalNote >= 11
                                      ? 'B (Regular)'
                                      : 'C (Deficiente)'}
                                  </strong>
                                  <Button
                                    color="primary"
                                    onClick={handleFetchUpdateNotes}
                                  >
                                    Guardar
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center">
                                <Spinner />
                              </div>
                            )}
                          </>
                        </AccordionItem>
                      )
                    }
                  )}
                </Accordion>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    )
  )
}

export default TeacherCoursesStudents

import { IStudentTeacherCourse, ITeacherCourse } from './course'
import { IStudent, IStudentP } from './user'

export interface INote {
  _id: string
  student: IStudent
  teacherCourse: IStudentTeacherCourse
  units: IUnit[]
  finalNote: number
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface IUnit {
  unit: number
  note: number
  unitWeight: number
  _id: string
}

export interface ISimpleUnit {
  unit: number
  note: number
}

export interface IStudentNotesFilter {
  teacherCourseId: string
  studentId: string
}

export interface INoteReport {
  student: string
  notes: Note[]
}

export interface Note {
  course: string
  units: Unit[]
  finalNote: number,
  finalLetter: string
}

export interface Unit {
  unit: number
  note: number
  _id: string
}

import { IStudentTeacherCourse } from './course'
import { IStudent } from './user'

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

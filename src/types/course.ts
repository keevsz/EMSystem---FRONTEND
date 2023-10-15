import { ITeacher, IUser } from './user'

export interface Course {
  _id?: string
  name: string
  description: string
  isActive?: boolean
  code?: string
  slug?: string
}

export interface ITeacherCourse {
  _id: string
  degree: IDegree
  schoolYear: ISchoolYear
  course: Course
  teacher: ITeacher
  students?: IStudentTeacherCourse[]
}

export interface IStudentTeacherCourse {
  _id: string
  dni: string
  birthdate: Date
  address: string
  gender: string
  user: IUser
}

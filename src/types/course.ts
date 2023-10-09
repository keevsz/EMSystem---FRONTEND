import { ITeacher } from "./user"

export interface Course {
  _id?: string
  name: string
  description: string
  isActive?: boolean
  code?: string
  slug?: string
}

export interface ITeacherCourse{
  _id: string,
  degree: IDegree,
  schoolYear: ISchoolYear,
  course: Course,
  teacher: ITeacher,
  students?: string[]
}
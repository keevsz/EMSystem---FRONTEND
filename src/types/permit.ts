import { IParent, IStudentP, ITeacher } from './user'

export interface IPermit {
  _id?: string
  teacher: ITeacher
  student: IStudentP
  parent: IParent
  description: string
  status: string
  approvedStatus: string
  createdAt: Date
  adittionalNotes?: string
}

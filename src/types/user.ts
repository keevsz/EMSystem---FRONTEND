export interface IUsersCount {
  admins: number
  parents: number
  students: number
  teachers: number
}

export interface IUser {
  _id: string
  username: string
  firstName: string
  lastName: string
  avatar: string
  isActive: string
  role: string
  password?: string
}

export interface ITeacher extends Partial<IUser> {
  email: string
  phoneNumber: string
  birthdate: string
  gender: string
  user?: IUser
}

export interface IStudent extends Partial<IUser> {
  dni: string
  birthdate: string
  address: string
  gender: string
}

export interface IStudentP {
  dni: string
  birthdate: string
  address: string
  gender: string
  user: IUser
}
export interface IStudentAndUser {
  dni: string
  birthdate: string
  address: string
  gender: string
  students?: IStudentP[]
}

export interface IParent extends Partial<IUser> {
  email: string
  dni: string
  phoneNumber: string
  relation: string
  communicationPrferences?: string[]
  students?: string[]
  user?: IUser
}

export interface IUserDataFromExteralAPI {
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  tipoDocumento: string
  numeroDocumento: string
  digitoVerificador: string
}

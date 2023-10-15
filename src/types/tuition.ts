export interface ITuition {
  parentName: string
  parentLastname: string
  parentDni: string
  parentEmail: string
  parentPhoneNumber: string
  studentName: string
  studentLastname: string
  studentDni: string
  studentBirthdate: string
  studentAddress: string
  studentGender: string
  schoolYear: {
    _id: string
    year: number
  }
  degree: {
    _id: string
    grade: number
    level: string
  }
}

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

export interface ITuitionGet {
  _id: string
  student: Student
  parent: Parent
  degree: IDegree
  schoolYear: ISchoolYear
  status: string
  cost: number
  paymentType: string
  createdAt: Date
  updatedAt: Date
}

export interface Degree {
  _id:   string;
  level: string;
  grade: number;
  __v:   number;
}

export interface Parent {
  _id:                     string;
  email:                   string;
  dni:                     string;
  phoneNumber:             string;
  communicationPrferences: any[];
  user:                    User;
  students:                any[];
  __v:                     number;
}

export interface User {
  _id:       string;
  username:  string;
  firstName: string;
  lastName:  string;
  avatar:    string;
  isActive:  boolean;
  role:      string;
  __v:       number;
}

export interface SchoolYear {
  _id:  string;
  year: string;
  __v:  number;
}

export interface Student {
  _id:       string;
  dni:       string;
  birthdate: Date;
  address:   string;
  gender:    string;
  user:      User;
  __v:       number;
}
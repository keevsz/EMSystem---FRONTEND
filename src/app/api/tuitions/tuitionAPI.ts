import { ITuition } from '@/types/tuition'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL


export interface ITuitionRequest {
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
  schoolYear: string
  degree: string
}

export async function fetchCreateTuitionAdmin(
  accessToken: string,
  tuitionData: ITuitionRequest
) {
  const res = await fetch(`${BACKEND_URL}/tuitions/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(tuitionData),
  })
  const data = await res.json()
  if (
    data.statusCode === 403 ||
    data.statusCode === 401 ||
    data.statusCode === 400 ||
    data.statusCode === 500
  ) {
    throw new Error(data.message)
  }
  console.log(data)
  return data
}

export async function fetchTuition(id: string) {
  const res = await fetch(`${BACKEND_URL}/tuitions/${id}`, {
    method: 'GET',
    // headers: {
    //   authorization: `Bearer ${accessToken}`,
    // },
  })
  const data = await res.json()
  if (
    data.statusCode === 403 ||
    data.statusCode === 401 ||
    data.statusCode === 400
  ) {
    throw new Error(data.message)
  }
  return data
}

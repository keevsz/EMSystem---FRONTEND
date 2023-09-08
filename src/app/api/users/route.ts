import { ITeacher } from '@/types/user'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:3001'
export async function fetchAllUsers(accessToken: string) {
  const res = await fetch(`${process.env.API_URL}/users`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await res.json()
  if (data.statusCode === 403) {
    throw new Error(data.message)
  }
  return data
}

export async function fetchUsersCount(accessToken: string) {
  const res = await fetch(`${process.env.API_URL}/users/count`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await res.json()
  if (data.statusCode === 403) {
    throw new Error(data.message)
  }
  return data
}

export async function fetchUsersDetails(accessToken: string, id: string) {
  const res = await fetch(`${process.env.API_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await res.json()
  if (data.statusCode === 403) {
    throw new Error(data.message)
  }
  return data
}

export async function fetchDeleteUser(accessToken: string, id: string) {
  const res = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await res.json()
  if (data.statusCode === 403) {
    throw new Error(data.message)
  }
  return data
}

export async function fetchCreateTeacher(
  accessToken: string,
  teacherData: ITeacher
) {
  const res = await fetch(`${BACKEND_URL}/teachers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(teacherData),
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

export async function fetchEditUser(
  accessToken: string,
  teacherData: ITeacher
) {
  const res = await fetch(`${BACKEND_URL}/teachers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(teacherData),
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

export const fetchUploadImg = async (files: any) => {
  const data = new FormData()
  data.append('file', files)
  data.append('upload_preset', 'emsystem')
  data.append('cloud_name', 'dalp4xrqs')

  const responseData = axios.post(
    'https://api.cloudinary.com/v1_1/dalp4xrqs/image/upload',
    data
  )
  return responseData
}

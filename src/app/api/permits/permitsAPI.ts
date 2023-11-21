import { IPermit } from '@/types/permit'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

export interface ITuitionRequest {
  teacher: string
  student: string
  description: string
}

export async function fetchCreatePermit(
  accessToken: string,
  tuitionData: ITuitionRequest
) {
  const res = await fetch(`${BACKEND_URL}/permits`, {
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
  return data
}

export async function fetchPermits(accessToken: string) {
  const res = await fetch(`${BACKEND_URL}/permits`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
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

export async function fetchUpdatePermit(
  accessToken: string,
  permit: Partial<IPermit>,
  permitId: string
) {
  const res = await fetch(`${BACKEND_URL}/permits/${permitId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(permit),
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

export async function fetchReportPermit() {
  const res = await fetch(`${BACKEND_URL}/permits/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: '2015-01-01',
      to: '2025-01-01',
    }),
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

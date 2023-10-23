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

// export async function fetchPermits(id: string) {
//   const res = await fetch(`${BACKEND_URL}/tuitions/${id}`, {
//     method: 'GET',
//     // headers: {
//     //   authorization: `Bearer ${accessToken}`,
//     // },
//   })
//   const data = await res.json()
//   if (
//     data.statusCode === 403 ||
//     data.statusCode === 401 ||
//     data.statusCode === 400
//   ) {
//     throw new Error(data.message)
//   }
//   return data
// }

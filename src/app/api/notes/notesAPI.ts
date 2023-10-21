import { ISimpleUnit, IStudentNotesFilter } from '@/types/note'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchStudentNote(
  accessToken: string,
  filter: IStudentNotesFilter
) {
  const res = await fetch(`${BACKEND_URL}/notes/course-student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(filter),
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

export async function fetchEditNotes(
  accessToken: string,
  notes: ISimpleUnit[],
  notesId: String
) {
  const res = await fetch(`${BACKEND_URL}/notes/${notesId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      units: notes,
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

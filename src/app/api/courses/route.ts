// const BACKEND_URL =
//   'http://localhost:3001' ||
//   process.env.API_URL ||
//   'https://emsystem.onrender.com'
const BACKEND_URL = process.env.API_URL || 'https://emsystem2.onrender.com'

export async function fetchSchoolYears(accessToken: string) {
  const res = await fetch(`${BACKEND_URL}/school-year`, {
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

export async function fetchDegrees(accessToken: string) {
  const res = await fetch(`${BACKEND_URL}/degree`, {
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

export async function fetchCourses(accessToken: string) {
  const res = await fetch(`${BACKEND_URL}/courses`, {
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

export async function fetchCreateCourse(
  accessToken: string,
  courseData: Course
) {
  const res = await fetch(`${BACKEND_URL}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(courseData),
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

export async function fetchEditCourse(
  accessToken: string,
  courseData: Course,
  courseId: String
) {
  console.log(courseId)
  const res = await fetch(`${BACKEND_URL}/courses/${courseId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: courseData.name,
      description: courseData.description,
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

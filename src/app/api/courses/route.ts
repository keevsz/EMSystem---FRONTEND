import { Course, ITeacherCourse } from '@/types/course'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL

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

export async function fetchTeacherCourses(
  accessToken: string,
  filterData: Partial<ITeacherCourse> | {
    degree: string,
    schoolYear: string,
  }
) {
  const res = await fetch(`${BACKEND_URL}/teacher-course/filtered`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(filterData),
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

export async function fetchCreateTeacherCourse(
  accessToken: string,
  teacherCourseData: any
) {
  const res = await fetch(`${BACKEND_URL}/teacher-course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(teacherCourseData),
  })
  const data = await res.json()
  if (
    data.statusCode === 403 ||
    data.statusCode === 401 ||
    data.statusCode === 400
  ) {
    throw new Error(data.message)
  }
  if (data.statusCode === 500) {
    throw new Error('Seleccione el curso y el profesor')
  }
  return data
}


export async function fetchTeacherCourse(
  accessToken: string,
  teacherCourseId: string
) {
  const res = await fetch(`${BACKEND_URL}/teacher-course/${teacherCourseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
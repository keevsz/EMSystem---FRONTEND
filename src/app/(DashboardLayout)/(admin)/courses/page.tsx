import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {
  fetchCourses,
  fetchDegrees,
  fetchSchoolYears,
} from '@/app/api/courses/route'
import { fetchAllTeachers } from '@/app/api/users/route'
import SchoolYears from '@/components/admin/courses/SchoolYears'
import CoursesList from '@/components/admin/courses/table/CoursesList'
import { getServerSession } from 'next-auth'
import React from 'react'

async function CoursesPage() {
  const data = await getServerSession(authOptions)
  const schoolYears = await fetchSchoolYears(data?.backendTokens.accessToken!)
  const degrees = await fetchDegrees(data?.backendTokens.accessToken!)
  const courses = await fetchCourses(data?.backendTokens.accessToken!)
  const teachers = await fetchAllTeachers(data?.backendTokens.accessToken!)
  return (
    <div className="flex flex-col gap-6">
      <CoursesList courses={courses}></CoursesList>
      <SchoolYears teachers={teachers} courses={courses} schoolYears={schoolYears} degrees={degrees}></SchoolYears>
    </div>
  )
}

export default CoursesPage

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {
  fetchCourses,
  fetchDegrees,
  fetchSchoolYears,
} from '@/app/api/courses/route'
import { fetchAllTeachers } from '@/app/api/users/route'
import SearchReport from '@/components/reports/notes/SearchReport'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function NotesReportPage() {
  const data = await getServerSession(authOptions)

  const schoolYears = await fetchSchoolYears(data?.backendTokens.accessToken!)
  const degrees = await fetchDegrees(data?.backendTokens.accessToken!)
  const courses = await fetchCourses(data?.backendTokens.accessToken!)
  const teachers = await fetchAllTeachers(data?.backendTokens.accessToken!)
  return (
    <div className='py-3'>
      <SearchReport
        teachers={teachers}
        courses={courses}
        schoolYears={schoolYears}
        degrees={degrees}
      />
    </div>
  )
}

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchDegrees, fetchSchoolYears } from '@/app/api/courses/route'
import TuitionForm from '@/components/admin/tuitions/TuitionForm'
import { getServerSession } from 'next-auth'
import React from 'react'

async function TuitionsPage() {
  const data = await getServerSession(authOptions)

  const schoolYears = await fetchSchoolYears(data?.backendTokens.accessToken!)
  const degrees = await fetchDegrees(data?.backendTokens.accessToken!)
  return (
    <div>
      <h3 className="text-2xl">Matrículas</h3>
      <TuitionForm schoolYears={schoolYears} degrees={degrees} />
    </div>
  )
}

export default TuitionsPage

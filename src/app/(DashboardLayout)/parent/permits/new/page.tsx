import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchAllTeachers, fetchParentDetails } from '@/app/api/users/route'
import FormCreatePermit from '@/components/parent/permits/Form'
import { IStudentP, ITeacher } from '@/types/user'
import { getServerSession } from 'next-auth'
import React from 'react'

async function CreatePermitPage() {
  const data = await getServerSession(authOptions)
  const studentsC = await fetchParentDetails(
    data?.backendTokens.accessToken!,
    data?.user._id!
  )
  const teachersC = await fetchAllTeachers(data?.backendTokens.accessToken!)

  return (
    <div>
      <FormCreatePermit
        studentsC={studentsC.students as IStudentP[]}
        teachersC={teachersC as ITeacher[]}
      />
    </div>
  )
}

export default CreatePermitPage

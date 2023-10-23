import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchAllTeachers, fetchParentDetails } from '@/app/api/users/route'
import FormCreatePermit from '@/components/parent/permits/Form'
import HeaderParentPermits from '@/components/parent/permits/Header'
import { IStudentP, ITeacher } from '@/types/user'
import { getServerSession } from 'next-auth'

async function ParentPermitsPage() {
  const data = await getServerSession(authOptions)
  const studentsC = await fetchParentDetails(
    data?.backendTokens.accessToken!,
    data?.user._id!
  )

  const teachersC = await fetchAllTeachers(data?.backendTokens.accessToken!)

  return (
    <div>
      <HeaderParentPermits />
      <FormCreatePermit
        studentsC={studentsC.students as IStudentP[]}
        teachersC={teachersC as ITeacher[]}
      />
    </div>
  )
}

export default ParentPermitsPage

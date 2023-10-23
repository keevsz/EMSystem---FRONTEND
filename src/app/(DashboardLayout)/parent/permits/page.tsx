import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchPermits } from '@/app/api/permits/permitsAPI'
import { fetchAllTeachers, fetchParentDetails } from '@/app/api/users/route'
import FormCreatePermit from '@/components/parent/permits/Form'
import HeaderParentPermits from '@/components/parent/permits/Header'
import PermitList from '@/components/teacher/permits/PermitList'
import { IPermit } from '@/types/permit'
import { IStudentP, ITeacher } from '@/types/user'
import { getServerSession } from 'next-auth'

async function ParentPermitsPage() {
  const data = await getServerSession(authOptions)
  const permits: IPermit[] = await fetchPermits(
    data?.backendTokens.accessToken!
  )

  return (
    <div className="flex flex-col gap-4">
      <HeaderParentPermits />
      <div>
        <div className="text-xl font-bold">Lista de permisos</div>
        <PermitList permits={permits} />
      </div>
    </div>
  )
}

export default ParentPermitsPage

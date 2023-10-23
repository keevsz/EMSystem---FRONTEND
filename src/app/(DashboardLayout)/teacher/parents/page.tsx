import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchPermits } from '@/app/api/permits/permitsAPI'
import PermitList from '@/components/teacher/permits/PermitList'
import { IPermit } from '@/types/permit'
import { getServerSession } from 'next-auth'

async function TeacherParentsPage() {
  const data = await getServerSession(authOptions)
  const permits: IPermit[] = await fetchPermits(
    data?.backendTokens.accessToken!
  )
  return (
    <div>
      <div className="text-xl font-bold">Permisos de ausencia</div>
      <PermitList permits={permits} />
    </div>
  )
}

export default TeacherParentsPage

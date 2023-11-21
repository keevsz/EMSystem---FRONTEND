import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchStudentDetails } from '@/app/api/users/route'
import CertificateC from '@/components/certificates/CertificateC'
import { IStudent } from '@/types/user'
import { getServerSession } from 'next-auth'

export default async function page({ params }: { params: { userId: string } }) {
  const data = await getServerSession(authOptions)
  const userId = params.userId
  const studentData: IStudent = await fetchStudentDetails(
    data?.backendTokens.accessToken!,
    userId
  )
  return <CertificateC student={studentData}/>
}

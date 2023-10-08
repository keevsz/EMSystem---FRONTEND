import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {
  fetchParentDetails,
  fetchStudentDetails,
  fetchTeacherDetails,
  fetchUsersDetails,
} from '@/app/api/users/route'
import DividerC from '@/components/common/DividerC'
import FormAdmin from '@/components/admin/users/profile/Form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function ProfilePage() {
  const data = await getServerSession(authOptions)
  let user = null
  if (data?.user?.role === 'admin') {
    user = await fetchUsersDetails(
      data?.backendTokens.accessToken!,
      data?.user._id!
    )
  } else if (data?.user?.role === 'teacher') {
    user = await fetchTeacherDetails(
      data?.backendTokens.accessToken!,
      data?.user._id!
    )
  } else if (data?.user.role === 'student') {
    user = await fetchStudentDetails(
      data?.backendTokens.accessToken!,
      data.user._id
    )
  } else if (data?.user.role === 'parent') {
    user = await fetchParentDetails(
      data?.backendTokens.accessToken!,
      data.user._id
    )
  }

  if (user) {
    return (
      <div className="container flex flex-col">
        <h3 className="text-xl font-semibold">Mi perfil</h3>
        <DividerC></DividerC>
        <FormAdmin user={user}></FormAdmin>
      </div>
    )
  } else {
    redirect('/')
  }
}

export default ProfilePage

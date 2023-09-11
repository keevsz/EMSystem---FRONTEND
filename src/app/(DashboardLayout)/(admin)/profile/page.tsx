import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchTeacherDetails, fetchUsersDetails } from '@/app/api/users/route'
import DividerC from '@/components/common/DividerC'
import FormAdmin from '@/components/admin/users/profile/Form'
import { getServerSession } from 'next-auth'

async function ProfilePage() {
  const data = await getServerSession(authOptions)
  let user = null
  if (data?.user.role === 'admin') {
    user = await fetchUsersDetails(
      data?.backendTokens.accessToken!,
      data?.user._id!
    )
  } else if (data?.user.role === 'teacher') {
    user = await fetchTeacherDetails(
      data?.backendTokens.accessToken!,
      data?.user._id!
    )
  }

  return (
    <div className="container flex flex-col">
      <h3 className='text-xl font-semibold'>Mi perfil</h3>
      <DividerC></DividerC>
      <FormAdmin user={user}></FormAdmin>
    </div>
  )
}

export default ProfilePage

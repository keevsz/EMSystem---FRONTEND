import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchUsersDetails } from '@/app/api/users/route'
import Form from '@/components/admin/teachers/edit/Form'
import BtnBack from '@/components/admin/users/BtnBack'
import { IUser } from '@/types/user'
import { getServerSession } from 'next-auth'

interface Props {
  params: { userId: string }
}

async function UserEditPage({ params }: Props) {
  const data = await getServerSession(authOptions)
  const user: IUser = await fetchUsersDetails(
    data?.backendTokens.accessToken!,
    params.userId
  )
  return (
    <div>
      <BtnBack route={'/users/list'} />
      <Form user={user} />
    </div>
  )
}

export default UserEditPage

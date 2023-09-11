import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchUsersDetails } from '@/app/api/users/route'
import BtnBack from '@/components/common/BtnBack'
import Form from '@/components/admin/users/details/Form'
import { IUser } from '@/types/user'
import { Input } from '@nextui-org/react'
import { getServerSession } from 'next-auth'

interface Props {
  params: { userId: string }
}

async function UserDetailsPage({ params }: Props) {
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

export default UserDetailsPage

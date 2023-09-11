import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchUsersDetails } from '@/app/api/users/route'
import Form from '@/components/admin/teachers/edit/Form'
import BtnBack from '@/components/common/BtnBack'
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
    <div className="flex gap-5">
      <div className='w-auto'>
        <BtnBack route={'/users'} />
      </div>
      <div className='w-full'>
        <Form user={user} />
      </div>
    </div>
  )
}

export default UserEditPage

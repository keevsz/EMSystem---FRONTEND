import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchAllUsers } from '@/app/api/users/route'
import UsersMain from '@/components/admin/users/main/UsersMain'
import UsersList from '@/components/admin/users/table/UsersList'
import { getServerSession } from 'next-auth'


async function UserList() {
  const data = await getServerSession(authOptions)
  const users = await fetchAllUsers(data?.backendTokens.accessToken!)

  return (
    <>
      <UsersMain />
      <UsersList users={users} />
    </>
  )
}

export default UserList

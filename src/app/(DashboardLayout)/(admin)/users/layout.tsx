import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchUsersCount } from '@/app/api/users/route'
import UsersMain from '@/components/admin/users/main/UsersMain'
import { getServerSession } from 'next-auth'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getServerSession(authOptions)
  const usersCount = await fetchUsersCount(data?.backendTokens.accessToken!)

  return (
    <div className="flex flex-col gap-12 min-h-full">
      <h1 className="text-2xl font-bold">Usuarios</h1>
      <UsersMain usersCount={usersCount} />
      {children}
    </div>
  )
}

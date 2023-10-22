import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getServerSession(authOptions)

  return (
    <div className="flex flex-col gap-12 min-h-full">
      <div className="text-2xl font-bold">
        {data?.user.role === 'admin' ? 'Cursos' : 'Mis cursos'}
      </div>
      {children}
    </div>
  )
}

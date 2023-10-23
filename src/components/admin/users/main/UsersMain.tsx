'use client'

import { fetchUsersCount } from '@/app/api/users/route'
import { IUsersCount } from '@/types/user'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

function UsersMain() {
  const [usersCount, setUsersCount] = useState<IUsersCount>()
  const { data } = useSession()
  const fetchUserCount = async () => {
    const getUsersCount = await fetchUsersCount(
      data?.backendTokens.accessToken!
    )
    setUsersCount(getUsersCount)
  }
  useEffect(() => {
    if (!data) return

    fetchUserCount()
  }, [data])

  if (!usersCount)
    return (
      <div className="flex justify-center items-center min-h-full">
        <Spinner />
      </div>
    )

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      <Card className="w-full">
        <CardBody>
          <div className="flex items-center justify-start gap-4">
            <div className="border-1 rounded-full border-solid bg-violet-700 w-6 h-6"></div>
            <div className="">
              <h2 className="text-lg">Administradores</h2>
              <h1 className="text-2xl font-bold">{usersCount.admins}</h1>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="w-full">
        <CardBody>
          <div className="flex items-center justify-start gap-4">
            <div className="border-1 rounded-full border-solid bg-green-500 w-6 h-6"></div>
            <div className="">
              <h2 className="text-lg">Profesores</h2>
              <h1 className="text-2xl font-bold">{usersCount.teachers}</h1>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="w-full">
        <CardBody>
          <div className="flex items-center justify-start gap-4">
            <div className="border-1 rounded-full border-solid bg-orange-500 w-6 h-6"></div>
            <div className="">
              <h2 className="text-lg">Alumnos</h2>
              <h1 className="text-2xl font-bold">{usersCount.students}</h1>
            </div>
          </div>
        </CardBody>
      </Card>
      <Card className="w-full">
        <CardBody>
          <div className="flex items-center justify-start gap-4">
            <div className="border-1 rounded-full border-solid bg-sky-500 w-6 h-6"></div>
            <div className="">
              <h2 className="text-lg">Padres</h2>
              <h1 className="text-2xl font-bold">{usersCount.parents}</h1>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default UsersMain

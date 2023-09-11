import Link from 'next/link'
import React from 'react'
import Logout from '../logout/Logout'
import { getServerSession, AuthOptions } from 'next-auth'
import AdminListOptions from './AdminListOptions'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

async function Sidebar() {
  const session = await getServerSession(authOptions)
  const role = session?.user.role

  const data: any = {
    admin: <AdminListOptions />,
  }
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-slate-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-slate-100 dark:bg-gray-800">
        <div className="flex flex-col space-y-2 font-medium h-full justify-between">
          {data[role!]}
          <Logout />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

import React, { useState } from 'react'
import Logout from '../logout/Logout'
import { getServerSession, AuthOptions } from 'next-auth'
import AdminListOptions from './AdminListOptions'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import TeacherListOptions from './TeacherListOptions'
import StudentListOptions from './StudentListOptions'
import ParentListOptions from './ParentListOptions'
import ChatBotBox from '../chatbot/ui'
import Link from 'next/link'
import Image from 'next/image'
import SchoolPng from '../../../public/school.png'

async function Sidebar() {
  const session = await getServerSession(authOptions)
  const role = session?.user.role

  const data: any = {
    admin: <AdminListOptions mobile={false} />,
    teacher: <TeacherListOptions mobile={false}/>,
    student: <StudentListOptions mobile={false}/>,
    parent: <ParentListOptions mobile={false}/>,
  }
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen z-50 transition-transform -translate-x-full bg-slate-100 border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="flex items-center justify-start p-2">
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
        <Link href="/" className="flex ml-2">
          <div className="px-2">
            <Image src={SchoolPng} width={40} alt="School icon"></Image>
          </div>
          <span className="pt-2 self-center text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white">
            EMSystem
          </span>
        </Link>
      </div>
      <div className="h-full px-3 pb-4 overflow-y-auto bg-slate-100 dark:bg-gray-800">
        <div className="flex flex-col space-y-2 font-medium h-full justify-between">
          {data[role!]}
          <div style={{ paddingBottom: '3rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            {role === 'admin' && <ChatBotBox />}
            <Logout/>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

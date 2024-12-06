'use client'

import React, { useEffect, useState } from 'react'
import Logout from '../logout/Logout'
import { getServerSession, AuthOptions } from 'next-auth'
import AdminListOptions from './AdminListOptions'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import TeacherListOptions from './TeacherListOptions'
import StudentListOptions from './StudentListOptions'
import ParentListOptions from './ParentListOptions'
import ChatBotBox from '../chatbot/ui'
import { getSession } from 'next-auth/react'

function BottomBar() {
  const [role, setRole] = useState<string>()
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getSessionFn()
  }, [])

  const getSessionFn = async () => {
    const session = await getSession()
    setRole(session?.user.role)
    setLoading(false)
    return session
  }

  const handleOpenClose = () => {
    setOpen(!open)
  }

  const data: any = {
    admin: <AdminListOptions mobile={true} />,
    teacher: <TeacherListOptions mobile={true} />,
    student: <StudentListOptions mobile={true} />,
    parent: <ParentListOptions mobile={true} />,
  }

  if (loading) return <></>

  return (
    <aside
      id="logo-sidebar"
      className="fixed bottom-0 left-0 w-full z-50"
      aria-label="Sidebar"
    >
      <div
        className={`h-full px-3 pb-1 overflow-y-auto bg-slate-100 dark:bg-gray-800 pt-2 ${
          open ? 'block' : 'hidden'
        }`}
      >
        <div className="flex flex-col space-y-2 font-medium h-full justify-between">
          <div className="grid grid-cols-2">{data[role!]}</div>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {role === 'admin' && <ChatBotBox />}
          </div>
          <div className="flex items-center justify-between p-2">
          <Logout />

            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="bg-blue-500 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={handleOpenClose}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="black"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {!open && (
        <div className="flex items-center justify-end pb-3 pr-5">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="bg-blue-500 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={handleOpenClose}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="black"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
        </div>
      )}
    </aside>
  )
}

export default BottomBar

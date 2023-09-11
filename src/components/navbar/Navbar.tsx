'use client'
import Image from 'next/image'
import Link from 'next/link'
import SchoolPng from '../../../public/school.png'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <nav className="fixed top-0 z-50 w-full bg-slate-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
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
            <Link href="/" className="flex ml-2 md:mr-24">
              <div className="px-2">
                <Image src={SchoolPng} width={40} alt="School icon"></Image>
              </div>
              <span className="pt-2 self-center text-xl font-bold sm:text-2xl whitespace-nowrap dark:text-white">
                EDSystem
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div>
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex justify-center items-center gap-4 cursor-pointer">
                      <span>
                        {session && (
                          <div>
                            <span className="font-semibold">{`[${session?.user.role}]`}</span>
                          </div>
                        )}
                      </span>
                      <Avatar src={session?.user.avatar} />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      key="profile"
                      onClick={() => {
                        router.push('/profile')
                      }}
                    >
                      Mi perfil
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onClick={() => {
                        signOut()
                      }}
                    >
                      Salir
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

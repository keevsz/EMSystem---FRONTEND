'use client'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()

  const getRoleName = (role: string) => {
    switch (role) {
      case 'teacher':
        return 'Profesor'
      case 'parent':
        return 'Padre'
      case 'student':
        return 'Estudiante'
      default:
        return 'Administrador'
    }
  }



  return (
    <nav className="fixed top-0 z-40 w-full bg-slate-100 dark:bg-gray-800 dark:border-gray-700 flex justify-end">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div>
                <Dropdown>
                  <DropdownTrigger>
                    <div className="flex justify-center items-center gap-4 cursor-pointer">
                      <span>
                        {session && (
                          <div>
                            <span className="font-semibold">{`[${getRoleName(session?.user.role)}]`}</span>
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

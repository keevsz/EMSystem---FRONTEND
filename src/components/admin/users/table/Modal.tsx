import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  ModalBody,
} from '@nextui-org/react'
import { DeleteIcon } from './DeleteIcon'
import { IUser } from '@/types/user'
import { useSession } from 'next-auth/react'
import { fetchDeleteUser } from '@/app/api/users/route'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Props {
  user: IUser
}
export default function ModalC({ user }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data } = useSession()

  const router = useRouter()

  const fetchDeleteUserFn = async () => {
    await fetchDeleteUser(
      data?.backendTokens.accessToken!,
      user._id
    )
  }

  const deleteUser = async () => {
    toast.promise(fetchDeleteUserFn(), {
      loading: 'Borrando...',
      success: <b>Usuario eliminado.</b>,
      error: <b>El usuario no pudo ser eliminado.</b>,
    })
    router.refresh()
  }

  return (
    <>
      <a onClick={onOpen}>
        <DeleteIcon />
      </a>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ¿Estás seguro que deseas eliminar este usuario?
              </ModalHeader>

              <ModalBody>
                {user.firstName} {user.lastName}
              </ModalBody>

              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    onClose()
                    deleteUser()
                  }}
                >
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

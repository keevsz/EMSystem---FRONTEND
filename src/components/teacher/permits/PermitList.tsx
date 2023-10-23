'use client'
import { fetchUpdatePermit } from '@/app/api/permits/permitsAPI'
import { IPermit } from '@/types/permit'
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Textarea,
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  permits: IPermit[]
}
function PermitList({ permits }: Props) {
  const { data: session, update } = useSession()
  const [adittionalNotes, setAdittionalNotes] = useState('')
  const [permitsF, setPermitsF] = useState(permits)

  const fetchUpdatePermitFn = async (newStatus: string, id: string) => {
    const newPermit = await fetchUpdatePermit(
      session?.backendTokens.accessToken!,
      {
        approvedStatus: newStatus,
        adittionalNotes,
      },
      id
    )
    setPermitsF(
      permits.map((permit) => {
        return permit._id === id ? newPermit : permit
      })
    )
  }

  const updatePermit = async (newStatus: string, id: string) => {
    toast.promise(fetchUpdatePermitFn(newStatus, id), {
      loading: 'Cargando...',
      success: (
        <b>Permiso {newStatus === 'accepted' ? 'aceptado' : 'rechazado'}</b>
      ),
      error: (error) => <b>{error.message}</b>,
    })
  }

  if (permitsF.length === 0) {
    return (
      <div className="bg-gray-100 mt-2 h-20 rounded-lg flex justify-center items-center">
        Aún no se han registrado permisos
      </div>
    )
  }

  return (
    <div>
      <Accordion>
        {permitsF?.map((permit: IPermit, index: number) => {
          return (
            <AccordionItem
              key={index}
              aria-label="Accordion 1"
              title={
                <div className="flex flex-row gap-3 items-center rounded p-1 font-semibold">
                  Alumno: {permit.student.user.firstName}{' '}
                  {permit.student.user.lastName}
                </div>
              }
              onPress={async () => {
                if (session?.user.role === 'parent') return
                const newPermit = await fetchUpdatePermit(
                  session?.backendTokens.accessToken!,
                  {
                    status: 'seen',
                  },
                  permit._id!
                )
                setPermitsF(
                  permits.map((p) => {
                    return p._id === permit._id ? newPermit : p
                  })
                )
                update()
              }}
              indicator={({ isOpen }) =>
                isOpen ? (
                  <div>x</div>
                ) : (
                  <div
                    className={`font-semibold rounded p-2 ${
                      permit.status === 'sent' ? 'bg-blue-200' : ''
                    }`}
                  >
                    Ver
                  </div>
                )
              }
            >
              <div className="flex flex-col mx-10">
                <div
                  key={permit._id}
                  className="flex justify-between text-xl flex-col gap-2"
                >
                  <div>
                    Apoderado: {permit.parent.user?.firstName}{' '}
                    {permit.parent.user?.lastName}
                  </div>
                  <div>
                    Fecha: {permit.createdAt.toString().substring(0, 10)}
                  </div>
                  <div>
                    Motivo:
                    <Textarea isDisabled value={permit.description} />
                    Comentario de profesor:
                    <Input
                      isDisabled={
                        permit.adittionalNotes
                          ? true
                          : session?.user.role === 'parent'
                          ? true
                          : false
                      }
                      value={permit.adittionalNotes || adittionalNotes}
                      onValueChange={setAdittionalNotes}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      Estado:{' '}
                      {permit.approvedStatus === 'pending'
                        ? 'Pendiente'
                        : permit.approvedStatus === 'accepted'
                        ? 'Aceptado'
                        : 'Rechazado'}
                    </div>
                    {session?.user.role !== 'parent' ? (
                      <div className="flex gap-3">
                        <Button
                          color="success"
                          onClick={() => {
                            updatePermit('accepted', permit._id!)
                          }}
                        >
                          Aceptar
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => {
                            updatePermit('rejected', permit._id!)
                          }}
                        >
                          Rechazar
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default PermitList

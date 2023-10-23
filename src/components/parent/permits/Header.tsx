'use client'
import { Button, Divider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function HeaderParentPermits() {
  const router = useRouter()

  return (
    <div>
      <div className="flex justify-between pb-2">
        <div className="text-2xl font-bold">Permisos de ausencia</div>
        <div>
          <Button
            color="success"
            onClick={() => {
              router.push('/parent/permits/new')
            }}
          >
            Nuevo
          </Button>
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default HeaderParentPermits

'use client'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
interface Props {
  route: string
}
function BtnBack({ route }: Props) {
  const router = useRouter()
  return (
    <Button
      type="button"
      color="primary"
      onClick={() => {
        router.push(route)
      }}
    >
      Regresar
    </Button>
  )
}

export default BtnBack

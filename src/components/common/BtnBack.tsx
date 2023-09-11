'use client'
import { useRouter } from 'next/navigation'
import BackIcon from './BackIcon'
interface Props {
  route: string
}
function BtnBack({ route }: Props) {
  const router = useRouter()
  return (
    <span
      className="text-lg text-default-400 cursor-pointer active:opacity-50"
      onClick={() => {
        router.push(route)
      }}
    >
      <div className='w-8'>
        <BackIcon />
      </div>
    </span>
  )
}

export default BtnBack

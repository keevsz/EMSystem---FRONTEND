'use client'

import { useState } from 'react'
import { IUser } from '@/types/user'
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react'
import Image from 'next/image'
interface Props {
  user: IUser
}
function Form({ user }: Props) {
  const [selected, setSelected] = useState(user.isActive)
  return (
    <form className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <Image
          alt=""
          width={500}
          height={500}
          src={user.avatar}
          className="w-36 h-36 text-large rounded-sm"
        ></Image>
        <div>
          <div className="flex gap-3">
            <Button fullWidth>Editar</Button>
            <Button color="danger">Restablecer</Button>
          </div>
          <div>PNG o JPEG permitidos. Tamaño máximo de 800K.</div>
        </div>
        <div className="flex gap-3">
          <RadioGroup
            label="Estado"
            value={selected ? 'true' : 'false'}
            onValueChange={setSelected}
          >
            <Radio value="true">Activo</Radio>
            <Radio value="false">Inactivo</Radio>
          </RadioGroup>
        </div>
      </div>
      <div className="flex gap-3">
        <Input
          fullWidth
          type="text"
          label="Nombre de usuario"
          variant="bordered"
          defaultValue={user.username}
        />
        <Input
          fullWidth
          type="password"
          label="Password"
          variant="bordered"
          defaultValue={'***********************'}
        />
      </div>
      <div className="flex gap-3">
        <Input
          fullWidth
          type="text"
          label="Nombres"
          variant="bordered"
          defaultValue={user.firstName}
        />
        <Input
          fullWidth
          type="text"
          label="Apellidos"
          variant="bordered"
          defaultValue={user.lastName}
        />
      </div>
      <Button color='success' className='w-32 text-center'>Guardar cambios</Button>
    </form>
  )
}

export default Form

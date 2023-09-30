'use client'

import { Card, Divider } from '@nextui-org/react'

interface Props {
  data: any
}
function Levels({ data }: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className="text-xl">Nivel educativo</h2>
      <Divider />

      <span></span>
      <div className="flex text-2xl gap-5">
        {data.map((i: any, index: number) => {
          return (
            <Card className="p-10 cursor-pointer hover:opacity-70" key={index}>
              {i.level}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Levels

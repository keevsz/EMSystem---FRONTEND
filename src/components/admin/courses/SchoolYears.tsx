'use client'
import BtnBackComponent from '@/components/common/BtnBackComponent'
import { Card, CardBody } from '@nextui-org/react'
import { useState } from 'react'

interface Props {
  schoolYears: ISchoolYear[]
  degrees: IDegree[]
}

function SchoolYears({ schoolYears, degrees }: Props) {
  const [page, setPage] = useState(0)
  const [info, setInfo] = useState({})

  const yearsSchoolComponent = (
    <div className='flex flex-col gap-2'>
      <div className="text-xl font-bold">Años escolares</div>
      <div className="divide-x-4"></div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-4 gap-y-4"'>
        {schoolYears
          .sort((a, b) => b.year - a.year)
          .map((SchoolYear) => (
            <Card key={SchoolYear.year}>
              <CardBody
                onClick={() => {
                  setPage(1)
                }}
                className="text-center cursor-pointer hover:opacity-50"
              >
                {SchoolYear.year}
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  )

  const degreesComponent = (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div
          className="w-min"
          onClick={() => {
            setPage(0)
          }}
        >
          <BtnBackComponent />
        </div>
        <div className="text-xl font-bold">Grado</div>
      </div>
      <div>
        <div className="divide-x-4"></div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-4 gap-y-4"'>
          {degrees.map((degree) => (
            <Card key={degree._id}>
              <CardBody className="text-center cursor-pointer hover:opacity-50">
                {degree.grade}° {degree.level}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const pages = [yearsSchoolComponent, degreesComponent]

  return <>{pages[page]}</>
}

export default SchoolYears

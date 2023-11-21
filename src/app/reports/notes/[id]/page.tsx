'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

const InvoicePDF = dynamic(
  () => import('../../../../components/reports/notes/pdf'),
  {
    ssr: false,
  }
)

const View = () => {
  const searchParams = useSearchParams()

  const studentId = searchParams.get('studentId')
  const degreeId = searchParams.get('degreeId')
  const schoolYearId = searchParams.get('schoolYearId')

  const [client, setClient] = useState(false)
  useEffect(() => {
    setClient(true)
  }, [])
  return (
    <InvoicePDF
      studentId={studentId!}
      degreeId={degreeId!}
      schoolYearId={schoolYearId!}
    />
  )
}

export default View

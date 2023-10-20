'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { fetchTuition } from '@/app/api/tuitions/tuitionAPI'

const InvoicePDF = dynamic(
  () => import('../../../components/admin/tuitions/pdf'),
  {
    ssr: false,
  }
)

const View = () => {
  const params = useParams()
  const [client, setClient] = useState(false)
  useEffect(() => {
    setClient(true)
  }, [])
  return <InvoicePDF id={params.id as string} />
}

export default View

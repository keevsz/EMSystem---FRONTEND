import React from 'react'
import axios from 'axios'
import StudentsList from '@/components/certificates/StudentsList'

export default async function page() {
  const response = await axios.get(`${process.env.API_URL}/students`)
  const students = response.data
  return (
    <div>
      <h1 className="text-2xl">CONSTANCIA DE ESTUDIOS</h1>
      <StudentsList students={students} />
    </div>
  )
}

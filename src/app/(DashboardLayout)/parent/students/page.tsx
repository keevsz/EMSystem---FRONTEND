import ParentStudentsList from '@/components/parent/students/ParentStudentsList'
import React from 'react'

function StudentsParentPage() {
  return (
    <div>
      <div className="text-xl font-bold">Información de hijos matriculados</div>
      <ParentStudentsList />
    </div>
  )
}

export default StudentsParentPage

'use client'
import { Student } from '@/types/tuition'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

interface Props {
  students: Student[]
}
export default function StudentsList({ students }: Props) {
  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>DNI</TableColumn>
          <TableColumn>Nombres y apellidos</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student._id}>
              <TableCell>{student.dni}</TableCell>
              <TableCell>
                {student.user.firstName} {student.user.lastName}
              </TableCell>
              <TableCell>
                <Link href={`/certificates/${student.user._id}`}>
                  <Button>Generar</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

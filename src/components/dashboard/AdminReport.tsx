'use client'
import React from 'react'
import { Bar, Line, Bubble, Scatter, PolarArea } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import { LinearGradient } from '@react-pdf/renderer'

ChartJS.register(...registerables)

export interface AdminReport {
  'Cantidad de matrículas': number
  'Cursos destacados': CursosDestacado[]
  'Cantidad de permisos': number
  'Usuarios registrados': number
}

export interface CursosDestacado {
  course: string
  average: number
}

interface Props {
  adminReport: AdminReport
}

export default function AdminReport({ adminReport }: Props) {
  return (
    <div className="flex flex-row gap-5">
      <div className="h-72 w-1/2">
        <Bar
          style={{ width: '50%', height: '400px' }}
          title="Gráfico de cursos destacados"
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: 20,
                ticks: {
                  stepSize: 1,
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Cursos destacados',
              },
            },
          }}
          data={{
            labels: adminReport['Cursos destacados']?.map((c) => c.course),
            datasets: [
              {
                label: 'Promedio de nota',
                data: adminReport['Cursos destacados']?.map((c) => c.average),
                backgroundColor: 'orange',
              },
            ],
          }}
        ></Bar>
      </div>

      <div className="h-72 w-1/2">
        <Bar
          style={{ width: '50%', height: '400px' }}
          title="Gráfico de reportes generales"
          options={{
            maintainAspectRatio: true,
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                ticks: {
                  stepSize: 2,
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: `Año: ${new Date().getFullYear()}`,
              },
            },
          }}
          data={{
            labels: ['Matriculas', 'Permisos', 'Usuarios'],
            datasets: [
              {
                label: 'Cantidad',
                data: [
                  adminReport['Cantidad de matrículas'],
                  adminReport['Cantidad de permisos'],
                  adminReport['Usuarios registrados'],
                ],
                backgroundColor: 'green',
              },
            ],
          }}
        ></Bar>
      </div>
    </div>
  )
}

'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

interface Props {
  report: {
    _id: number
    count: number
  }[]
}
export default function SearchReport({ report }: Props) {
  return (
    <div>
      <Bar
        style={{ width: '400px', height: '400px' }}
        title="Gráfico de permisos"
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              ticks: {
                stepSize: 1,
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Permisos por tipo',
            },
          },
        }}
        data={{
          labels: report?.map((r) => r._id),
          datasets: [
            {
              label: 'Permisos',
              data: report?.map((n) => n.count),
            },
          ],
        }}
      ></Bar>
    </div>
  )
}

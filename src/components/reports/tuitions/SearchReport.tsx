'use client'
import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

interface Props {
  report: {
    totalMatriculas: number
    totalMonto: number
    year: number
  }[]
}
export default function SearchReport({ report }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div>
        <Bar
          style={{ width: '400px', height: '400px' }}
          title="Gráfico de matrículas"
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
                text: 'Matrículas por año',
              },
            },
          }}
          data={{
            labels: report?.sort((a, b) => a.year - b.year).map((r) => r.year),
            datasets: [
              {
                label: 'Matrículas',
                data: report?.map((n) => n.totalMatriculas),
                //   backgroundColor: report?.map(
                //     (item) => colors[item.finalLetter] || 'gray'
                //   ),
              },
            ],
          }}
        ></Bar>
      </div>

      <div>
        <Line
          style={{ width: '400px', height: '400px' }}
          title="Gráfico de matrículas"
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
                text: 'Monto por año',
              },
            },
          }}
          data={{
            labels: report?.sort((a, b) => a.year - b.year).map((r) => r.year),
            datasets: [
              {
                label: 'Monto',
                data: report?.map((n) => n.totalMonto),
                //   backgroundColor: report?.map(
                //     (item) => colors[item.finalLetter] || 'gray'
                //   ),
              },
            ],
          }}
        ></Line>
      </div>
    </div>
  )
}

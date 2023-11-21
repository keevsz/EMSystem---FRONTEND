/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import { fetchReport } from '@/app/api/notes/notesAPI'
import { useSession } from 'next-auth/react'
import { INoteReport } from '@/types/note'
import { Degree, SchoolYear } from '@/types/tuition'
import html2canvas from 'html2canvas'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'
import { createRoot } from 'react-dom/client'

ChartJS.register(...registerables)

const styles = StyleSheet.create({
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '16.6%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 10,
    fontSize: 11,
  },
})

export const MyDocument = ({
  report,
  sy,
  degree,
  chartImage,
}: {
  report: INoteReport
  sy: SchoolYear
  degree: Degree
  chartImage: string
}) => {
  console.log({ chartImage })
  return (
    <Document>
      <Page
        size="A4"
        style={{
          padding: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <View
          style={{
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Reporte de notas</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <View
            style={{
              color: 'black',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Text style={{ fontSize: 10 }}>Estudiante: {report.student}</Text>
          </View>
          <View
            style={{
              color: 'black',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Text style={{ fontSize: 10 }}>Año: {sy.year}</Text>
          </View>
          <View
            style={{
              color: 'black',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Text style={{ fontSize: 10 }}>Nivel: {degree.level}</Text>
          </View>
          <View
            style={{
              color: 'black',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Text style={{ fontSize: 10 }}>Grado: {degree.grade}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Curso</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>U1</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>U2</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>U3</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Nota Final</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Equivalente</Text>
            </View>
          </View>
          {report.notes.map((note, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{note.course}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{note.units[0].note} </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{note.units[1].note} </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{note.units[2].note} </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{note.finalNote}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {note.finalLetter.substring(0, 1)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View>
          <Image src={chartImage} />
        </View>
      </Page>
    </Document>
  )
}

const colors: any = {
  'AD (Excelente)': 'green',
  'A (Bueno)': 'blue',
  'B (Regular)': 'yellow',
  'C (Deficiente)': 'red',
}

const PDFView = ({
  studentId,
  degreeId,
  schoolYearId,
}: {
  studentId: string
  degreeId: string
  schoolYearId: string
}) => {
  const { data: session } = useSession()

  const [client, setClient] = useState(false)
  const [data, setData] = useState<INoteReport>()
  const [sy, setSy] = useState()
  const [degree, setDegree] = useState()
  const [chartImage, setChartImage] = useState('')
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const fetchData = async () => {
    const filter = {
      degreeId: degreeId,
      schoolYearId: schoolYearId,
      studentId: studentId,
    }
    const notesReport = await fetchReport(
      session?.backendTokens.accessToken!,
      filter
    )

    const resSy = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/school-year/${schoolYearId}`,
      {
        method: 'GET',
      }
    )
    const sy = await resSy.json()

    const resDegree = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/degree/${degreeId}`,
      {
        method: 'GET',
      }
    )
    const degree = await resDegree.json()

    const chartImageBase64 = await generateChartImage()
    console.log(chartImageBase64)

    setSy(sy)
    setDegree(degree)
    setData(notesReport)
    setChartImage(chartImageBase64)

    setIsGeneratingPDF(true)
  }

  const generateChartImage = async () => {
    const chartData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          label: 'Sample Data',
          data: [12, 19, 3],
          backgroundColor: ['red', 'green', 'blue'],
        },
      ],
    }

    const div = document.createElement('div')
    document.body.appendChild(div)

    const root = createRoot(div)

    if (isGeneratingPDF) {
      root.render(
        <Bar
          style={{ width: '400px', height: '400px' }}
          title="Gráfico de notas"
          options={{
            maintainAspectRatio: false,
            font: { size: 30 },
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                max: 20,
                ticks: {
                  stepSize: 5, // Define el tamaño del paso
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'Gráfico de notas',
              },
            },
          }}
          data={{
            labels: data?.notes.map((n) => n.course),
            datasets: [
              {
                label: 'Notas',
                data: data?.notes.map((n) => n.finalNote),
                backgroundColor: data?.notes.map(
                  (item) => colors[item.finalLetter] || 'gray'
                ),
              },
            ],
          }}
        ></Bar>
      )
    }
    // Agregar un pequeño retraso para asegurarse de que el gráfico se renderice antes de capturarlo.
    await new Promise((resolve) => setTimeout(resolve, 500)) // 500ms de retraso

    const chartImage = await html2canvas(div, {
      allowTaint: true,
      useCORS: true,
      logging: true,
    })
    div.remove()

    return chartImage.toDataURL('image/png')
  }

  useEffect(() => {
    setClient(true)
    fetchData()
  }, [])

  useEffect(() => {
    // Cuando los datos se carguen por completo, permitimos la generación del PDF
    if (data) {
      generatePDF()
    }
  }, [data])

  const generatePDF = async () => {
    const chartImageBase64 = await generateChartImage()
    setIsGeneratingPDF(false)
    setChartImage(chartImageBase64)
  }

  return data ? (
    <PDFViewer className="w-full h-screen">
      <MyDocument
        report={data}
        sy={sy!}
        degree={degree!}
        chartImage={chartImage}
      />
    </PDFViewer>
  ) : (
    <></>
  )
}

export default PDFView

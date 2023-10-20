/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Image,
  StyleSheet,
} from '@react-pdf/renderer'
import { fetchTuition } from '@/app/api/tuitions/tuitionAPI'
import { ITuitionGet } from '@/types/tuition'

interface Props {
  data: ITuitionGet
}
export const MyDocument = ({ data }: Props) => {
  return (
    data && (
      <Document>
        <Page
          size="C6"
          style={{
            display: 'flex',
            padding: 20,
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Image
                src={'https://cdn-icons-png.flaticon.com/512/2602/2602414.png'}
                style={{
                  width: 40,
                  height: 40,
                }}
              ></Image>
            </View>

            <View
              style={{
                flex: 2,
                textAlign: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                }}
              >
                Boleta de matrícula
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                textAlign: 'right',
                fontSize: 12,
              }}
            >
              <Text>{data.createdAt.toString().substring(0, 10)}</Text>
              <Text>{data.createdAt.toString().substring(11, 19)}</Text>
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              fontSize: 11,
            }}
          >
            <View
              style={{
                display: 'flex',
                gap: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    display: 'flex',
                    fontSize: 14,
                  }}
                >
                  Datos del estudiante
                </Text>
                <Text>{data.student?.user?.firstName}</Text>
                <Text>{data.student?.user?.lastName}</Text>
                <Text>DNI: {data.student?.dni}</Text>
              </View>

              <View>
                <Text
                  style={{
                    display: 'flex',
                    fontSize: 14,
                  }}
                >
                  Datos del apoderado
                </Text>
                <Text>{data.parent?.user?.firstName}</Text>
                <Text>{data.parent?.user?.lastName}</Text>
                <Text>DNI: {data.parent?.dni}</Text>
                <Text>Teléfono: {data.parent?.phoneNumber}</Text>
                <Text>Email: {data.parent?.email}</Text>
              </View>
            </View>
            <View>
              <Text>Año: {data.schoolYear.year}</Text>
              <Text>Nivel:{data.degree.level.toUpperCase()}</Text>
              <Text>Grado:{data.degree.grade}</Text>
              <Text>Costo: {data.cost}</Text>
              <Text>Tipo de pago: {data.paymentType.toUpperCase()}</Text>
            </View>
          </View>
        </Page>
      </Document>
    )
  )
}

const PDFView = ({ id }: { id: string }) => {
  const [client, setClient] = useState(false)
  const [data, setData] = useState<ITuitionGet>()

  const fetchTuitionC = async () => {
    const tuition = await fetchTuition(id)
    setData(tuition)
  }
  useEffect(() => {
    setClient(true)
    fetchTuitionC()
  }, [])

  return (
    data && (
      <PDFViewer className="w-full h-screen">
        <MyDocument data={data} />
      </PDFViewer>
    )
  )
}

export default PDFView

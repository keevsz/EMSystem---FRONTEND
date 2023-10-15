'use client'

import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import BtnBackComponent from '@/components/common/BtnBackComponent'
import { ITuition } from '@/types/tuition'
import { fetchExternalUserByDNI } from '@/app/api/users/route'
import toast from 'react-hot-toast'
import { fetchCreateTuitionAdmin } from '@/app/api/tuitions/tuitionAPI'

interface Props {
  schoolYears: ISchoolYear[]
  degrees: IDegree[]
}

const TUITION_INITIAL_DATA: ITuition = {
  parentName: '',
  parentLastname: '',
  parentDni: '',
  parentEmail: '',
  parentPhoneNumber: '',
  studentName: '',
  studentLastname: '',
  studentDni: '',
  studentBirthdate: '',
  studentAddress: '',
  studentGender: '',
  schoolYear: {
    _id: '',
    year: 0,
  },
  degree: {
    _id: '',
    grade: 0,
    level: '',
  },
}

function TuitionForm({ schoolYears, degrees }: Props) {
  const { data: session } = useSession()
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState('m')

  const [tuitionData, setTuitionData] = useState<ITuition>(TUITION_INITIAL_DATA)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const schoolYearsC = () => {
    return (
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-semibold">Año académico</h3>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-4 gap-y-4"'>
          {schoolYears
            .sort((a, b) => b.year - a.year)
            .map((SchoolYear) => (
              <Card key={SchoolYear.year}>
                <CardBody
                  onClick={() => {
                    setPage(1)

                    setTuitionData({
                      ...tuitionData,
                      ['schoolYear']: {
                        ...SchoolYear,
                        _id: SchoolYear._id!.toString(),
                      },
                    })
                  }}
                  className="text-center cursor-pointer hover:opacity-50"
                >
                  {SchoolYear.year}
                </CardBody>
              </Card>
            ))}
        </div>
      </div>
    )
  }

  const degreesC = () => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <div
            className="w-min"
            onClick={() => {
              setPage(0)
              setTuitionData({
                ...tuitionData,
                ['schoolYear']: {
                  year: 0,
                  _id: '',
                },
                ['degree']: {
                  _id: '',
                  grade: 0,
                  level: '',
                },
              })
            }}
          >
            <BtnBackComponent />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              Año: {tuitionData.schoolYear.year}
              {tuitionData.degree.grade
                ? ` - ${tuitionData.degree.grade}° de ${tuitionData.degree.level}`
                : ``}
            </h3>
          </div>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-4 gap-y-4"'>
          {degrees
            .sort((a, b) => a.grade - b.grade)
            .map((degree) => (
              <Card
                key={degree._id}
                className={
                  degree._id === tuitionData.degree._id
                    ? 'border-blue-500 border-1'
                    : ''
                }
              >
                <CardBody
                  onClick={() => {
                    setTuitionData({
                      ...tuitionData,
                      ['degree']: {
                        _id: degree._id,
                        grade: degree.grade,
                        level: degree.level,
                      },
                    })
                  }}
                  className="text-center cursor-pointer hover:opacity-50"
                >
                  {degree.grade}° {degree.level}
                </CardBody>
              </Card>
            ))}
        </div>
      </div>
    )
  }

  const fetchUserByDNI = async (type: string) => {
    try {
      const dni =
        type === 'parent' ? tuitionData.parentDni : tuitionData.studentDni

      if (dni.trim().length !== 8 || isNaN(+dni)) {
        toast.error('Ingrese un DNI válido')
        return
      }

      if (type === 'parent') {
        setLoading(true)
      } else {
        setLoading2(true)
      }

      const userDataFetchedFromExternalAPI = await fetchExternalUserByDNI(
        session?.backendTokens.accessToken!,
        dni
      )

      const name = userDataFetchedFromExternalAPI.nombres
      const lastname = `${userDataFetchedFromExternalAPI.apellidoPaterno} ${userDataFetchedFromExternalAPI.apellidoMaterno}`

      const newData = {
        ...tuitionData,
        [`${type}Name`]: name,
        [`${type}Lastname`]: lastname,
      }

      setTuitionData(newData)

      if (type === 'parent') {
        setLoading(false)
      } else {
        setLoading2(false)
      }
    } catch (error: any) {
      const newData = {
        ...tuitionData,
        [`${type}Name`]: '',
        [`${type}Lastname`]: '',
      }

      setTuitionData(newData)

      if (type === 'parent') {
        setLoading(false)
      } else {
        setLoading2(false)
      }

      toast.error('Persona no encontrada')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTuitionData({ ...tuitionData, [e.target.name]: e.target.value })
  }

  const verifyFieldsModal = () => {
    try {
      if (
        tuitionData.parentName === '' ||
        tuitionData.parentLastname === '' ||
        tuitionData.parentDni === '' ||
        tuitionData.parentEmail === '' ||
        tuitionData.parentPhoneNumber === '' ||
        tuitionData.studentName === '' ||
        tuitionData.studentLastname === '' ||
        tuitionData.studentDni === '' ||
        tuitionData.studentBirthdate === '' ||
        tuitionData.studentAddress === '' ||
        tuitionData.schoolYear.year === 0 ||
        tuitionData.degree.grade === 0 ||
        tuitionData.degree.level === ''
      ) {
        throw new Error()
      }
      onOpen()
    } catch (error) {
      toast.error('Por favor complete todos los campos')
    }
  }

  const handleFetchCreateTuition = async (onClose: any) => {
    const tuitionDataFormatted = {
      parentName: tuitionData.parentName,
      parentLastname: tuitionData.parentLastname,
      parentDni: tuitionData.parentDni,
      parentEmail: tuitionData.parentEmail,
      parentPhoneNumber: tuitionData.parentPhoneNumber,
      studentName: tuitionData.studentName,
      studentLastname: tuitionData.studentLastname,
      studentDni: tuitionData.studentDni,
      studentBirthdate: tuitionData.studentBirthdate,
      studentAddress: tuitionData.studentAddress,
      studentGender: selected,
      schoolYear: tuitionData.schoolYear._id,
      degree: tuitionData.degree._id,
    }
    await fetchCreateTuitionAdmin(
      session?.backendTokens!.accessToken!,
      tuitionDataFormatted
    )
    onClose()
    setTuitionData(TUITION_INITIAL_DATA)
    setPage(0)
  }

  const handleSubmit = async (onClose: any) => {
    toast.promise(handleFetchCreateTuition(onClose), {
      loading: 'Guardando...',
      success: <b>Alumno matriculado.</b>,
      error: (e) => <b>{e.toString()}</b>,
    })
  }

  useEffect(() => {
    console.log(tuitionData)
  }, [tuitionData])

  return (
    <div className="flex flex-col gap-5">
      <form className="flex flex-col gap-5">
        <h3 className="text-lg font-semibold">Datos del apoderado</h3>
        <Card>
          <CardBody className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            <div className="flex flex-row justify-center items-center gap-3">
              <Input
                onChange={handleChange}
                type="text"
                label="DNI"
                placeholder="Ingrese DNI para buscar"
                isRequired
                variant="bordered"
                value={tuitionData.parentDni}
                name="parentDni"
              />
              <Button
                className="flex justify-center items-center focus:outline-none"
                color="primary"
                type="button"
                onPress={() => {
                  fetchUserByDNI('parent')
                }}
                isLoading={loading}
              >
                {!loading && 'Buscar'}
              </Button>
            </div>
            <Input
              onChange={handleChange}
              type="text"
              label="Nombres"
              isDisabled
              value={tuitionData.parentName}
              name="parentName"
            />
            <Input
              onChange={handleChange}
              type="text"
              label="Apellidos"
              isDisabled
              value={tuitionData.parentLastname}
              name="parentLastname"
            />
            <Input
              onChange={handleChange}
              type="email"
              label="Email"
              value={tuitionData.parentEmail}
              name="parentEmail"
            />
            <Input
              onChange={handleChange}
              type="text"
              label="Teléfono"
              value={tuitionData.parentPhoneNumber}
              name="parentPhoneNumber"
            />
          </CardBody>
        </Card>

        <h3 className="text-lg font-semibold">Datos del alumno</h3>
        <Card>
          <CardBody className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
            <div className="flex flex-row justify-center items-center gap-3">
              <Input
                onChange={handleChange}
                type="text"
                label="DNI"
                placeholder="Ingrese DNI para buscar"
                isRequired
                variant="bordered"
                value={tuitionData.studentDni}
                name="studentDni"
              />
              <Button
                className="flex justify-center items-center focus:outline-none"
                color="primary"
                type="button"
                onPress={() => {
                  fetchUserByDNI('student')
                }}
                isLoading={loading2}
              >
                {!loading2 && 'Buscar'}
              </Button>
            </div>
            <Input
              onChange={handleChange}
              type="text"
              label="Nombres"
              isDisabled
              value={tuitionData.studentName}
              name="studentName"
            />
            <Input
              onChange={handleChange}
              type="text"
              label="Apellidos"
              isDisabled
              value={tuitionData.studentLastname}
              name="studentLastname"
            />
            <Input
              onChange={handleChange}
              type="date"
              variant="bordered"
              label="Fecha de nacimiento"
              placeholder="Select date"
              value={tuitionData.studentBirthdate}
              name="studentBirthdate"
              fullWidth
            />
            <Input
              onChange={handleChange}
              type="text"
              label="Dirección"
              value={tuitionData.studentAddress}
              name="studentAddress"
            />
            <RadioGroup value={selected} onValueChange={setSelected}>
              <Radio value="m" defaultChecked>
                Masculino
              </Radio>
              <Radio value="f">Femenino</Radio>
            </RadioGroup>
          </CardBody>
        </Card>
      </form>

      {!page ? schoolYearsC() : degreesC()}

      <Button color="success" onPress={verifyFieldsModal}>
        Matricular
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold">Datos de Matrícula</h3>
              </ModalHeader>
              <ModalBody>
                <hr />
                <h3 className="text-xl font-bold">Datos del apoderado </h3>
                <div>
                  <strong>Nombre del Padre:</strong> {tuitionData.parentName}
                </div>
                <div>
                  <strong>Apellido del Padre:</strong>
                  {tuitionData.parentLastname}
                </div>
                <div>
                  <strong>DNI del Padre:</strong> {tuitionData.parentDni}
                </div>
                <div>
                  <strong>Email del Padre:</strong> {tuitionData.parentEmail}
                </div>
                <div>
                  <strong>Teléfono del Padre:</strong>
                  {tuitionData.parentPhoneNumber}
                </div>
                <hr />
                <h3 className="text-xl font-bold">Datos del estudiante</h3>
                <div>
                  <strong>Nombre del Estudiante:</strong>
                  {tuitionData.studentName}
                </div>
                <div>
                  <strong>Apellido del Estudiante:</strong>
                  {tuitionData.studentLastname}
                </div>
                <div>
                  <strong>DNI del Estudiante:</strong> {tuitionData.studentDni}
                </div>
                <div>
                  <strong>Fecha de Nacimiento del Estudiante:</strong>
                  {tuitionData.studentBirthdate}
                </div>
                <div>
                  <strong>Dirección del Estudiante:</strong>
                  {tuitionData.studentAddress}
                </div>
                <div>
                  <strong>Género del Estudiante:</strong> {selected}
                </div>

                <hr />
                <h3 className="text-xl font-bold">Año escolar</h3>
                <div>
                  <strong>Año Académico:</strong> {tuitionData.schoolYear.year}
                </div>
                <div>
                  <strong>Grado del Estudiante:</strong>
                  {tuitionData.degree.grade}
                </div>
                <div>
                  <strong>Nivel del Estudiante:</strong>
                  {tuitionData.degree.level}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose()
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleSubmit(onClose)
                  }}
                >
                  Matricular
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TuitionForm

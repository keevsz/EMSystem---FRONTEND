'use client'
import React, { useState, useRef, useEffect } from 'react'
import { IStudent } from '@/types/user'
import { Input } from '@nextui-org/react'
import Image from 'next/image'
import SchoolPng from '../../../public/school.png'
import { useReactToPrint } from 'react-to-print'

interface Props {
  student: IStudent
}
export default function CertificateC({ student: studentData }: Props) {
  const [date, setDate] = useState({
    start: '',
    end: '',
  })

  const certificateRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  })

  return (
    <div>
      <div className="flex justify-center gap-5 items-center -mb-20">
        <div>
          Fecha inicio
          <Input
            type="date"
            name=""
            id=""
            onChange={(e) => setDate({ ...date, start: e.target.value })}
          />
        </div>
        <div>
          Fecha termino
          <Input
            type="date"
            name=""
            id=""
            onChange={(e) => setDate({ ...date, end: e.target.value })}
          />
        </div>
      </div>

      <section
        className="flex flex-col justify-center items-center p-12"
        ref={certificateRef}
      >
        <br />
        <br />
        <br />
        <div className="text-center font-bold text-sm">
          <div>INSTITUCIÓN EDUCATIVA PARTICULAR</div>
          <div>RAYITOS DEL SOL N° 123</div>
          <div>Calle ... N° 123</div>
          <div>UGEL - PUEBLO NUEVO</div>
          <br />
          <div>&quot;Año de educación...&quot;</div>
          <br />
        </div>
        <br />
        <h1 className="text-3xl text-bold underline text-center">
          CONSTANCIA DE ESTUDIO
        </h1>
        <br />
        <br />
        <div className="text-xl px-20 pt-5">
          <p>
            Por medio de la presente informo a quien corresponda que el
            Alumno(a)
          </p>
          <div className="text-center">
            <strong className="text-semibold">
              {studentData.lastName?.toUpperCase()},{' '}
              {studentData.firstName?.toUpperCase()}
            </strong>
          </div>
          <p>
            de DNI: <strong className="text-semibold">{studentData.dni}</strong>
            , ha completado satisfactoriamente el nivel de Educación Primaria
            durante el período académico comprendido entre [
            {date.start ? date.start : 'Seleccionar fecha'}] y [
            {date.end ? date.end : 'Seleccionar fecha'}], cumpliendo con los
            requisitos académicos establecidos por la institución.
          </p>
        </div>
        <br />
        <p className="text-center text-lg">
          Pueblo nuevo, Perú {new Date().getFullYear()}
        </p>
        <br />
        <br />
        <br />
        <div className="flex justify-center items-center gap-10">
          <div className="text-center">
            <div>
              <hr />
            </div>
            <strong className="text-semibold">FIRMA DEL APODERADO(A)</strong>
          </div>
          <div className="text-center">
            <div>
              <hr />
            </div>
            <strong className="text-semibold">FIRMA DEL DIRECTOR(A)</strong>
          </div>
        </div>
        <br /> <br />
        <div className="flex justify-end text-center">
          <div className="flex flex-col justify-center items-center">
            <Image src={SchoolPng} width={50} alt="School icon"></Image>
            <span>IEP &quot;Rayitos del Sol&quot;</span>
          </div>
        </div>
      </section>
      <button onClick={handlePrint}>Imprimir</button>
    </div>
  )
}

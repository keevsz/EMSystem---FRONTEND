'use client'
import { Spinner } from '@nextui-org/react'
import React from 'react'

function loading() {
  return (
    <div className="flex justify-center items-center">
      <Spinner />
    </div>
  )
}

export default loading

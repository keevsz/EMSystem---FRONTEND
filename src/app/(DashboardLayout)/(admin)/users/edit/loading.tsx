'use client'
import { Spinner } from '@nextui-org/react'
import React from 'react'

function loading() {
  return (
    <div className="flex h-24 justify-center items-center">
      <Spinner />
    </div>
  )
}

export default loading

'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactNode
}
function Providers({ children }: Props) {
  return (
    <SessionProvider>
      {children}
      <Toaster position='bottom-center'/>
    </SessionProvider>
  )
}

export default Providers

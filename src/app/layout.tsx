import Providers from './Providers'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EMSystem',
  description: 'System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-auto">
      <body className="overflow-auto">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

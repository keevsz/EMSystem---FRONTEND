import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div>
      <h1 className="text-xl font-semibold">Reportes</h1>
      <br />
      <div className="flex flex-row gap-2 justify-center items-center">
        <Link href={'/reports/notes'}> Notas</Link>
        <div className="h-4 border-solid border-1"></div>
        <Link href={'/reports/tuitions'}> Matrículas</Link>
        <div className="h-4 border-solid border-1"></div>
        <Link href={'/reports/permits'}> Permisos</Link>
      </div>
      {children}
    </div>
  )
}

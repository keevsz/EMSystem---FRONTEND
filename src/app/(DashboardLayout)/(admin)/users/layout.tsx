export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-12 min-h-full">
      <h1 className="text-2xl font-bold">Usuarios</h1>
      {children}
    </div>
  )
}

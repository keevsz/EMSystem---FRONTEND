export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-12 min-h-full">
      <div className="text-2xl font-bold">Mis cursos</div>
      {children}
    </div>
  )
}

'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2 className="text-red-400 text-xl">{error.message}</h2>
      <button className="text-red-400 text-md" onClick={() => reset()}>
        Reintentar
      </button>
    </div>
  )
}

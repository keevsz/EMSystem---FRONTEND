export default function page() {
  return (
    <div className="container p-8 bg-gray-100">
      <header className="text-3xl font-bold mb-4">Manual de Usuario</header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Inicio</h2>
        <p>
          Esta sección proporciona información gráfica general del sistema y
          reportes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cursos</h2>
        <p>
          Esta sección proporciona la adminitración de cursos, donde se puede
          registrar nuevos cursos como también crear periodicos académicos y
          poder asignar profesores
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
        <p>
          Esta sección proporciona la adminitración de usuarios, donde se podrán
          registrar nuevos usuarios como añadir profesores, gestionar sus roles,
          etc.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Matriculas</h2>
        <p>
          Esta sección proporciona la adminitración de matrículas, acá se podrán
          registrar las matrículas y generar PDFs una vez matriculados. Acá
          mismo se registra los usuarios que han sido matriculados.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Notas</h2>
        <p>
          Esta sección proporciona la adminitración de notas por materias, donde
          se pueden colocar notas y promedios.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Reportes</h2>
        <p>
          Esta sección proporciona reportes graficos, de notas por alumno o
          generales.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Constancias</h2>
        <p>
          Esta sección genera las constancias de estudio por alumno, y se
          establecen fechas, por último se puede exportar como PDF para que
          puedan firmar los correspondientes.
        </p>
      </section>
    </div>
  )
}

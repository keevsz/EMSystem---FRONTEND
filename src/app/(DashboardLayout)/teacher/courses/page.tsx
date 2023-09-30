import Levels from '@/components/teacher/courses/Levels'
const data = [
  {
    level: 'Primaria',
    courses: [
      {
        id: 1,
        name: 'Personal social',
        description: 'Curso de personal social',
        isActive: true,
        grade: 1,
      },
      {
        id: 2,
        name: 'Personal social',
        description: 'Curso de personal social',
        isActive: true,
        grade: 2,
      },
      {
        id: 3,
        name: 'Personal social',
        description: 'Curso de personal social',
        isActive: true,
        grade: 3,
      },
    ],
  },
  {
    level: 'Secundaria',
    courses: [
      {
        id: 10,
        name: 'PFRH',
        description: 'Curso de PFRH',
        isActive: true,
        grade: 1,
      },
      {
        id: 11,
        name: 'Algebra',
        description: 'Curso de Algebra',
        isActive: true,
        grade: 2,
      },
      {
        id: 12,
        name: 'Trigonometria',
        description: 'Curso de Trigonometria',
        isActive: true,
        grade: 3,
      },
    ],
  },
]

function MyCoursesPage() {
  return (
    <div>
      <Levels data={data}></Levels>
    </div>
  )
}

export default MyCoursesPage

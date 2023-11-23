import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import AdminDashboard from '@/components/dashboard/AdminDashboard'
import { fetchReportPermit } from '../api/permits/permitsAPI'
import { fetchTuitionReport } from '../api/tuitions/tuitionAPI'
async function DashboardPage() {
  const data = await getServerSession(authOptions)
  const permitsReport = await fetchReportPermit()
  const tuitionReport = await fetchTuitionReport()

  const components = {
    admin: (permitsReport: any, tuitionReport: any) => (
      <AdminDashboard
        permitsReport={permitsReport}
        tuitionReport={tuitionReport}
      />
    ),
    parent: () => <>Parent dashboard</>,
    student: () => <>Student dashboard</>,
    teacher: () => <>Teacher dashboard</>,
  }
  return (
    <div>
      {data?.user.role === 'admin' ? (
        components.admin(permitsReport, tuitionReport)
      ) : (
        <h1 className='text-3xl'>Sistema de gestión académica</h1>
      )}
    </div>
  )
}

export default DashboardPage

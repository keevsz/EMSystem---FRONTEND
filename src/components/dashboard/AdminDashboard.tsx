import axios from 'axios'
import UsersMain from '../admin/users/main/UsersMain'
import SearchReport from '../reports/permits/SearchReport'
import SearchTuitionsReport from '../reports/tuitions/SearchReport'
import AdminReport from './AdminReport'

interface Props {
  permitsReport: {
    _id: number
    count: number
  }[]
  tuitionReport: {
    totalMatriculas: number
    totalMonto: number
    year: number
  }[]
}

export default async function AdminDashboard({
  permitsReport,
  tuitionReport,
}: Props) {
  const adminReportResponse = await axios.get(
    `${
      process.env.API_URL
    }/teacher-course/admin-report/${new Date().getFullYear()}`
  )
  const adminReport = adminReportResponse.data
  return (
    <div className="max-w-full">
      <h1 className='text-center text-bold mb-2'>Usuarios</h1>
      <UsersMain />
      <br />
      <br />
      <div>
        <h1 className="text-center text-bold mb-2">Reportes generales</h1>
        <AdminReport adminReport={adminReport}></AdminReport>
      </div>
      <div>
          <SearchTuitionsReport report={tuitionReport} />
      </div>
      <div>
          <SearchReport report={permitsReport} />
      </div>
    </div>
  )
}

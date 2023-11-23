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
    <div>
      <h1>Dashboard</h1>
      <UsersMain />
      <br />
      <br />
      <div>
        <h2 className='text-center'>Reportes generales</h2>
        <br />
        <AdminReport adminReport={adminReport}></AdminReport>
        <br />
      </div>
      <div className="flex flex-row gap-10">
        <div className="w-1/2">
          <SearchTuitionsReport report={tuitionReport} />
        </div>
        <br />
        <div className="w-1/2">
          <SearchReport report={permitsReport} />
        </div>
      </div>
    </div>
  )
}

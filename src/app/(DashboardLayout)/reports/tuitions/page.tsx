import { fetchTuitionReport } from '@/app/api/tuitions/tuitionAPI'
import SearchReport from '@/components/reports/tuitions/SearchReport'

export default async function page() {
  const report = await fetchTuitionReport()
  return (
    <div>
      <SearchReport report={report} />
    </div>
  )
}

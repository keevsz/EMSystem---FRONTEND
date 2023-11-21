import { fetchReportPermit } from '@/app/api/permits/permitsAPI'
import SearchReport from '@/components/reports/permits/SearchReport'
import React from 'react'

export default async function page() {
  const report = await fetchReportPermit()

  return (
    <div>
        <SearchReport report={report}/>
    </div>
  )
}

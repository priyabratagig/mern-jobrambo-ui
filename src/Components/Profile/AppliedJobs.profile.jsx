import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { fetch_companies_by_ids, fetch_jobs_by_jobids, get_job_application_by_applicant } from '../../api'
import { useSelector } from 'react-redux'

export function AppliedJobs() {
    const isrecruiter = useSelector(state => state.user?.isrecruiter)
    const [appliedJobs, setAppliedJobs] = useState([])
    const [jobs, setJobs] = useState({})
    const [companies, setCompanies] = useState({})

    useEffect(() => {
        if (isrecruiter === undefined || isrecruiter === true) return undefined

        const onLoad = async () => {
            const applications = await get_job_application_by_applicant({ fields: 'jobid companyid status createdAt' })

            const jobids = applications.map(application => application.jobid)
            const jobs = await fetch_jobs_by_jobids({ jobids, fields: '_id title' })

            const companyids = applications.map(application => application.companyid)
            const companies = await fetch_companies_by_ids({ companyids, fields: '_id name' })

            setAppliedJobs(applications)
            setJobs(jobs)
            setCompanies(companies)
        }

        const timeOut = setTimeout(onLoad, 150)
        return () => clearTimeout(timeOut)
    }, [])

    return (
        <div className='grow'>
            {
                !isrecruiter && <Table>
                    <TableCaption>A list of your applied jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Job Role</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            appliedJobs.map((application) => (
                                <TableRow key={application.applicationid}>
                                    <TableCell>{application.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{jobs[application.jobid]?.title}</TableCell>
                                    <TableCell>{companies[application.companyid]?.name}</TableCell>
                                    <TableCell className="text-right"><Badge className={`${application.status === "rejected" ? 'bg-red-400' : application.status === 'accepted' ? 'bg-green-400' : 'bg-gray-400'}`}>{application.status?.toUpperCase()}</Badge></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    {
                        appliedJobs.length <= 0 && <span className='flex justify-center translate-x-[62%]'>You haven&apos;t applied any job yet.</span>
                    }
                </Table>
            }
        </div>
    )
}

export default AppliedJobs
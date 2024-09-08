import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { JobCard } from '../JobCard.component'
import { get_all_jobs, fetch_companies_by_ids } from '../../api'
import { setAllCompanies, setAllJobs } from '../../redux'


export function LatestJobs() {
    const allJobs = useSelector(state => state.jobs.allJobs)
    const allJobsArr = Object.values(allJobs || {})

    useEffect(() => {
        const getLatesJobs = async () => {
            try {
                const jobs = await get_all_jobs({ fields: '', sort: '-createdAt', limit: 6 })

                const jobids = Object.keys(jobs)
                if (jobids.length < 1) {
                    toast('No jobs found')

                    return undefined
                }

                const companyids = Object.keys(jobids.reduce((companyIdsDict, jobid) => {
                    companyIdsDict[jobs[jobid].companyid] = true
                    return companyIdsDict
                }, {}))
                const companies = await fetch_companies_by_ids({ companyids, fields: '_id name' })

                setAllJobs(jobs)
                setAllCompanies(companies)
            }
            catch ({ message }) {
                toast.error(message)

                console.error(message)
            }
        }

        const timeOut = setTimeout(getLatesJobs, 150)
        return () => clearTimeout(timeOut)
    }, [])

    return (
        <div className='max-w-7xl my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    allJobsArr.length == 0 ? <span>No Job Available</span> : allJobsArr.map((job) => <JobCard key={job.jobid} jobid={job.jobid} />)
                }
            </div>
        </div>
    )
}

export default LatestJobs
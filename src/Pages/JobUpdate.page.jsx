import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { JobForm } from '../Components'
import { update_job } from '../api'
import { setManagingJobs } from '../redux'
import { JOB_LISTING } from '../configs'
import { useRecruiterOnly } from '../Hooks'

export function JobUpdate() {
    useRecruiterOnly()

    const { jobid } = useParams()
    const managingJobs = useSelector(state => state.jobs.managingJobs)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [requirements, setRequirements] = useState('')
    const [salary, setSalary] = useState('')
    const [location, setLocation] = useState('')
    const [type, setType] = useState('')
    const [experience, setExperience] = useState('')
    const [positions, setPositions] = useState(0)
    const [companyid, setCompanyid] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const job = managingJobs[jobid]

        if (!job) {
            toast.error('job not found')

            navigate(JOB_LISTING)
        }

        setTitle(job.title)
        setDescription(job.description)
        setRequirements(job.requirements)
        setSalary(job.salary)
        setLocation(job.location)
        setType(job.type)
        setExperience(job.experience)
        setPositions(job.positions)
        setCompanyid(job.companyid)
    }, [managingJobs, jobid, navigate])

    const onSubmit = async () => {
        setLoading(true)

        const jobInfo = {
            jobid,
            title,
            description,
            requirements,
            salary,
            location,
            type,
            experience,
            positions
        }

        try {
            const newJob = await update_job(jobInfo)

            const newManagingJobs = { ...managingJobs, [newJob.jobid]: newJob }

            setManagingJobs(newManagingJobs)

            toast.success('Job details saved')

            navigate(JOB_LISTING)
        }
        catch ({ message }) {
            toast.error(message)

            console.error(message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-screen my-5 grow'>
            <JobForm
                title={title} setTitle={setTitle}
                description={description} setDescription={setDescription}
                requirements={requirements} setRequirements={setRequirements}
                salary={salary} setSalary={setSalary}
                location={location} setLocation={setLocation}
                type={type} setType={setType}
                experience={experience} setExperience={setExperience}
                positions={positions} setPositions={setPositions}
                companyid={companyid} setCompanyid={(e) => { e.preventDefault(); return false; }}
                loading={loading}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default JobUpdate
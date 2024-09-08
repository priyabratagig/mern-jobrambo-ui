import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { JobForm } from '../Components'
import { create_job } from '../api'
import { setManagingJobs } from '../redux'
import { COMPANIES, JOB_LISTING } from '../configs'
import { useRecruiterOnly } from '../Hooks'

export function JobCreate() {
    useRecruiterOnly()

    const managingCompanies = useSelector(state => state.companies.managingCompanies)
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
        if (Object.keys(managingCompanies).length === 0) {
            toast.error('Create a company to post jobs')

            navigate(COMPANIES)
        }
    }, [managingCompanies, navigate])

    const onSubmit = async () => {
        setLoading(true)

        const jobInfo = {
            title,
            description,
            requirements,
            salary,
            location,
            type,
            experience,
            positions,
            companyid
        }

        try {
            const newJob = await create_job(jobInfo)

            const newManagingJobs = { ...managingJobs, [newJob.jobid]: newJob }

            setManagingJobs(newManagingJobs)

            toast.success('Job saved')

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
                companyid={companyid} setCompanyid={setCompanyid}
                loading={loading}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default JobCreate
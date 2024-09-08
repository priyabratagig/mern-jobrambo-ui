import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge } from '../Components/ui/badge'
import { Button } from '../Components/ui/button'
import { toast } from 'sonner'
import { HOME } from '../configs'
import { apply_job, get_applications_count_by_job, get_job_application } from '../api'
import { usePublicAndStudentsOnly, useToastDismiss } from '../Hooks'

export function Job() {
    usePublicAndStudentsOnly()
    useToastDismiss()

    const { jobid } = useParams()
    const navigate = useNavigate()
    const allJobs = useSelector(state => state.jobs.allJobs)
    const [job, setJob] = useState({})
    const [applicationCount, setApplicationCount] = useState(0)
    const [isApplied, setIsApplied] = useState(false)

    useEffect(() => {
        const job = allJobs[jobid]
        if (!job) {
            toast.error('Job not found')

            const previousPage = document.referrer
            if (previousPage && (new URL(previousPage).origin === window.location.origin)) {
                navigate(-1)
            } else {
                navigate(HOME)
            }

            return undefined
        }

        const onFirstLoad = async () => {
            try {
                const application = await get_job_application({ jobid, fields: 'status' })
                const applicationCount = await get_applications_count_by_job({ jobid })

                if (application?.status) setIsApplied(true)
                setApplicationCount(applicationCount)
            }
            catch ({ message }) {
                toast.error(message)

                console.error(message)
            }
        }

        setJob(job)

        const timeOut = setTimeout(onFirstLoad, 150)
        return () => clearTimeout(timeOut)
    }, [navigate, allJobs, jobid])

    const onApply = async () => {
        const applicationInfo = {
            jobid,
            companyid: job.companyid,
            recruiterid: job.recruiterid
        }
        try {
            await apply_job(applicationInfo)

            setIsApplied(true)

            toast.success('Job applied')
        }
        catch ({ status, message }) {
            if (status) toast.info('Loging to apply this job')
            else toast.error(message)

            console.error(message)
        }
    }

    const onClick = (e) => {
        e.preventDefault()

        return false
    }

    return (
        <div className='max-w-7xl my-10 grow'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{job.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job.positions} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job.type}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? onClick : onApply}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{job.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{job.location}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{job.description}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{job.experience} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{job.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{applicationCount}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{job.createdAt?.split('T')[0]}</span></h1>
            </div>
        </div>
    )
}

export default Job
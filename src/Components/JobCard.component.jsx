import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { JOB } from '../configs'
import { useSelector } from 'react-redux'

export function JobCardSm({ jobid }) {
    const navigate = useNavigate()
    const allJobs = useSelector(state => state.jobs.allJobs)
    const allCompanies = useSelector(state => state.companies.allCompanies)

    const job = (allJobs && allJobs[jobid]) || {}
    const company = (allCompanies && allCompanies[job.companyid]) || {}

    return (
        <div
            onClick={() => navigate(JOB.url(job.jobid))}
            className='p-5 grid lg:grid-rows-[1fr_3fr_1fr] md:grid-rows-[2fr_5fr_1fr] grid-rows-[3fr_6fr_2fr] h-[35vh] md:h-[40vh] lg:h-[45vh] rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'
        >
            <div className='overflow-hidden'>
                <h1 className='font-medium text-lg truncate'>{company.name}</h1>
                <p className='text-sm text-gray-500 truncate'>{job.location}</p>
            </div>
            <div className='overflow-hidden self-stretch'>
                <h1 className='font-bold text-lg my-2 truncate'>{job.title}</h1>
                <div className='text-sm text-gray-600 line-clamp-3 md:line-clamp-4 lg:line-clamp-6'>{job.description}</div>
            </div>
            <div className='flex items-center gap-2 mt-4 overflow-hidden'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job.positions} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job.type}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job.salary}LPA</Badge>
            </div>

        </div>
    )
}

JobCardSm.propTypes = {
    jobid: PropTypes.string.isRequired
}

export function JobCardLg({ jobid }) {
    const navigate = useNavigate()
    const allJobs = useSelector(state => state.jobs.allJobs)
    const allCompanies = useSelector(state => state.companies.allCompanies)

    const job = (allJobs && allJobs[jobid]) || {}
    const company = (allCompanies && allCompanies[job.companyid]) || {}

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDifference = currentTime - createdAt
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
    }

    return (
        <div className='p-5 grid grid-rows-[2fr_3fr_8fr_2fr_2fr] lg:grid-rows-[1fr_2fr_10fr_1fr_2fr] md:grid-rows-[1fr_2fr_10fr_1fr_2fr] lg:h-[75vh] md:h-[70vh] h-[60vh] rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job.createdAt) === 0 ? "Today" : `${daysAgoFunction(job.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar className='rounded-none'>
                        <AvatarImage src={company.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg truncate'>{company.name}</h1>
                    <p className='text-sm text-gray-500 truncate'>{job.location}</p>
                </div>
            </div>

            <div className='overflow-hidden'>
                <h1 className='font-bold text-lg my-2 line-clamp-2 md:line-clamp-3'>{job.title}</h1>
                <p className='text-sm text-gray-600 lg:line-clamp-[11] md:line-clamp-[9] line-clamp-6'>{job.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job.positions} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job.type}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(JOB.url(job.jobid))} variant="outline">Details</Button>
                <Button className="bg-[#7209b7]">Save For Later</Button>
            </div>
        </div>
    )
}

JobCardLg.propTypes = {
    jobid: PropTypes.string.isRequired
}

export function JobCard({ sm, lg, jobid }) {
    if (lg) return (<JobCardLg jobid={jobid} />)
    if (sm) return (<JobCardSm jobid={jobid} />)

    return (<JobCardSm jobid={jobid} />)
}

JobCard.propTypes = {
    sm: PropTypes.bool,
    lg: PropTypes.bool,
    jobid: PropTypes.string.isRequired
}

export default JobCard
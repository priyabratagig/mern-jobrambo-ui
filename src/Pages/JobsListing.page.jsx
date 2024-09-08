import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input } from '../Components/ui/input'
import { Button } from '../Components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../Components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../Components/ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { JOB_APPLICATIONS, JOB_CREATE, JOB_UPDATE } from '../configs'
import { useRecruiterOnly, useToastDismiss } from '../Hooks'

export function JobsListing() {
    useRecruiterOnly()
    useToastDismiss()

    const managingJobs = useSelector(state => state.jobs.managingJobs)
    const managingCompanies = useSelector(state => state.companies.managingCompanies)
    const user = useSelector(state => state.user)
    const [filter, setFilter] = useState('')
    const [filteredJobs, setFilteredJobs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            const filteredJobs = Object.values(managingJobs).filter(job => {
                const regExp = new RegExp(filter, 'i')
                return regExp.test(job.title) || regExp.test(managingCompanies[job.companyid]?.name)
            })

            setFilteredJobs(filteredJobs)
        }
    }, [filter, managingJobs, user, managingCompanies])

    return (
        <div className='max-w-6xl my-10 grow'>
            <div className='flex items-center justify-between my-5'>
                <Input
                    className="w-fit"
                    placeholder="Filter by name, role"
                    onChange={({ target }) => setFilter(target.value)}
                />
                <Button onClick={() => navigate(JOB_CREATE)}>New Jobs</Button>
            </div>
            <div>
                <Table>
                    <TableCaption>A list of your recent  posted jobs</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            filteredJobs.map((job) => (
                                <tr key={job.jobid}>
                                    <TableCell>{managingCompanies[job.companyid]?.name}</TableCell>
                                    <TableCell>{job.title}</TableCell>
                                    <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(JOB_UPDATE.url(job.jobid))} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={() => navigate(JOB_APPLICATIONS.url(job.jobid))} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>

                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default JobsListing
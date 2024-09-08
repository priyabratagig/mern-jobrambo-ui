import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MoreHorizontal, Check } from 'lucide-react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../Components/ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../Components/ui/popover'
import { ResumeDialog } from '../Components'
import { toast } from 'sonner'
import { fetch_users_by_userid, get_all_job_applications_by_job, update_application_status } from '../api'
import { useRecruiterOnly, useToastDismiss } from '../Hooks'

const shortlistingStatus = ['In-review', 'Accepted', 'Rejected'];

export function JobApplications() {
    useRecruiterOnly()
    useToastDismiss()

    const { jobid } = useParams()
    const [applications, setApplications] = useState([])
    const [applicants, setApplicants] = useState({})
    const [openResume, setOpenResume] = useState(false)
    const [resume, setResume] = useState('')

    useEffect(() => {
        const onFirstLoad = async () => {
            try {
                const applications = await get_all_job_applications_by_job({ jobid, fields: '-compnayid -recruiterid -updatedAt' })

                const applicantids = applications.map(application => application.applicantid)
                const applicants = await fetch_users_by_userid({ userids: applicantids, fields: 'fullname email phonenumber resume' })

                setApplications(applications)
                setApplicants(applicants)
            }
            catch ({ message }) {
                toast.error(message)

                console.error(message)
            }
        }

        const timeOut = setTimeout(onFirstLoad, 150)
        return () => clearTimeout(timeOut)
    }, [jobid])

    const onOpenResume = (e, resume) => {
        e.preventDefault()

        setResume(resume)
        setOpenResume(true)

        return false
    }

    const onUpdateStatus = async (applicationid, status) => {
        try {
            const application = await update_application_status({ applicationid, status })

            const applicationIndex = applications.findIndex((application) => application.applicationid == applicationid)

            const newApplications = [...applications]
            newApplications[applicationIndex] = application

            setApplications(newApplications)

            toast.success('Application status ' + application.status)
        }
        catch ({ message }) {
            toast.error(message)

            console.error(message)
        }
    }

    return (
        <>
            <ResumeDialog open={openResume} setOpen={setOpenResume} resume={resume} />
            <div className='max-w-7xl grow'>
                <h1 className='font-bold text-xl my-5'>Applicants {applications?.length}</h1>
                <div>
                    <Table>
                        <TableCaption>A list of your recent applied user</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>FullName</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Resume</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                applications?.map((application) => (
                                    <tr key={application.applicationid}>
                                        <TableCell>{applicants[application.applicantid]?.fullname}</TableCell>
                                        <TableCell>{applicants[application.applicantid]?.email}</TableCell>
                                        <TableCell>{applicants[application.applicantid]?.phonenumber}</TableCell>
                                        <TableCell >
                                            {
                                                applicants[application.applicantid]?.profile?.resume ?
                                                    <a
                                                        className="text-blue-600 cursor-pointer"
                                                        onClick={(e) => onOpenResume(e, applicants[application.applicantid]?.profile?.resume)}>
                                                        {applicants[application.applicantid]?.fullname?.split(' ')[0]}.resume
                                                    </a> :
                                                    <span>NA</span>
                                            }
                                        </TableCell>
                                        <TableCell>{application.createdAt?.split("T")[0]}</TableCell>
                                        <TableCell className="float-right cursor-pointer">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <MoreHorizontal />
                                                </PopoverTrigger>
                                                <PopoverContent className="w-32">
                                                    {
                                                        shortlistingStatus.map((status, index) => {
                                                            return (
                                                                <div key={index} onClick={() => onUpdateStatus(application.applicationid, status)} className='flex w-fit items-center my-2 cursor-pointer'>
                                                                    <span>{status}</span>
                                                                    {
                                                                        application.status === status.toLowerCase() && <Check size={20} strokeWidth={0.75} />
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
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
        </>
    )
}

export default JobApplications
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Avatar, { genConfig } from 'react-nice-avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import UpdateDialog from './UpdateDialog.profile'
import ResumeDialog from '../ResumeDialog.component'
import { setProfile } from '../../redux'

export function User() {
    const user = useSelector(state => state.user)
    const profile = useSelector(state => state.profile)
    const [openUserForm, setOpenUserForm] = useState(false)
    const [openResume, setOpenResume] = useState(false)

    const avatarConfig = genConfig(user?.email ? user.email : undefined)

    return (
        <>
            <UpdateDialog open={openUserForm} setOpen={setOpenUserForm} profile={profile || {}} setProfile={setProfile} />
            <ResumeDialog open={openResume} resume={profile?.resume || ''} setOpen={setOpenResume} />
            <div className='self-stretch bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        {user?.email?.length > 0 ? <Avatar className="h-24 w-24 min-h-24 min-w-24" {...avatarConfig} /> : <div className="h-24 w-24"></div>}
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user ? user?.isrecruiter ? 'Recruiter' : (profile?.bio || 'Student') : ''}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpenUserForm(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phonenumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1 flex-wrap'>
                        {
                            user?.isrecruiter ?
                                'Not Applicable' :
                                profile?.skills?.map((skill) => <Badge key={skill}>{skill}</Badge>)
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.isrecruiter ?
                            'Not Applicable' :
                            profile?.resume ?
                                <a onClick={() => setOpenResume(true)} className='text-blue-500 w-full hover:underline cursor-pointer'>
                                    {user?.fullname?.split(' ')[0]}.resume
                                </a>
                                : <span>Not Found</span>
                    }
                </div>
            </div>
        </>
    )
}

export default User
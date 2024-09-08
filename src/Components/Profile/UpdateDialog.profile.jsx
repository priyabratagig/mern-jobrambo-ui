import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { update_user } from '../../api'
import { setUser } from '../../redux'

export function UpdateDialog({ open, setOpen, profile, setProfile }) {
    const user = useSelector(state => state.user)
    const [fullname, setFullname] = useState(user?.fullname)
    const [email, setEmail] = useState(user?.email)
    const [phonenumber, setPhonenumber] = useState(user?.phonenumber)
    const [bio, setBio] = useState(profile?.bio)
    const [skills, setSkills] = useState(profile?.skills?.join(', '))
    const [resume, setResume] = useState(profile?.resume)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setFullname(user?.fullname)
        setEmail(user?.email)
        setPhonenumber(user?.phonenumber)
        setBio(profile?.bio)
        setSkills(profile?.skills?.join(', '))
        setResume(profile?.resume)
    }, [user, profile])

    const onSubmit = (e) => {
        e.preventDefault()
        return false
    }

    const onUpdate = async () => {
        setLoading(true)

        const userInfo = {
            userid: user?.userid,
            isrecruiter: user?.isrecruiter,
            fullname,
            phonenumber,
            email,
            bio,
            skills: skills?.split(/\s*,\s*/),
            resume
        }

        try {
            const updatedUserInfo = await update_user(userInfo)

            toast.success('Profile updated')

            const { profile, ...newUserInfo } = updatedUserInfo

            setUser({ ...user, ...newUserInfo })
            setProfile(profile)

            setOpen(false)
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
        <div>
            <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={fullname}
                                    onChange={({ target }) => setFullname(target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={({ target }) => setEmail(target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input
                                    id="number"
                                    name="number"
                                    value={phonenumber}
                                    onChange={({ target }) => setPhonenumber(target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={bio}
                                    onChange={({ target }) => setBio(target.value)}
                                    className="col-span-3"
                                    disabled={user?.isrecruiter == true}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={skills}
                                    onChange={({ target }) => setSkills(target.value)}
                                    className="col-span-3"
                                    disabled={user?.isrecruiter == true}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    file={typeof resume === 'object' && resume}
                                    onChange={({ target }) => setResume(target.files[0])}
                                    className="col-span-3"
                                    disabled={user?.isrecruiter == true}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ?
                                    <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                                    <Button className="w-full my-4" onClick={onUpdate}>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

UpdateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,

    profile: PropTypes.oneOfType([
        PropTypes.exact({}).isRequired,
        PropTypes.shape({
            profileid: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            skills: PropTypes.arrayOf(PropTypes.string).isRequired,
            resume: PropTypes.string.isRequired
        })
    ]).isRequired,

    setProfile: PropTypes.func.isRequired
}

export default UpdateDialog
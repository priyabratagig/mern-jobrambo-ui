import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Activity, LogOut, User2 } from 'lucide-react'
import Avatar, { genConfig } from 'react-nice-avatar'
import { BROWSE, COMPANIES, DASHBOARD, HOME, JOB_LISTING, JOBS, LOGIN, SIGNUP } from '../configs'
import { logout } from '../api'
import { resetManagingCompanies, resetManagingJobs, resetProfile, resetUser } from '../redux'

export const Navbar = memo(function Navbar() {
    const user = useSelector(state => state.user)
    const bio = useSelector(state => state.profile?.bio)

    const navgate = useNavigate()

    const avatarConfig = genConfig(user?.email ? user.email : undefined)

    const onLogut = async () => {
        try {
            await logout()

            resetUser()
            resetProfile()
            resetManagingJobs()
            resetManagingCompanies()

            navgate(HOME)
        }
        catch ({ message }) {
            toast.error(message)

            console.error(message)
        }
    }

    return (
        <div className='bg-white mx-[-1rem]'>
            <nav className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <section>
                    <Link to={HOME}><h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Rambo</span></h1></Link>
                </section>
                <section className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user?.isrecruiter ? (
                                <>
                                    <li><Link to={COMPANIES}>Companies</Link></li>
                                    <li><Link to={JOB_LISTING}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to={HOME}>Home</Link></li>
                                    <li><Link to={JOBS}>Jobs</Link></li>
                                    <li><Link to={BROWSE}>Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user?.email ? (
                            <div className='flex items-center gap-2'>
                                <Link to={LOGIN}><Button variant="outline">Login</Button></Link>
                                <Link to={SIGNUP}><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    {user?.email?.length > 0 && <Avatar className="h-12 w-12 cursor-pointer" {...avatarConfig} />}
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            {user?.email?.length > 0 && <Avatar className="h-12 w-12 cursor-pointer" {...avatarConfig} />}
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{bio ? bio : user?.isrecruiter ? 'Recruiter' : 'Student'}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                            </div>
                                            {
                                                user?.isrecruiter && <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <Activity />
                                                    <Button variant="link"><a href={DASHBOARD}>Dashboard</a></Button>
                                                </div>
                                            }
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={onLogut} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </section>
            </nav>
        </div>
    )
})

export default Navbar
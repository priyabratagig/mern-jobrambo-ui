import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Label } from '../Components/ui/label'
import { Input } from '../Components/ui/input'
import { RadioGroup } from '../Components/ui/radio-group'
import { Button } from '../Components/ui/button'
import { Loader2 } from 'lucide-react'
import { LOGIN } from '../configs'
import { register } from '../api'
import { setUser } from '../redux'
import { usePublicOnly } from '../Hooks'
import { useEffect } from 'react'

export function SignUp() {
    usePublicOnly()

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [password, setPassword] = useState('')
    const [isrecruiter, setIsrecruiter] = useState(false)
    const [resume, setResume] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        return false
    }

    useEffect(() => {
        if (isrecruiter) setResume('')
    }, [isrecruiter])

    const onRegister = async () => {
        setLoading(true)

        const userInfo = {
            isrecruiter,
            fullname,
            phonenumber,
            email,
            password,
            resume
        }

        try {
            const newUser = await register(userInfo)

            toast.success('Welcome to JobRambo')

            setUser(newUser)
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
        <div className='flex items-center justify-center max-w-7xl'>
            <form onSubmit={onSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                <div className='my-2'>
                    <Label>Full Name</Label>
                    <Input
                        type="text"
                        value={fullname}
                        name="fullname"
                        onChange={({ target }) => setFullname(target.value)}
                        placeholder="Jhon Doe"
                    />
                </div>
                <div className='my-2'>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        name="email"
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="jhondoe@gmail.com"
                    />
                </div>
                <div className='my-2'>
                    <Label>Phone Number</Label>
                    <Input
                        type="text"
                        value={phonenumber}
                        name="phonenumber"
                        onChange={({ target }) => setPhonenumber(target.value)}
                        placeholder="phone number"
                    />
                </div>
                <div className='my-2'>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="*********"
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <RadioGroup className="flex items-center gap-4 my-5">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={!isrecruiter}
                                onChange={({ target }) => setIsrecruiter(!target.checked)}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="r1">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={isrecruiter}
                                onChange={({ target }) => setIsrecruiter(!!target.checked)}
                                className="cursor-pointer"
                            />
                            <Label htmlFor="r2">Recruiter</Label>
                        </div>
                    </RadioGroup>
                    <div className='flex items-center gap-2'>
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            file={resume && resume}
                            onChange={({ target }) => setResume(target.files[0])}
                            className="cursor-pointer"
                            disabled={isrecruiter}
                        />
                    </div>
                </div>
                {
                    loading ?
                        <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                        <Button onClick={onRegister} className="w-full my-4">Signup</Button>
                }
                <span className='text-sm'>Already have an account? <Link to={LOGIN} className='text-blue-600'>Login</Link></span>
            </form>
        </div>
    )
}

export default SignUp
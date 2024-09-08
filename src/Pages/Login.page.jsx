import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Label } from '../Components/ui/label'
import { Input } from '../Components/ui/input'
import { RadioGroup } from '../Components/ui/radio-group'
import { Button } from '../Components/ui/button'
import { Loader2 } from 'lucide-react'
import { login } from '../api'
import { FORGOT_PASSWORD, SIGNUP } from '../configs'
import { setUser } from '../redux'
import { usePublicOnly } from '../Hooks'

export function Login() {
    usePublicOnly()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isrecruiter, setIsrecruiter] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        return false
    }

    const onLogin = async () => {
        setLoading(true)

        const userInfo = {
            email,
            password
        }

        try {
            const user = await login(userInfo)

            toast.success('Logged in')

            setUser(user)
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
        <div className='flex items-center justify-center max-w-7xl grow'>
            <form onSubmit={onSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Login</h1>
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
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="********"
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
                </div>
                {
                    loading ?
                        <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                        <Button type="button" onClick={onLogin} className="w-full my-4">Login</Button>
                }
                <div><span className='text-sm'>Don&apos;t have an account? <Link to={SIGNUP} className='text-blue-600'>Signup</Link></span></div>
                <div><span className='text-sm'>Forget password? <Link to={FORGOT_PASSWORD} className='text-blue-600'>Reset</Link></span></div>
            </form>
        </div>
    )
}

export default Login
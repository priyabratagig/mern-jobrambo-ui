import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Label } from '../Components/ui/label'
import { Input } from '../Components/ui/input'
import { Button } from '../Components/ui/button'
import { Loader2 } from 'lucide-react'
import { LOGIN } from '../configs'
import { usePublicOnly } from '../Hooks'
import { forgot_password } from '../api'
import { setUser } from '../redux'
import { toast } from 'sonner'

export function ForgotPassWord() {
    usePublicOnly()

    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        return false
    }

    const onUpdatePassword = async () => {
        setLoading(true)

        const userInfo = {
            email,
            phonenumber,
            password,
            confirmPassword
        }

        try {
            const newUser = await forgot_password(userInfo)

            setUser(newUser)

            toast.success('Password reseted')
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
                <h1 className='font-bold text-xl mb-5'>Forgot Password</h1>
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
                    <Label>New Password</Label>
                    <Input
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="********"
                    />
                </div>

                <div className='my-2'>
                    <Label>Confirm Password</Label>
                    <Input
                        type="text"
                        value={confirmPassword}
                        name="confirm-password"
                        onChange={({ target }) => setConfirmPassword(target.value)}
                        placeholder="********"
                    />
                </div>
                {
                    loading ?
                        <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                        <Button type="button" onClick={onUpdatePassword} className="w-full my-4">Login</Button>
                }
                <span className='text-sm'>Remember password? <Link to={LOGIN} className='text-blue-600'>Login</Link></span>
            </form>
        </div>
    )
}

export default ForgotPassWord
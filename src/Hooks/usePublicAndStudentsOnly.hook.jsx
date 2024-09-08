import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { HOME, LOGIN } from '../configs'
import { toast } from 'sonner'
import { resetUser } from '../redux'
import useDidUpdateEffect from './useDidUpdateEffect.hook'

export function usePublicAndStudentsOnly() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user !== null && user?.email && !user?.access) {
            toast.error('User access not found, please re-loging')
            resetUser()
            navigate(LOGIN)
            return undefined
        }

        if (user?.access?.isadmin == true) {
            toast.error('Not allowed to access this page')
            navigate(HOME)
            return undefined
        }

        if (user !== null && user?.isrecruiter == true) {
            toast.error('Not allowed to access this page')
            navigate(HOME)
            return undefined
        }
    }, [])

    useDidUpdateEffect(() => {
        if (user?.email && !user?.access) {
            toast.error('User access not found, please re-loging')
            resetUser()
            navigate(LOGIN)
            return undefined
        }

        if (user?.access?.isadmin == true) {
            toast.error('Not allowed to access this page')
            navigate(HOME)
            return undefined
        }

        if (user?.isrecruiter == true) {
            toast.error('Not allowed to access this page')
            navigate(HOME)
            return undefined
        }
    }, [user, navigate])

    return undefined
}


export default usePublicAndStudentsOnly
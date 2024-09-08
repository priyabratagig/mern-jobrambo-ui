import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { HOME } from '../configs'

export function usePublicOnly() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user != null && user?.email) {
            navigate(HOME)
            return undefined
        }
    }, [user, navigate])

    return undefined
}


export default usePublicOnly
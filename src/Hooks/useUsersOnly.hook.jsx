import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import useDidUpdateEffect from './useDidUpdateEffect.hook'
import { HOME } from '../configs'

export function useUsersOnly() {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user == null) return undefined
        if (!user?.email || user?.email?.length == 0) {
            navigate(HOME)
            return undefined
        }
    }, [user, navigate])

    useDidUpdateEffect(() => {
        if (user == null || !user?.email || user?.email?.length == 0) {
            navigate(HOME)
            return undefined
        }
    }, [user, navigate])

    return undefined
}


export default useUsersOnly
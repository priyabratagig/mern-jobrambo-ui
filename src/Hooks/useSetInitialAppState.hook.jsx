import { useCallback, useEffect } from "react"
import { get_all_companies_by_recruiter, get_all_jobs_by_recruiter, get_loggedin_user, get_user_profile } from "../api"
import { setManagingCompanies, setManagingJobs, setProfile, setUser } from "../redux"
import { toast } from "sonner"
import { useSelector } from "react-redux"

export function useSetInitialAppState() {
    const user = useSelector(state => state.user)

    const onFirstLoad_SetUser = useCallback(async () => {
        try {
            const user = await get_loggedin_user()

            setUser(user)
        }
        catch ({ message }) {
            toast.error(message)

            console.error(message)
        }
    }, [])

    const onFirstLoad_SetProfile = useCallback(async () => {
        try {
            const profile = await get_user_profile()

            setProfile(profile)
        }
        catch ({ message }) {
            toast.error(message)

            console.error(message)
        }
    }, [])

    const onFirstLoad_SetManagingCompanies = useCallback(async () => {
        try {
            const managingCompanies = await get_all_companies_by_recruiter()

            setManagingCompanies(managingCompanies)
        }
        catch ({ message }) {
            toast.error(message)

            console.error(message)
        }
    }, [])

    const onFirstLoad_SetManagingJobs = useCallback(async () => {
        try {
            const managingJobs = await get_all_jobs_by_recruiter()

            setManagingJobs(managingJobs)
        }
        catch ({ message }) {
            toast.error(message)

            console.error(message)
        }
    }, [])

    useEffect(() => {
        let timeOut = undefined
        if (user == null) timeOut = setTimeout(onFirstLoad_SetUser, 150)

        return () => clearTimeout(timeOut)
    }, [user, onFirstLoad_SetUser])

    useEffect(() => {
        if (!user?.email) return undefined
        if (user?.isrecruiter == true) return undefined

        const timeOut = setTimeout(onFirstLoad_SetProfile, 150)
        return () => clearTimeout(timeOut)
    }, [user, onFirstLoad_SetProfile])

    useEffect(() => {
        let timeOut = undefined
        if (user?.isrecruiter == true)
            timeOut = setTimeout(onFirstLoad_SetManagingCompanies, 150)

        return () => clearTimeout(timeOut)
    }, [user, onFirstLoad_SetManagingCompanies])

    useEffect(() => {
        let timeOut = undefined
        if (user?.isrecruiter == true)
            timeOut = setTimeout(onFirstLoad_SetManagingJobs, 150)

        return () => clearTimeout(timeOut)
    }, [user, onFirstLoad_SetManagingJobs])

    return undefined
}

export default useSetInitialAppState
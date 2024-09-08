import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { JobCard } from '../Components'
import { fetch_companies_by_ids, get_all_jobs, get_jobs_count } from '../api'
import { resetAllCompanies, resetAllJobs, setAllCompanies, setAllJobs } from '../redux'
import { usePublicAndStudentsOnly, useToastDismiss } from '../Hooks'
import Toast from '../toast'

export function Browse() {
    const query = useSelector(state => state.query)
    const allJobs = useSelector(state => state.jobs.allJobs)
    const [count, setCount] = useState(0)
    const currentToast = useRef(null)

    usePublicAndStudentsOnly()
    useToastDismiss(currentToast)

    useEffect(() => {
        resetAllJobs()
        resetAllCompanies()
    }, [])

    useEffect(() => {
        const onLoadSearch = async () => {
            currentToast.current = new Toast('... Loading jobs')
            try {
                let additionalFilters = null
                if (query?.search) {
                    const searchStringParsed = query.search?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') || ''
                    additionalFilters = JSON.stringify({
                        $or: [
                            { title: { $regex: searchStringParsed, $options: 'i' } },
                            { description: { $regex: searchStringParsed, $options: 'i' } }
                        ]
                    })
                }
                else if (query?.cat) additionalFilters = JSON.stringify({
                    $or: [
                        { title: { $regex: query.cat, $options: 'i' } },
                        { description: { $regex: query.cat, $options: 'i' } }
                    ]
                })
                else additionalFilters = JSON.stringify({})
                const count = await get_jobs_count({ additionalFilters })

                if (count < 1) {
                    setCount(0)

                    currentToast.current.succes('No jobs found')

                    return undefined
                }
                else {
                    currentToast.current.message('Found ' + count + ' jobs')
                }

                const jobs = await get_all_jobs({ additionalFilters, fields: '', limit: 6, skip: 0, sort: '-createdAt' })

                const companyids = Object.keys(Object.keys(jobs).reduce((companyIdsDict, jobid) => {
                    companyIdsDict[jobs[jobid].companyid] = true
                    return companyIdsDict
                }, {}))

                const companies = await fetch_companies_by_ids({ companyids, fields: 'name logo' })

                setCount(count)
                setAllJobs(jobs)
                setAllCompanies(companies)

                currentToast.current.succes()
            }
            catch ({ message }) {
                currentToast.current.error(message)

                console.error(message)
            }
        }

        const timeOut = setTimeout(onLoadSearch, 150)
        return () => clearTimeout(timeOut)
    }, [query])

    return (
        <div className='max-w-7xl grow'>
            <h1 className='font-bold text-xl my-10'>Search Results ({count})</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    Object.keys(allJobs).map((jobid) => {
                        return (
                            <JobCard lg key={jobid} jobid={jobid} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Browse
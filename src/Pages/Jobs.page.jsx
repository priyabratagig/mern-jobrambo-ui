import { useCallback, useEffect, useRef, useState } from 'react'
import { Filter, JobCard } from '../Components'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { resetAllJobs, setAllCompanies, setAllJobs, resetAllCompanies } from '../redux'
import { useDidUpdateEffect, usePublicAndStudentsOnly, useToastDismiss } from '../Hooks'
import { get_all_jobs, fetch_companies_by_ids } from '../api'
import { Toast } from '../toast'

export function Jobs() {
    const allJobs = useSelector(state => state.jobs.allJobs)
    const allCompanies = useSelector(state => state.companies.allCompanies)
    const [filters, setFilters] = useState({})
    const skip = useRef(0)
    const limit = useRef(10)

    const loadMore = useRef(true)
    const currentstate = useRef({ allJobs, allCompanies })
    const currentToast = useRef(null)

    usePublicAndStudentsOnly()
    useToastDismiss(currentToast)

    useEffect(() => {
        resetAllJobs()
        resetAllCompanies()
    }, [])

    useEffect(() => {
        currentstate.current = { allJobs, allCompanies }
    }, [allJobs, allCompanies])

    useDidUpdateEffect(() => {
        if (filters) {
            loadMore.current = true
            skip.current = 0
            resetAllJobs()
            resetAllCompanies()
        }
    }, [filters])

    const getJobs = useCallback(async () => {
        if (!loadMore.current) return false
        currentToast.current = new Toast('... Loding jobs')

        try {
            const { allJobs, allCompanies } = currentstate.current

            const additionalFilters = JSON.stringify(filters)
            const jobs = await get_all_jobs({ fields: '', skip: skip.current, limit: limit.current, sort: '-createdAt', additionalFilters })

            const jobids = Object.keys(jobs || {})
            const numberOfJobs = jobids.length
            const previousNumberofJobs = Object.keys(allJobs).length

            if (numberOfJobs > 0) {
                if (numberOfJobs < limit.current) {
                    loadMore.current = false

                    currentToast.current.message('You have reached to the end')
                }
                else {
                    currentToast.current.message('Scroll to load')
                }
            }
            else {
                if (previousNumberofJobs + numberOfJobs < 1) {
                    currentToast.current.succes('No jobs found')
                }
                else currentToast.current.succes('You have reached to the end')

                loadMore.current = false
                return undefined
            }

            const companyids = Object.keys(jobids.reduce((companyIdsDict, jobid) => {
                companyIdsDict[jobs[jobid].companyid] = true
                return companyIdsDict
            }, {}))

            const companies = await fetch_companies_by_ids({ companyids, fields: 'name logo' })

            setAllJobs({ ...allJobs, ...jobs })
            setAllCompanies({ ...allCompanies, ...companies })
            skip.current = skip.current + limit.current

            currentToast.current.succes()
        }
        catch ({ message }) {
            currentToast.current.error(message)

            console.error(message)
        }
    }, [filters])

    useEffect(() => {
        const timeOut = setTimeout(getJobs, 150)
        return () => clearTimeout(timeOut)
    }, [getJobs])

    const timeOut = useRef(undefined)
    const onScroll = ({ target: element }) => {
        const scrollPosition = element.scrollTop + element.clientHeight
        const scrollableHeight = element.scrollHeight

        if (scrollPosition >= scrollableHeight - 20 && !timeOut.current) {
            timeOut.current = setTimeout(async () => {
                await getJobs()
                timeOut.current = undefined
            }, 150)
        }
    }

    const allJobids = Object.keys(allJobs)

    return (
        <div className='max-w-7xl mt-5 grow'>
            <div className='flex gap-5'>
                <div className='w-20%'>
                    <Filter setFilter={setFilters} />
                </div>
                {
                    allJobids.length < 1 ? <span>No Jobs found</span> : (
                        <div className='flex-1 h-[80vh] overflow-y-auto pb-5' onScroll={onScroll}>
                            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {
                                    allJobids.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job}
                                        >
                                            <JobCard lg jobid={job} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Jobs
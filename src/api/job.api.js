import request, { arrayToObjetByKey } from './config.api'
import { GET_ALL_JOBS, CREATE_JOB, UPDATE_JOB, GET_ALL_JOBS_BY_RECRUITER, FETCH_JOBS_BY_IDS, GET_JOBS_COUNT } from './routes.api'

export const create_job = async ({ title, description, requirements, salary, location, type, experience, positions, companyid }) => {
    if (!title?.length || !(/.{3,100}/i.test(title))) throw new Error('title invalid')
    if (!description?.length || !(/.{5,200}/i.test(description))) throw new Error('description invalid')
    if (!requirements?.length || !(/.{2,100}/i.test(requirements))) throw new Error('requirements invalid')
    if (!['number', 'string'].includes(typeof salary) || !(/[1-9]\d{0,2}/i.test(salary))) throw new Error('salary invalid')
    if (!location?.length || !(/[\w\d\s,.~()-_+/|:;"']{2,200}/i.test(location))) throw new Error('location invalid')
    if (!type?.length || !(/\w{4,20}/i.test(type))) throw new Error('type invalid')
    if (!['number', 'string'].includes(typeof experience) || !(/\d{1,2}/i.test(experience))) throw new Error('experience invalid')
    if (!['number', 'string'].includes(typeof positions) || !(/[1-9]\d{0,3}/i.test(positions))) throw new Error('positions invalid')
    if (!companyid?.length || !(/^[a-f\d]{24}$/i.test(companyid))) throw new Error('companyid invalid')

    const reqConfig = {
        method: 'POST',
        url: CREATE_JOB,
        data: {
            jobInfo: {
                title,
                description,
                requirements,
                salary,
                location,
                type,
                experience,
                positions,
                companyid
            }
        }
    }

    const data = await request(reqConfig)

    return data.job
}

export const update_job = async ({ jobid, title, description, requirements, salary, location, type, experience, positions }) => {
    if (!jobid?.length || !(/^[a-f\d]{24}$/i.test(jobid))) throw new Error('jobid invalid')
    if (!title?.length || !(/.{3,100}/i.test(title))) throw new Error('title invalid')
    if (!description?.length || !(/.{5,200}/i.test(description))) throw new Error('description invalid')
    if (!requirements?.length || !(/.{2,100}/i.test(requirements))) throw new Error('requirements invalid')
    if (!['number', 'string'].includes(typeof salary) || !(/[1-9]\d{0,2}/i.test(salary))) throw new Error('salary invalid')
    if (!location?.length || !(/[\w\d\s,.~()-_+/|:;"']{3,200}/i.test(location))) throw new Error('location invalid')
    if (!type?.length || !(/\w{4,20}/i.test(type))) throw new Error('type invalid')
    if (!['number', 'string'].includes(typeof experience) || !(/\d{1,2}/i.test(experience))) throw new Error('experience invalid')
    if (!['number', 'string'].includes(typeof positions) || !(/[1-9]\d{0,3}/i.test(positions))) throw new Error('positions invalid')

    const reqConfig = {
        method: 'PUT',
        url: UPDATE_JOB,
        data: {
            jobInfo: {
                jobid,
                title,
                description,
                requirements,
                salary,
                location,
                type,
                experience,
                positions
            }
        }
    }

    const data = await request(reqConfig)

    return data.job
}

export const get_all_jobs_by_recruiter = async () => {
    const reqConfig = {
        method: 'GET',
        url: GET_ALL_JOBS_BY_RECRUITER,
    }

    const data = await request(reqConfig)

    return arrayToObjetByKey(data.jobs, 'jobid')
}

export const get_all_jobs = async ({ fields, sort, limit, skip, additionalFilters }) => {
    if (!['string', 'object'].includes(typeof fields)) throw new Error('fields required')
    if (!['string', 'object'].includes(typeof sort)) throw new Error('sort required')
    if (!['number', 'string'].includes(typeof limit) || !(/\d+/i.test(limit))) throw new Error('limit invalid')
    if (skip !== undefined && (!['number', 'string'].includes(typeof skip) || !(/\d+/i.test(skip)))) throw new Error('skip invalid')
    if (additionalFilters !== undefined && !(/.{2,}/.test(additionalFilters))) throw new Error('additionalFilters invalid')

    const reqConfig = {
        method: 'GET',
        url: GET_ALL_JOBS,
        params: {
            fields,
            sort,
            limit,
            ...(skip !== undefined ? { skip } : {}),
            ...(additionalFilters !== undefined ? { additionalFilters } : {})
        }
    }

    const data = await request(reqConfig)

    return arrayToObjetByKey(data.jobs, 'jobid')
}

export const fetch_jobs_by_jobids = async ({ jobids, fields }) => {
    if (!(jobids instanceof Array) || jobids.some(jobid => !(/^[a-f\d]{24}$/i.test(jobid)))) throw new Error('jobids invalid')
    if (!(['string', 'object'].includes(typeof fields))) throw new Error('fiels invalid')

    const reqConfig = {
        method: 'POST',
        url: FETCH_JOBS_BY_IDS,
        data: {
            jobids,
            fields
        }
    }

    const data = await request(reqConfig)

    return arrayToObjetByKey(data.jobs, 'jobid')
}

export const get_jobs_count = async ({ additionalFilters }) => {
    if (additionalFilters !== undefined && !(/.{2,}/.test(additionalFilters))) throw new Error('additionalFilters invalid')

    const reqConfig = {
        method: 'GET',
        url: GET_JOBS_COUNT,
        params: {
            ...(additionalFilters !== undefined ? { additionalFilters } : {})
        }
    }

    const data = await request(reqConfig)

    return data.count
}
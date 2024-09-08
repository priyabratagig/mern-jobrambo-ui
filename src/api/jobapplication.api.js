import axios from "axios"
import request from "./config.api"
import { API_ROOT, APPLY_JOB, GET_ALL_APPLICATIONS_BY_APPLICANT, GET_ALL_APPLICATIONS_BY_JOB, GET_APPLICATION, GET_APPLICATIONS_COUNT_BY_JOB, UPDATE_APPLICATION_STATUS } from "./routes.api"

export const apply_job = async ({ jobid, companyid, recruiterid }) => {
    if (!jobid?.length || !(/^[a-f\d]{24}$/i.test(jobid))) throw new Error('jobid invalid')
    if (!companyid?.length || !(/^[a-f\d]{24}$/i.test(companyid))) throw new Error('companyid invalid')
    if (!recruiterid?.length || !(/^[a-f\d]{24}$/i.test(recruiterid))) throw new Error('recruiterid invalid')

    const reqConfig = {
        method: 'POST',
        baseURL: API_ROOT,
        url: APPLY_JOB,
        withCredentials: true,
        data: {
            applicationInfo: {
                jobid,
                companyid,
                recruiterid
            }
        }
    }

    try {
        const res = await axios(reqConfig)

        return res.data.application
    }
    catch (err) {
        if (err.response.status === 401) return Promise.reject({ status: 401, message: 'unauthorized access' })

        return Promise.reject(err.response?.data?.message ? err.response.data : err)
    }
}

export const get_job_application = async ({ jobid, fields }) => {
    if (!jobid?.length || !(/^[a-f\d]{24}$/i.test(jobid))) throw new Error('jobid invalid')
    if (!['string', 'object'].includes(typeof fields)) throw new Error('fields invalid')

    const reqConfig = {
        method: 'GET',
        baseURL: API_ROOT,
        url: GET_APPLICATION,
        withCredentials: true,
        params: {
            jobid,
            fields
        }
    }

    try {
        const res = await axios(reqConfig)

        return res.data.application
    }
    catch (err) {
        if (err.response.status === 401) return null

        return Promise.reject(err.response?.data?.message ? err.response.data : err)
    }
}

export const get_job_application_by_applicant = async ({ fields }) => {
    if (!['string', 'object'].includes(typeof fields)) throw new Error('fields invalid')

    const reqConfig = {
        method: 'GET',
        url: GET_ALL_APPLICATIONS_BY_APPLICANT,
        params: {
            fields
        }
    }

    const data = await request(reqConfig)

    return data.applications
}

export const get_all_job_applications_by_job = async ({ jobid, fields }) => {
    if (!jobid?.length || !(/^[a-f\d]{24}$/i.test(jobid))) throw new Error('jobid invalid')
    if (!['string', 'object'].includes(typeof fields)) throw new Error('fields invalid')

    const reqConfig = {
        url: GET_ALL_APPLICATIONS_BY_JOB,
        params: {
            jobid,
            fields
        }
    }

    const data = await request(reqConfig)

    return data.applications
}

export const get_applications_count_by_job = async ({ jobid }) => {
    if (!(/^[a-f\d]{24}$/i.test(jobid))) throw new Error('jobid invalid')

    const reqConfig = {
        url: GET_APPLICATIONS_COUNT_BY_JOB,
        params: {
            jobid
        }
    }

    const data = await request(reqConfig)

    return data.count
}

export const update_application_status = async ({ applicationid, status }) => {
    if (!(/^[a-f\d]{24}$/i.test(applicationid))) throw new Error('applicationid invalid')
    if (!/^accepted|rejected|in-review$/i.test(status)) throw new Error('status invalid')

    const reqConfig = {
        method: 'PUT',
        url: UPDATE_APPLICATION_STATUS,
        data: {
            applicationInfo: {
                applicationid,
                status
            }
        }
    }

    const data = await request(reqConfig)

    return data.application
}
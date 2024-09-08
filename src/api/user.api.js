import axios from 'axios'
import request, { arrayToObjetByKey } from './config.api'
import { API_ROOT, FETCH_USERS_BY_USERID, GET_USER_PROFILE, LOGGEDIN_USER, USER_UPDATE } from './routes.api'

export const get_loggedin_user = async () => {
    try {
        const reqConfig = {
            method: 'GET',
            baseURL: API_ROOT,
            url: LOGGEDIN_USER,
            withCredentials: true
        }

        const res = await axios(reqConfig)

        return res.data.user
    }
    catch (err) {
        if (err.response.status === 401) return {}

        return Promise.reject(err.response?.data?.message ? err.response.data : err)
    }
}

export const fetch_users_by_userid = async ({ userids, fields }) => {
    if (!(userids instanceof Array) || userids.some(userid => !(/^[a-f\d]{24}$/i.test(userid)))) throw new Error('userids invalid')
    if (!(['string', 'object'].includes(typeof fields))) throw new Error('fiels invalid')

    const reqConfig = {
        method: 'POST',
        url: FETCH_USERS_BY_USERID,
        data: {
            userids,
            fields
        }
    }

    const data = await request(reqConfig)

    return arrayToObjetByKey(data.users, 'userid')
}

export const get_user_profile = async () => {
    const reqConfig = {
        url: GET_USER_PROFILE
    }

    const data = await request(reqConfig)

    return data.profile
}

export const update_user = async ({ userid, isrecruiter, fullname, phonenumber, email, bio, skills, resume }) => {
    if (!userid?.length || !(/^[a-f\d]{24}$/i.test(userid))) throw new Error('userid invalid')
    if (!(typeof isrecruiter === 'boolean')) throw new Error('isrecruiter is invalid')
    if (!fullname?.length || !(/\w{2,20}\s\w{2,20}/i.test(fullname))) throw new Error('fullname is invlaid')
    if (!phonenumber?.length || !(/\d{10}/.test(phonenumber))) throw new Error('phonenumber is invalid')
    if (!email?.length || !(/[\w\d]{1,50}@[\w]{2,10}\.(com|in|co\.in)/i.test(email))) throw new Error('email is invalid')

    let resume_base64 = ''
    if (!isrecruiter) {
        if (!bio?.length || !(/.{3,200}/.test(bio))) throw new Error('bio invalid')
        if (!(skills instanceof Array) || (skills.some(skill => !(/.{1,10}/.test(skill))))) throw new Error('skills invalid')

        if ((resume instanceof File)) {
            if (!resume.type.startsWith('data:image/')) throw new Error('resume is invalid')
            if (!(resume.size < 1048576)) throw new Error('resume size exceeds')


            resume_base64 = isrecruiter || await new Promise((resolve, reject) => {
                const reader = new FileReader()

                reader.onloadend = () => {
                    const base64String = reader.result
                    resolve(base64String)
                }

                reader.onerror = (error) => {
                    reject(error)
                }

                reader.readAsDataURL(resume)
            })
        }
        else if (!resume.startsWith('data:image/')) throw new Error('resume invlaid')
        else resume_base64 = resume
    }

    const reqConfig = {
        method: 'PUT',
        url: USER_UPDATE,
        data: {
            userInfo: {
                userid,
                fullname,
                phonenumber,
                email,
                profile: {
                    bio,
                    skills,
                    resume: resume_base64
                }
            }
        }
    }

    const data = await request(reqConfig)

    return data.userInfo
}
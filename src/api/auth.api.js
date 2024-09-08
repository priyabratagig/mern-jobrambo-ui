import request from './config.api'
import { FORGOT_PASSWORD, LOGIN, LOGOUT, REGISTER } from './routes.api'

export const login = async ({ email, password }) => {
    if (!email?.length || email.length < 1) throw new Error('email required')
    if (!password?.length || password.length < 1) throw new Error('password required')

    const reqConfig = {
        method: 'POST',
        url: LOGIN,
        data: {
            userInfo: {
                email,
                password
            }
        }
    }

    const data = await request(reqConfig)

    return data.user
}

export const logout = async () => {
    const reqConfig = {
        method: 'GET',
        url: LOGOUT
    }

    const data = await request(reqConfig)

    return data.user
}

export const register = async ({ isrecruiter, fullname, phonenumber, email, password, resume }) => {
    if (!(typeof isrecruiter === 'boolean')) throw new Error('isrecruiter is invalid')
    if (!fullname?.length || !(/\w{2,20}\s\w{2,20}/i.test(fullname))) throw new Error('fullname is invlaid')
    if (!phonenumber?.length || !(/\d{10}/.test(phonenumber))) throw new Error('phonenumber is invalid')
    if (!email?.length || !(/[\w\d]{1,50}@[\w]{2,10}\.(com|in|co\.in)/i.test(email))) throw new Error('email is invalid')
    if (!password?.length || !(/[\w\d+~!@#$^&*-]{8,50}/i.test(password))) throw new Error('password is invalid')

    let resume_base64 = ''
    if (!isrecruiter) {
        if (!(resume instanceof File)) throw new Error('resume invalid')
        if (!resume.type.startsWith('image/')) throw new Error('resume is invalid')
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

    const reqConfig = {
        method: 'POST',
        url: REGISTER,
        data: {
            userInfo: {
                isrecruiter,
                fullname,
                phonenumber,
                email,
                password,
                ...(isrecruiter ? {} : { profile: { resume: resume_base64 } })
            }
        }
    }

    const data = await request(reqConfig)

    return data.user
}

export const forgot_password = async ({ email, phonenumber, password, confirmPassword }) => {
    if (!email?.length || !(/[\w\d]{1,50}@[\w]{2,10}\.(com|in|co\.in)/i.test(email))) throw new Error('email is invalid')
    if (!phonenumber?.length || !(/\d{10}/.test(phonenumber))) throw new Error('phonenumber is invalid')
    if (!password?.length || !(/[\w\d+~!@#$^&*-]{8,50}/i.test(password))) throw new Error('password is invalid')
    if (password !== confirmPassword) throw new Error('Passs didn\'t match')

    const reqConfig = {
        method: 'PUT',
        url: FORGOT_PASSWORD,
        data: {
            userInfo: {
                email,
                phonenumber,
                password
            }
        }
    }

    const data = await request(reqConfig)

    return data.user
}
import request, { arrayToObjetByKey } from './config.api'
import { CREATE_COMPANY, FETCH_COMPANIES_BY_IDS, GET_ALL_COMPANIES_BY_RECRUITER, UPDATE_COMPANY } from './routes.api'

export const create_company = async ({ name, description, website, location, logo }) => {
    if (!name?.length || !(/[\w\s]{3,50}/i.test(name))) throw new Error('name invalid')
    if (!description?.length || !(/[\w\s]{3,200}/i.test(description))) throw new Error('description invalid')
    if (!website?.length || !(/[\w\d.-:#%&_+=?/]{4,100}/i.test(website))) throw new Error('website invalid')
    if (!location?.length || !(/[\w\d\s,.~()-_+/|:;"']{3,200}/i.test(location))) throw new Error('location invalid')

    if (!(logo instanceof File)) throw new Error('logo invalid')
    if (!logo.type.startsWith('image/')) throw new Error('logo is invalid')
    if (!(logo.size < 1048576)) throw new Error('logo size exceeds')

    const logo_base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onloadend = () => {
            const base64String = reader.result
            resolve(base64String)
        }

        reader.onerror = (error) => {
            reject(error)
        }

        reader.readAsDataURL(logo)
    })

    const reqConfig = {
        method: 'POST',
        url: CREATE_COMPANY,
        data: {
            companyInfo: {
                name,
                description,
                website,
                location,
                logo: logo_base64
            }
        }
    }

    const data = await request(reqConfig)

    return data.company
}

export const update_company = async ({ companyid, name, description, website, location, logo }) => {
    if (!companyid?.length || !(/^[a-f\d]{24}$/i.test(companyid))) throw new Error('companyid invalid')
    if (!name?.length || !(/[\w\s]{3,50}/i.test(name))) throw new Error('name invalid')
    if (!description?.length || !(/[\w\s]{3,200}/i.test(description))) throw new Error('description invalid')
    if (!website?.length || !(/[\w\d.-:#%&_+=?/]{4,100}/i.test(website))) throw new Error('website invalid')
    if (!location?.length || !(/[\w\d\s,.~()-_+/|:;"']{3,200}/i.test(location))) throw new Error('location invalid')

    let logo_base64 = undefined
    if (logo instanceof File) {
        if (!logo.type.startsWith('image/')) throw new Error('logo is invalid')
        if (!(logo.size < 1048576)) throw new Error('logo size exceeds')

        logo_base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onloadend = () => {
                const base64String = reader.result
                resolve(base64String)
            }

            reader.onerror = (error) => {
                reject(error)
            }

            reader.readAsDataURL(logo)
        })
    }
    else if (!logo?.length || (/^data:image\/(jpeg|png|gif|bmp|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(logo))) {
        logo_base64 = logo
    }
    else throw new Error('logo invalid')

    const reqConfig = {
        method: 'PUT',
        url: UPDATE_COMPANY,
        data: {
            companyInfo: {
                companyid,
                name,
                description,
                website,
                location,
                logo: logo_base64
            }
        }
    }

    const data = await request(reqConfig)

    return data.company
}

export const get_all_companies_by_recruiter = async () => {
    const reqConfig = {
        method: 'GET',
        url: GET_ALL_COMPANIES_BY_RECRUITER,
    }

    const data = await request(reqConfig)

    return arrayToObjetByKey(data.companies, 'companyid')
}

export const fetch_companies_by_ids = async ({ companyids, fields }) => {
    if (!companyids?.length || !(companyids instanceof Array) || companyids.some(companyid => !(/^[a-f\d]{24}$/i.test(companyid)))) throw new Error('companyids invalid')
    if (!(['string', 'object'].includes(typeof fields))) throw new Error('fiels invalid')

    const reqConfig = {
        method: 'POST',
        url: FETCH_COMPANIES_BY_IDS,
        data: {
            companyids,
            fields
        }
    }

    const data = await request(reqConfig)

    return arrayToObjetByKey(data.companies, 'companyid')
}
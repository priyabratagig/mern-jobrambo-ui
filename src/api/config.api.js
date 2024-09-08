import axios from "axios"
import { API_ROOT } from "./routes.api"

export const request = axios.create({
    baseURL: API_ROOT,
    withCredentials: true
})

request.interceptors.response.use(res => res.data, err => {
    if (err.response.status === 401) {
        window.location.href = '/login'
    }
    return Promise.reject(err.response?.data?.message ? err.response.data : err)
})

export default request

export const arrayToObjetByKey = (arr, key) => arr.reduce((dict, ele, idx) => {
    if (key) dict[ele[key]] = ele
    else dict[idx] = ele

    return dict
}, {}) 
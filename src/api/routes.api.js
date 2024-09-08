export const API_ROOT = import.meta.env.MODE === 'development' ?
    'http://localhost:5000/api/v1' :
    '/api/v1'

export const LOGIN = '/auth/login'
export const LOGOUT = '/auth/logout'
export const REGISTER = '/auth/register'
export const FORGOT_PASSWORD = '/auth/update-password'

export const LOGGEDIN_USER = '/user/loggedin-user'
export const FETCH_USERS_BY_USERID = '/user/fetch-all-users-by-ids'
export const GET_USER_PROFILE = '/user/profile'
export const USER_UPDATE = '/user/update'

export const CREATE_COMPANY = '/company/create'
export const UPDATE_COMPANY = '/company/update'
export const GET_ALL_COMPANIES_BY_RECRUITER = '/company/get-all-companies-by-recruiter'
export const FETCH_COMPANIES_BY_IDS = '/company/fetch-companies-by-ids'

export const CREATE_JOB = '/job/create'
export const UPDATE_JOB = '/job/update'
export const GET_ALL_JOBS_BY_RECRUITER = '/job/get-all-jobs-by-recruiter'
export const GET_ALL_JOBS = '/job/get-all-jobs'
export const FETCH_JOBS_BY_IDS = '/job/fetch-jobs-by-ids'
export const GET_JOBS_COUNT = '/job/get-jobs-count'

export const APPLY_JOB = '/job-application/apply'
export const GET_APPLICATION = '/job-application/get-application'
export const GET_ALL_APPLICATIONS_BY_APPLICANT = '/job-application/by-applicant'
export const GET_ALL_APPLICATIONS_BY_JOB = '/job-application/get-all-applications-by-job'
export const GET_APPLICATIONS_COUNT_BY_JOB = '/job-application/get-job-application-count'
export const UPDATE_APPLICATION_STATUS = '/job-application/update-status'
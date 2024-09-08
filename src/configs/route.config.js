export const HOME = '/home'
export const LOGIN = '/login'
export const SIGNUP = '/signup'
export const FORGOT_PASSWORD = '/forgot-password'
export const BROWSE = '/browse'
export const JOBS = '/jobs'
export const JOB = new String('/job/:jobid'); JOB.url = (id) => `/job/${id}`;
export const PROFILE = '/profile'
export const COMPANIES = '/companies'
export const COMPANY_REGISTER = '/company-new'
export const COMPANY_UPDATE = new String('/company-edit/:companyid'); COMPANY_UPDATE.url = (id) => `/company-edit/${id}`;
export const JOB_LISTING = '/job-listing'
export const JOB_CREATE = '/job-listing/new'
export const JOB_UPDATE = new String('/job-listing/edit/:jobid'); JOB_UPDATE.url = (id) => `/job-listing/edit/${id}`;
export const JOB_APPLICATIONS = new String('/job-listing/applications/:jobid'); JOB_APPLICATIONS.url = (id) => `/job-listing/applications/${id}`;
export const DASHBOARD = '/dashboard'
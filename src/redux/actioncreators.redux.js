import { bindActionCreators } from "@reduxjs/toolkit"
import { dispatch } from "./store.redux"
import { userActions, profileActions, companiesActions, jobsActions, queryActions } from './slices'

export const {
    setUser,
    resetUser,
    setProfile,
    resetProfile,
    setAllCompanies,
    setManagingCompanies,
    resetAllCompanies,
    resetManagingCompanies,
    resetCompanies,
    setAllJobs,
    setManagingJobs,
    resetAllJobs,
    resetManagingJobs,
    resetJobs,
    setQuery,
    resetQuery
} = bindActionCreators({
    ...userActions,
    ...profileActions,
    ...companiesActions,
    ...jobsActions,
    ...queryActions,
}, dispatch)

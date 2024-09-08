import { createSlice } from "@reduxjs/toolkit"

const jobsSlice = createSlice(
    {
        name: "jobs",
        initialState: {
            allJobs: {},
            managingJobs: {}
        },
        reducers: {
            setManagingJobs(state, action) {
                return { ...state, managingJobs: action.payload }
            },
            setAllJobs(state, action) {
                return { ...state, allJobs: action.payload }
            },
            resetManagingJobs(state, action) {
                return { ...state, managingJobs: {} }
            },
            resetAllJobs(state, action) {
                return { ...state, allJobs: {} }
            },
            resetJobs(state, action) {
                return { allJobs: {}, managingJobs: {} }
            }
        }
    }
)

export const jobsReducer = jobsSlice.reducer

export const jobsActions = jobsSlice.actions
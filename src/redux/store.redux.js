import { configureStore } from "@reduxjs/toolkit"
import { companiesReducer, jobsReducer, profileReducer, queryReducer, userReducer } from "./slices"

export const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        companies: companiesReducer,
        jobs: jobsReducer,
        query: queryReducer
    }
})

export default store
export const dispatch = store.dispatch
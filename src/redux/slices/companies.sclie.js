import { createSlice } from "@reduxjs/toolkit"

const companiesSlice = createSlice(
    {
        name: "companies",
        initialState: {
            allCompanies: {},
            managingCompanies: {}
        },
        reducers: {
            setManagingCompanies(state, action) {
                return { ...state, managingCompanies: action.payload }
            },
            setAllCompanies(state, action) {
                return { ...state, allCompanies: action.payload }
            },
            resetManagingCompanies(state, action) {
                return { ...state, managingCompanies: {} }
            },
            resetAllCompanies(state, action) {
                return { ...state, allCompanies: {} }
            },
            resetCompanies(state, action) {
                return { allCompanies: {}, managingCompanies: {} }
            }
        }
    }
)

export const companiesReducer = companiesSlice.reducer

export const companiesActions = companiesSlice.actions
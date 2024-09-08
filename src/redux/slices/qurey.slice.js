import { createSlice } from "@reduxjs/toolkit"

const querySlice = createSlice(
    {
        name: "query",
        initialState: null,
        reducers: {
            setQuery(state, action) {
                return action.payload
            },
            resetQuery(state, action) {
                return null
            }
        }
    }
)

export const queryReducer = querySlice.reducer

export const queryActions = querySlice.actions
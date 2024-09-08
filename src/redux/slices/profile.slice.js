import { createSlice } from "@reduxjs/toolkit"

const profileSlice = createSlice(
    {
        name: "profile",
        initialState: null,
        reducers: {
            setProfile(state, action) {
                return action.payload
            },
            resetProfile(state, action) {
                return {}
            }
        }
    }
)

export const profileReducer = profileSlice.reducer

export const profileActions = profileSlice.actions
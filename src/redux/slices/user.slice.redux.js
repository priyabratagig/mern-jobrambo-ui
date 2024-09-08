import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice(
    {
        name: "user",
        initialState: null,
        reducers: {
            setUser(state, action) {
                return action.payload
            },
            resetUser(state, action) {
                return {}
            }
        }
    }
)

export const userReducer = userSlice.reducer

export const userActions = userSlice.actions
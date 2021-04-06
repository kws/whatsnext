import { createSlice } from '@reduxjs/toolkit'

export const timeSlice = createSlice({
    name: 'time',
    initialState: {
        current: new Date().getTime(),
    },
    reducers: {
        update: state => {
            state.current = new Date().getTime()
        },
    }
})

export const { update } = timeSlice.actions


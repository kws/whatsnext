import { createSlice } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
    },
    reducers: {
        setEvents: (state, data) => {
            state.account = data.payload.account;
            state.all = data.payload.events;
            state.time = new Date().getTime();
        },
    }
})

export const { setEvents } = eventsSlice.actions


import { createSlice } from '@reduxjs/toolkit'

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
    },
    reducers: {
        setActiveAccount: (state, account) => {
            state.active = account;
        },
    }
})

export const { setActiveAccount } = accountsSlice.actions


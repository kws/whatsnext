import { configureStore } from '@reduxjs/toolkit'
import { timeSlice } from "./reducers/time";
import { eventsSlice } from "./reducers/events";
import { accountsSlice } from "./reducers/accounts";

const store = configureStore({
    reducer: {
        time: timeSlice.reducer,
        events: eventsSlice.reducer,
        accounts: accountsSlice.reducer,
    }
})

export default store;


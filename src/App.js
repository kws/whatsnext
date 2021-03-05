import React from 'react'
import { useMsal } from "@azure/msal-react";
import Calendar from "./components/calendar";

const loginRequest = {
    scopes: ["Calendars.Read"]
}

export function App() {
    const { instance, accounts, inProgress } = useMsal();

    console.log("Accounts", accounts)

    if (accounts.length > 0) {
        return (
            <>
                <p>There are currently {accounts.length} users signed in! </p>
                <Calendar />
                <button onClick={() => instance.logout()}>Logout</button>
            </>
        )
    } else if (inProgress === "login") {
        return <span>Login is currently in progress!</span>
    } else {
        return (
            <>
                <span>There are currently no users signed in!</span>
                <button onClick={() => instance.loginPopup(loginRequest)}>Login</button>
            </>
        );
    }
}

export default App;
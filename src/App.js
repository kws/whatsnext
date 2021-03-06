import React from 'react'
import { useMsal } from "@azure/msal-react";
import Calendar from "./components/Calendar";
import { loginRequest } from "./authConfig";

export function App() {
    const { instance, accounts, inProgress } = useMsal();
    if (accounts.length > 0) {
        return (
            <Calendar />
        )
    } else if (inProgress === "login") {
        return <div>Login is currently in progress!</div>
    } else {
        return (
            <div>
                <span>Please log in to view your upcoming events.</span>
                <button onClick={() => instance.acquireTokenPopup(loginRequest)}>Login</button>
            </div>
        );
    }
}

export default App;
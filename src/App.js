import React from 'react'
import { useMsal } from "@azure/msal-react";
import Calendar from "./components/Calendar";
import { loginRequest } from "./authConfig";
import './App.css';

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
            <div className="intro">
                <h1>What's Next?</h1>
                <p>
                    Do you ever look at the calendar, or get a reminder from Outlook that you have a meeting
                    starting in 10 minutes? Just enough time to answer a couple of emails... and then suddenly you
                    are 10 minutes late instead?
                </p>
                <p>
                    What's Next is an unobtrusive countdown until your next Zoom...
                </p>
                <div className="msauth" >
                    <button onClick={() => instance.acquireTokenPopup(loginRequest)}>
                        <span>Login</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
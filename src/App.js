import React from 'react'
import { useMsal } from "@azure/msal-react";
import Calendar from "./components/calendar";

function callMSGraph(endpoint, token, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());

    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => callback(response, endpoint))
        .catch(error => console.log(error))
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
                <button onClick={() => instance.loginPopup()}>Login</button>
            </>
        );
    }
}

export default App;
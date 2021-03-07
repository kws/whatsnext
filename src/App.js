import React from 'react'
import { useMsal } from "@azure/msal-react";
import Calendar from "./components/Calendar";
import Welcome from "./components/Welcome";
import MadeByKaj from "./components/MadeByKaj";

export function App() {
    const { accounts, inProgress } = useMsal();

    let Component;
    if (accounts.length > 0) {
        Component = Calendar;
    } else if (inProgress === "login") {
        Component = () => <div>Login is currently in progress!</div>;
    } else {
        Component = Welcome;
    }

    return (
        <>
            <Component />
            <MadeByKaj />
        </>
    )
}

export default App;
import React from 'react'
import {loginRequest} from "../authConfig";
import {useMsal} from "@azure/msal-react";
import styles from "./Welcome.module.css";


const Welcome = () => {
    const { instance } = useMsal();

    return (
        <div className={styles.intro}>
            <h1>What's Next?</h1>
            <p>
                Do you ever look at the calendar, or get a reminder from Outlook that you have a meeting
                starting in 10 minutes? Just enough time to answer a couple of emails... and then suddenly you
                are 10 minutes late instead?
            </p>
            <p>
                What's Next is an unobtrusive countdown until your next Zoom...
            </p>
            <div className={styles.msauth} >
                <button onClick={() => instance.acquireTokenPopup(loginRequest)}>
                    <span>Login</span>
                </button>
            </div>
        </div>
    )
}

export default Welcome;
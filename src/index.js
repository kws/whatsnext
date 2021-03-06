import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig"
import './index.css';
import App from './App';

Sentry.init({
    dsn: "https://c42f3190b1094dd4b4dd426834da98c6@o108858.ingest.sentry.io/5662792",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
});

export const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
    console.log("msalInstance event", event)
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
    }
});

// Component
const AppProvider = () => (
    <MsalProvider instance={msalInstance}>
        <App />
    </MsalProvider>
);


ReactDOM.render(<AppProvider />, document.getElementById("root"));


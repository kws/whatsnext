import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";

// MSAL configuration
const configuration = {
    auth: {
        clientId: '34a2dfb8-fcb2-4c55-8436-ed03b6b7c683'
    }
};


export const msalInstance = new PublicClientApplication(configuration);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
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


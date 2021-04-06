import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux'

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";


import { msalConfig } from "./authConfig"
import App from './App';
import store from './store'
import { update } from './reducers/time'
import './index.css';
import {setActiveAccount} from "./reducers/accounts";
import {EventLoader} from "./helpers/events";

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN

if (SENTRY_DSN) {
    Sentry.init({
        dsn: SENTRY_DSN,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
    });
}

window.setInterval(() => store.dispatch(update()), 1000);

EventLoader();

export const msalInstance = new PublicClientApplication(msalConfig);
store.subscribe(() => {
    const state = store.getState()
    if (state.accounts.active && state.accounts.active !== msalInstance.getActiveAccount()) {
        msalInstance.setActiveAccount(state.accounts.active);
    }
})

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    store.dispatch(setActiveAccount(accounts[0]))
}

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        store.dispatch(setActiveAccount(event.payload.account))
    }
});

const AppProvider = () => (
    <MsalProvider instance={msalInstance}>
        <App />
    </MsalProvider>
);

const AppWithStateProvider = () => (
    <ReduxProvider store={store}>
        <AppProvider />
    </ReduxProvider>
);


ReactDOM.render(<AppWithStateProvider />, document.getElementById("root"));


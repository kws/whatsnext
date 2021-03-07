import { loginRequest, graphConfig } from "../authConfig";
import { msalInstance } from "../index";
import dayjs from "dayjs";

export async function callMsGraph() {
    const account = msalInstance.getActiveAccount();
    if (!account) {
        throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
    }

    const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account
    });

    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    const start = dayjs().subtract(1, 'hour');
    const end = dayjs().add(1, 'day');
    const url = `${graphConfig.graphMeEndpoint}?StartDateTime=${start.toISOString()}&EndDateTime=${end.toISOString()}`

    return fetch(url, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
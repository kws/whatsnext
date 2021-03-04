import React from 'react'
import { useEffect, useState } from "react";

import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

import { callMsGraph } from "../utils/MsGraphApiCall";


const Calendar = () => {
    const { inProgress } = useMsal();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            callMsGraph().then(response => setGraphData(response));
        }
    }, [inProgress]);


    console.log("GraphData", graphData);

    const events = (graphData && graphData.value) ? graphData.value : [];
    events.sort((a, b) => a.start.dateTime.localeCompare(b.start.dateTime))

    console.log("events", events);

    return (
        <ul>
            {events.map(event => {
                return (
                    <li key={event.id}>{new Date(event.start.dateTime).toLocaleTimeString()} - {event.subject}</li>
                )
            })}
        </ul>
    )

}

export default Calendar;
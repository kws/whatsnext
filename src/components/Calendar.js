import React from 'react'
import { useEffect, useState } from "react";

import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

import { callMsGraph } from "../utils/MsGraphApiCall";
import Event from "./Event";

const loadAndPrepareData = async () => {
    const graphData = await callMsGraph();
    const events = (graphData && graphData.value) ? graphData.value : [];
    events.sort((a, b) => a.start.dateTime.localeCompare(b.start.dateTime));
    events.map(event => {
        const date = new Date(event.start.dateTime+"Z")
        const timeRep = `${date.getHours()}`.padStart(2, '0') + ':' +`${date.getMinutes()}`.padStart(2, '0')
        event.startinfo = {date, timeRep}
    });
    console.log("events", events);
    return events;
};

const Calendar = () => {
    const { inProgress } = useMsal();
    const [events, setEvents] = useState([]);
    const [time, setTime] = useState(new Date().getTime());

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            loadAndPrepareData().then(events => {
                setEvents(events);
            });
        }
    }, [inProgress]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().getTime());
        }, 1000);
        return () => {
            console.log("Stopping timer");
            clearInterval(timer);
        }
    },[]);


    events.map(event => {
        event.startinfo.timeDiff = event.startinfo.date - time;
    });

    return (
        <>
            <p>{new Date(time).toLocaleTimeString()}</p>
            <ul>
                {events.map(event => <Event key={event.id} event={event}/>)}
            </ul>
        </>
    )

}

export default Calendar;
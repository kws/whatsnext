import React from 'react'
import { useEffect, useState } from "react";

import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

import { callMsGraph } from "../utils/MsGraphApiCall";
import Event from "./Event";

const RELOAD_INTERVAL_IN_MINUTES = 1;

const loadAndPrepareData = async () => {
    const graphData = await callMsGraph();
    const events = (graphData && graphData.value) ? graphData.value : [];
    events.sort((a, b) => a.start.dateTime.localeCompare(b.start.dateTime));
    events.map(event => {
        const start = new Date(event.start.dateTime+"Z")
        const end = new Date(event.end.dateTime+"Z")
        const startRep = `${start.getHours()}`.padStart(2, '0') + ':' +`${start.getMinutes()}`.padStart(2, '0')
        event.timeinfo = {start, end, startRep}
        return event;
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

    useEffect(() => {
        const timer = setInterval(() => {
            if (inProgress === InteractionStatus.None) {
                loadAndPrepareData().then(events => {
                    setEvents(events);
                });
            }
        }, RELOAD_INTERVAL_IN_MINUTES * 60 * 1000);
        return () => {
            console.log("Stopping timer");
            clearInterval(timer);
        }
    }, [inProgress]);

    events.map(event => {
        event.timeinfo.timeDiff = event.timeinfo.start - time;
        event.timeinfo.started = event.timeinfo.start >= time;
        event.timeinfo.ended = event.timeinfo.end >= time;
        return event;
    });

    const currentEvents = events.filter(event => event.timeinfo.ended)

    let currentTime = new Date(time).toLocaleTimeString("en-GB",{timeStyle: 'short'})
    if ((Math.floor(time / 1000)) % 2 === 0) {
        currentTime = currentTime.replace(":", " ");
    }

    return (
        <>
            <div className="timeDisplay">{currentTime}</div>
            <ul>
                {currentEvents.map(event => <Event key={event.id} event={event}/>)}
            </ul>
        </>
    )

}

export default Calendar;
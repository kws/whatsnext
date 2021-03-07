import React from 'react'
import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";

import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import dayjs from "dayjs";

import { callMsGraph } from "../utils/MsGraphApiCall";
import Event, {formatCountdown} from "./Event";
import MadeByKaj from "./MadeByKaj";
import styles from "./Calendar.module.css";

const RELOAD_INTERVAL_IN_MINUTES = 1;

const loadAndPrepareData = async () => {
    const graphData = await callMsGraph();
    const events = (graphData && graphData.value) ? graphData.value : [];
    events.sort((a, b) => a.start.dateTime.localeCompare(b.start.dateTime));
    events.map(event => {
        const start = new Date(event.start.dateTime+"Z")
        const end = new Date(event.end.dateTime+"Z")
        const startRep = dayjs(start).format("HH:mm")
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
        event.timeinfo.timeDiffSecs = Math.floor(event.timeinfo.timeDiff / 1000);

        const offsetDiff = Math.min(1200, event.timeinfo.timeDiffSecs + 300);
        event.timeinfo.alertStatus = offsetDiff > 0 ? 1200 - offsetDiff : 0;

        event.timeinfo.started = event.timeinfo.start >= time;
        event.timeinfo.ended = event.timeinfo.end >= time;
        return event;
    });

    const currentEvents = events.filter(event => event.timeinfo.ended && !event.isAllDay)

    const maxAlertStatus = events.reduce((value, event) => Math.max(value, event.timeinfo.alertStatus), 0)

    let currentTime = dayjs().format("H:mm")
    if ((Math.floor(time / 1000)) % 2 === 0) {
        currentTime = currentTime.replace(":", " ");
    }

    const nextEvent = currentEvents.length > 0 ? currentEvents[0] : null;
    let icon = '1-favicon.ico';
    if (maxAlertStatus > 600) {
        icon = maxAlertStatus % 2 === 0 ? '3-favicon.ico' : 'alert-favicon.ico';
    } else if (maxAlertStatus > 400) {
        icon = '2-favicon.ico';
    }

    return (
        <>
            <Helmet>
                <title>{nextEvent ? `${formatCountdown(nextEvent).replaceAll(' ', '')} ${nextEvent.subject}` : "WhatsNext"}</title>
                <link rel="icon" href={process.env.PUBLIC_URL + `/${icon}`} />
            </Helmet>
            <div className={styles.timeDisplay}>{currentTime}</div>
            <ul>
                {currentEvents.map(event => <Event key={event.id} event={event}/>)}
            </ul>
            <MadeByKaj />
        </>
    )

}

export default Calendar;
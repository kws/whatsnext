import React from 'react'
import { useSelector } from 'react-redux'

import {Helmet} from "react-helmet";

import dayjs from "dayjs";
import Event, {formatCountdown} from "./Event";
import MadeByKaj from "./MadeByKaj";
import styles from "./Calendar.module.css";
import {addEventStatus} from "../helpers/events";


const Calendar = () => {
    const time = useSelector(state => state.time.current)
    const events = useSelector(state => state.events.all)

    if (!events) {
        return (<div>Loading ... </div>)
    }

    const currentEvents = events.filter(event => event.end >= time).map(addEventStatus(time))
    const maxAlertStatus = currentEvents.reduce((value, event) => Math.max(value, event.timeinfo.alertStatus), 0)

    const currentTime = Math.floor(time / 1000) % 2 === 0 ?
        dayjs(time).format("H:mm") : dayjs(time).format("H mm");


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
                {currentEvents.map(event => <Event key={event.event.id} event={event}/>)}
            </ul>
            <MadeByKaj />
        </>
    )

}

export default Calendar;
import React from 'react'
import {easeInOutCubic} from 'js-easing-functions';
import './Event.css';


const _0 = (value) => {
    return `${value}`.padStart(2, '0')
}

const getBlendColors = diff => {
    // 900 - 15 minutes
    // 600 - 10 minutes
    // 300 - 5 minutes
    if (diff > 900 | diff < -300) {
        return {}
    }
    const alphaValue = Math.min(300, 900 - diff);
    const greenValue = Math.max(0, Math.min(300, diff));
    const redValue = Math.max(0, Math.min(300, 600-diff));

    const r = easeInOutCubic(redValue, 0, 128, 300);
    const g = easeInOutCubic(greenValue, 0, 128, 300);
    const a = easeInOutCubic(alphaValue, 0, 1,300);

    return {backgroundColor: `rgba(${r}, ${g}, 0, ${a})`};
}

export const formatCountdown = (event) => {
    const diffInSecs = Math.floor(event.timeinfo.timeDiff / 1000);
    const absDiff = Math.abs(diffInSecs);
    const hours = Math.floor(absDiff /  3600 )
    const minutes = Math.floor(absDiff / 60 - (hours * 60))
    const seconds = Math.floor(absDiff - (hours * 3600) - (minutes * 60))

    let timeRep = "";
    if (event.timeinfo.timeDiff < 0) {
        timeRep += 'T+ ';
    }
    if (hours > 0) {
        timeRep += `${hours}h ${_0(minutes)}m`;
    } else if (minutes > 9) {
        timeRep += `${minutes}m`;
    } else {
        timeRep += `${minutes}m ${_0(seconds)}s`;
    }
    return timeRep;
}

const Event = ({event}) => {
    const diffInSecs = Math.floor(event.timeinfo.timeDiff / 1000);
    const flashClass = diffInSecs <= 60 && diffInSecs > -300 ? 'flash': '';
    const pastClass = diffInSecs < -300 ? 'past': '';

    const timeRep = formatCountdown(event);

    return (
        <li className={`event ${flashClass} ${pastClass}`}
            style={diffInSecs > 60 ? getBlendColors(diffInSecs) : {}}>
            <span className="time">{event.timeinfo.startRep}</span>
            <span className="title">{event.subject}</span>
            <span className="diff">{timeRep}</span>
        </li>
    )
};

export default Event;
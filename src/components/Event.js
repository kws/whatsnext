import React from 'react'

const _0 = (value) => {
    return `${value}`.padStart(2, '0')
}

const Event = ({event}) => {
    const diffInSecs = Math.floor(event.startinfo.timeDiff / 1000)
    const hours = Math.floor(diffInSecs /  3600 )
    const minutes = Math.floor(diffInSecs / 60 - (hours * 60))
    const seconds = Math.floor(diffInSecs - (hours * 3600) - (minutes * 60))

    let timeRep = "";
    if (diffInSecs < 0) {
        timeRep = '~ past ~';
    } else if (hours > 0) {
        timeRep = `${hours}h ${_0(minutes)}m`;
    } else if (minutes > 10) {
        timeRep = `${_0(minutes)}m`;
    } else {
        timeRep = `${minutes}m ${_0(seconds)}s`;
    }


    return (
        <li className="event">
            <span className="diff">{timeRep}</span>
            <span className="title">{event.subject}</span>
            <span className="time">{event.startinfo.timeRep}</span>
        </li>
    )
};

export default Event;
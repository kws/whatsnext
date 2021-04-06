import store from "../store";
import {callMsGraph} from "../utils/MsGraphApiCall";
import {setEvents} from "../reducers/events";

export const addEventStatus = (time) => (eventInfo) => {
        const event = {...eventInfo, timeinfo: {}}

        event.timeinfo.timeDiff = event.start - time;
        event.timeinfo.timeDiffSecs = Math.floor(event.timeinfo.timeDiff / 1000);

        const offsetDiff = Math.min(1200, event.timeinfo.timeDiffSecs + 300);
        event.timeinfo.alertStatus = offsetDiff > 0 ? 1200 - offsetDiff : 0;

        event.timeinfo.started = event.timeinfo.start >= time;
        event.timeinfo.ended = event.timeinfo.end >= time;
        return event;
}

const loadAndPrepareData = async (account) => {
    const graphData = await callMsGraph(account);
    const events = (graphData && graphData.value) ? graphData.value : [];
    events.sort((a, b) => a.start.dateTime.localeCompare(b.start.dateTime));
    const eventInfo = events.map(event => {
        return {
            event: event,
            start: new Date(event.start.dateTime+"Z").getTime(),
            end: new Date(event.end.dateTime+"Z").getTime(),
        }
    });
    return { account, events: eventInfo }
};

export const EventLoader = () => {
    let loading = false;
    store.subscribe(() => {
        if (loading) {
            return;
        }
        const state = store.getState()
        const sameAccount = state.accounts.active === state.events.account

        // Load events if we have changed account
        if (!sameAccount) {
            loading = true;
            loadAndPrepareData(state.accounts.active).then((data) => {
                store.dispatch(setEvents(data))
            }).finally(() => {
                loading = false;
            });
        }
    })

}
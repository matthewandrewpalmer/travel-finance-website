import {requestPromise, requestPromiseJson} from "./requestPromise";


function getRailJourneys() {
    let url = "/rail-journeys";
    return requestPromiseJson("GET", url);
}

export {getRailJourneys}
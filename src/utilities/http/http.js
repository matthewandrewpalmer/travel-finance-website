import {requestPromise, requestPromiseJson, requestPromisePOSTJson} from "./requestPromise";


function getRailJourneys() {
    let url = "/rail-journeys";
    return requestPromiseJson("GET", url);
}

function saveRailJourney(body) {
    let url = "/rail-journeys";
    return requestPromisePOSTJson(url, body);
}

export {getRailJourneys, saveRailJourney};
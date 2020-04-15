import {getRequest, getRequestJSON, postRequestJSON} from "./requestPromise";


function getRailJourneys() {
    let url = "/rail-journeys";
    return getRequestJSON("GET", url);
}

function saveRailJourney(body) {
    let url = "/rail-journeys";
    return postRequestJSON(url, body);
}

export {getRailJourneys, saveRailJourney};
import
{
    SET_DATA,
    ADD_DATA,
    RESET_DATA,
    SET_TOKEN,
    DELETE_TOKEN,
    SET_EVENTS,
    SET_PLACES,
    SET_BLOOD_GROUPS, SET_NEWS, SET_ONLY_TOKEN, SET_DONOR, SET_COORD,
    SET_HOSPITALS
} from "../constants/action-types";

export function setData(payload) {
    return { type: SET_DATA, payload }
}

export function addData(payload) {
    return { type: ADD_DATA, payload }
}

export function resetData(payload) {
    return { type: RESET_DATA, payload};
}

export function setToken(payload) {
    return { type: SET_TOKEN, payload};
}

export function setOnlyToken(payload) {
    return { type: SET_ONLY_TOKEN, payload};
}


export function deleteToken(payload) {
    return { type: DELETE_TOKEN, payload};
}

export function setPlaces(payload) {
    return { type: SET_PLACES, payload};
}

export function setEvents(payload) {
    return { type: SET_EVENTS, payload};
}

export function setBlood(payload) {
    return { type: SET_BLOOD_GROUPS, payload};
}

export function setNews(payload) {
    return { type: SET_NEWS, payload};
}

export function setDonor(payload) {
    return { type: SET_DONOR, payload};
}

export function setCoord(payload) {
    return { type: SET_COORD, payload};
}


export function setHospitals(payload) {
    return { type: SET_HOSPITALS, payload};
}

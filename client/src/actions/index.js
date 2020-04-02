import {SET_DATA, ADD_DATA, RESET_DATA, SET_TOKEN, DELETE_TOKEN} from "../constants/action-types";

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
export function deleteToken(payload) {
    return { type: DELETE_TOKEN, payload};
}

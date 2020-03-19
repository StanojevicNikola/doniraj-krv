import { SET_DATA } from "../constants/action-types"
import { ADD_DATA } from "../constants/action-types";
import { RESET_DATA } from "../constants/action-types";

export function setData(payload) {
    return { type: SET_DATA, payload }
}

export function addData(payload) {
    return { type: ADD_DATA, payload }
}

export function resetData(payload) {
    return { type: RESET_DATA, payload};
}
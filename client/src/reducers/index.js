import {SET_DATA, SET_TOKEN, DELETE_TOKEN} from "../constants/action-types"
import { ADD_DATA } from "../constants/action-types";
import { RESET_DATA } from "../constants/action-types";

const initialState = {
    data: [],
    token: ''
};

function rootReducer(state = initialState, action) {
    if(action.type === SET_DATA) {
        return Object.assign({}, state, {
            data: [action.payload]
        })
    } else if(action.type === ADD_DATA) {
        return Object.assign({}, state, {
            data: [ ...state.data ,action.payload]
        })
    } else if(action.type === RESET_DATA) {
        return Object.assign({}, state, {
            data: []
        })
    } else if(action.type === SET_TOKEN) {
        return Object.assign({}, state, {
            data: state.data,
            token: action.payload.token
        })
    } else if(action.type === DELETE_TOKEN) {
        return Object.assign({}, state, {
            data: state.data,
            token: ''
        })
    }

        return state;
}

export default rootReducer

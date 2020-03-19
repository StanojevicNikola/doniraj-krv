import { SET_DATA } from "../constants/action-types"
import { ADD_DATA } from "../constants/action-types";
import { RESET_DATA } from "../constants/action-types";

const initialState = {
    data: []
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
    }

    return state;
}

export default rootReducer
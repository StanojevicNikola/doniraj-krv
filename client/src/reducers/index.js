import {
    SET_DATA,
    SET_TOKEN,
    DELETE_TOKEN,
    SET_PLACES,
    SET_EVENTS,
    SET_BLOOD_GROUPS,
    SET_NEWS, SET_ONLY_TOKEN, SET_DONOR, SET_COORD
} from "../constants/action-types"
import { ADD_DATA } from "../constants/action-types";
import { RESET_DATA } from "../constants/action-types";

const initialState = {
    data: [],
    token: '',
    username: '',
    name: '',
    roles: [],
    email: '',
    donor: false,
    coordinator: false,
    isAdmin: false,
    userId: '',
    events: [],
    places: []
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
            token: action.payload.token,
            username: action.payload.username,
            name: action.payload.name,
            roles: action.payload.roles,
            email: action.payload.email,
            donor: action.payload.donor,
            coordinator: action.payload.coordinator,
            isAdmin: action.payload.isAdmin,
            userId: action.payload.userId
        })
    } else if(action.type === DELETE_TOKEN) {
        return Object.assign({}, state, {
            data: state.data,
            token: '',
            username: '',
            name: '',
            roles: [],
            email: '',
            donor: false,
            coordinator: false,
            isAdmin: false,
            userId: ''
        })
    } else if(action.type === SET_PLACES) {
        return Object.assign({}, state, {
            places: action.payload.places
        })
    } else if(action.type === SET_EVENTS) {
        return Object.assign({}, state, {
            events: action.payload.events
        })
    } else if(action.type === SET_BLOOD_GROUPS) {
        return Object.assign({}, state, {
            blood: action.payload.blood
        })
    } else if(action.type === SET_NEWS) {
        return Object.assign({}, state, {
            news: action.payload.news
        })
    } else if(action.type === SET_ONLY_TOKEN) {
        return Object.assign({}, state, {
            token: action.payload.token
        })
    } else if(action.type === SET_DONOR) {
        return Object.assign({}, state, {
            donor: action.payload.donor
        })
    } else if(action.type === SET_COORD) {
        return Object.assign({}, state, {
            coordinator: action.payload.coordinator
        })
    }

    return state;
}

export default rootReducer

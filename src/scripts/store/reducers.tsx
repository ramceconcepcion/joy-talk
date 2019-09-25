import {
    SET_USERS,
    SET_CURRENT_USER,
    INSERT_CHAT,
    SET_TYPING,
    REMOVE_TYPING,
    SET_WS,
    SET_WS_CONNECT_STATUS
} from './actions';

import { combineReducers } from 'redux';

function users(state = {}, action) {
    switch (action.type) {
        case SET_USERS().type:
            return action.payload;

        default:
            return state;
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER().type:
            return action.payload;
        default:
            return state;
    }
}

function chats(state = [], action) {
    switch (action.type) {
        case INSERT_CHAT().type:
            return state.concat([action.payload]);
        default:
            return state;
    }
}

function typing(state = null, action) {
    switch (action.type) {
        case SET_TYPING().type:
            return action.payload;
        case REMOVE_TYPING().type:
            return null;
        default:
            return state;
    }
}

function ws(state = {}, action) {
    switch (action.type) {
        case SET_WS().type:
            return action.payload;
        case SET_WS_CONNECT_STATUS().type:
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    users,
    user,
    chats,
    typing,
    ws
})
import {
    GET_USERS,
    SET_USERS,
    GET_CURRENT_USER,
    SET_CURRENT_USER,
    GET_CHATS,
    GET_TYPING,
    INSERT_CHAT,
    INSERT_TYPING,
    REMOVE_TYPING
} from './actions';

import { combineReducers } from 'redux';

function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS().type:
            return state;
        case SET_USERS().type:
            return action.payload;

        default:
            return state;
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case GET_CURRENT_USER().type:
            return state;
        case SET_CURRENT_USER().type:
            return action.payload;
        default:
            return state;
    }
}

function chats(state = [], action) {
    switch (action.type) {
        case GET_CHATS().type:
            return state;
        case INSERT_CHAT().type:
            return state.concat([action.payload]);
        default:
            return state;
    }
}

function typing(state = null, action) {
    switch (action.type) {
        case GET_TYPING().type:
            return state;
        case INSERT_TYPING().type:
            return action.payload.typing;
        case REMOVE_TYPING().type:
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    users,
    user,
    chats,
    typing
})
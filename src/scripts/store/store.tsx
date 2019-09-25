import { createStore } from 'redux';
import { connect } from 'react-redux';

//Actions
import {
    SET_USERS,
    SET_CURRENT_USER,
    INSERT_CHAT,
    SET_TYPING,
    REMOVE_TYPING,
    SET_WS,
    SET_WS_CONNECT_STATUS,
} from '../store/actions';

import reducers from './reducers';

const mapStateToProps = (state) => {
    const { users, chats, typing, user, ws } = state;

    return {
        user,
        users,
        chats,
        typing,
        ws
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SET_USERS: (data) => { dispatch(SET_USERS(data)) },
        SET_CURRENT_USER: (data) => { dispatch(SET_CURRENT_USER(data)) },
        INSERT_CHAT: (data) => { dispatch(INSERT_CHAT(data)) },
        SET_TYPING: (data) => { dispatch(SET_TYPING(data)) },
        REMOVE_TYPING: () => { dispatch(REMOVE_TYPING()) },
        SET_WS: (data) => { dispatch(SET_WS(data)) },
        SET_WS_CONNECT_STATUS: (data) => { dispatch(SET_WS_CONNECT_STATUS(data)) },
    }
}

export function applyStore(component) {
    return connect(mapStateToProps, mapDispatchToProps)(component);
}

export function configureStore() {
    return createStore(reducers);
}
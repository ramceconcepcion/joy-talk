//Actions
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
} from '../store/actions';

import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    const { users, chats, typing, user } = state;

    return {
        user,
        users,
        chats,
        typing,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SET_USERS: (data) => { dispatch(SET_USERS(data)) },
        SET_CURRENT_USER: (data) => { dispatch(SET_CURRENT_USER(data)) },
        INSERT_CHAT: (data) => { dispatch(INSERT_CHAT(data)) },
        INSERT_TYPING: (data) => { dispatch(INSERT_TYPING(data)) },
        REMOVE_TYPING: () => { dispatch(REMOVE_TYPING()) },
    }
}

export const applyStore = component => connect(mapStateToProps, mapDispatchToProps)(component);
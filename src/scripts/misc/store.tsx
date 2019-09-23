import { createStore } from 'redux';

const state = {
    //logged in user
    currentUser: null,
    currentUserBroadcastTimeoutId: null,

    //all users
    users: null,

    //chats data
    chats: [],
    typing: null,
    typingTimeoutId: null,
}

export default {};
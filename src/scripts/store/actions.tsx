export function GET_USERS(payload?) {
    return {
        type: "GET_USERS",
        payload: payload
    }
}

export function SET_USERS(payload?) {
    return {
        type: "SET_USERS",
        payload: payload
    }
}

export function GET_CURRENT_USER(payload?) {
    return {
        type: "GET_CURRENT_USER",
        payload: payload
    }
}

export function SET_CURRENT_USER(payload?) {
    return {
        type: "SET_CURRENT_USER",
        payload: payload
    }
}

export function GET_CHATS(payload?) {
    return {
        type: "GET_CHATS",
        payload: payload
    }
}

export function INSERT_CHAT(payload?) {
    return {
        type: "INSERT_CHAT",
        payload: payload
    }
}

export function GET_TYPING(payload?) {
    return {
        type: "GET_TYPING",
        payload: payload
    }
}

export function INSERT_TYPING(payload?) {
    return {
        type: "INSERT_TYPING",
        payload: payload
    }
}


export function REMOVE_TYPING() {
    return {
        type: "REMOVE_TYPING",
        payload: {}
    }
}
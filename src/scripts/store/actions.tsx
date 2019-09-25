export function SET_USERS(payload?) {
    return {
        type: "SET_USERS",
        payload: payload
    }
}
export function SET_CURRENT_USER(payload?) {
    return {
        type: "SET_CURRENT_USER",
        payload: payload
    }
}
export function INSERT_CHAT(payload?) {
    return {
        type: "INSERT_CHAT",
        payload: payload
    }
}
export function SET_TYPING(payload?) {
    return {
        type: "SET_TYPING",
        payload: payload
    }
}
export function REMOVE_TYPING() {
    return {
        type: "REMOVE_TYPING",
        payload: {}
    }
}
export function SET_WS(payload?) {
    return {
        type: "SET_WS",
        payload: payload
    }
}
export function SET_WS_CONNECT_STATUS(payload?) {
    return {
        type: "SET_WS_CONNECT_STATUS",
        payload: payload
    }
}
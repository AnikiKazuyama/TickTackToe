import { INIT_SOCKET, INIT_SOCKET_SUCCESS, INIT_SOCKET_FAILED,  REMOVE_SOCKET }from '../constants/actions/socketActions';

export function initSocket() {
    return {
        type: INIT_SOCKET
    }
}

export function initSocketSuccess() {
    return {
        type: INIT_SOCKET
    }
}

export function initSocketFailed() {
    return {
        type: INIT_SOCKET
    }
}

export function removeSocket() {
    return {
        type: REMOVE_SOCKET
    }
}
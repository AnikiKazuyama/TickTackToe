import { INIT_SOCKET_SUCCESS, REMOVE_SOCKET } from '../constants/actions/socketActions';

const initState = {
    socket: null
};

function socket(state = initState, action) {
    switch(action.type) {
        case INIT_SOCKET_SUCCESS:
            return {
                ...state,
            }
    }
}
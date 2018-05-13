import { 
    LOGIN, 
    LOGIN_SUCCESS, 
    LOGIN_FAILED,
    LOGOUT,
    LOGOUT_SUCCESS,
    GET_USER, 
    GET_USER_FAILED, 
    GET_USER_SUCCESS
 } from '../constants/actions/userActions';

const initState = {
    id: null,
    email: null, 
    name: null, 
    loaders: {
        getCurrentLoading: false,
        signInLoading: false,
    },
    isLoggedIn: null,
    isExistSession: null
}

export default function user(state = initState, action) {
    switch(action.type) {
        case(LOGIN): 
            return ({
                ...state,
                loaders: {
                    getCurrentLoading: false,
                    signInLoading: true,
                }
            });

        case(LOGIN_SUCCESS): 
            return({
                ...state, 
                email: action.email,
                name:  action.name,
                isExistSession: true,
                isLoggedIn: true, 
                loaders: {
                    getCurrentLoading: false,
                    signInLoading: false,
                }
            });

        case(LOGIN_FAILED): 
            return({
                ...state,
                isExistSession: false,
                isLoggedIn: false, 
                loaders: {
                    getCurrentLoading: false,
                    signInLoading: false,
                }
            });

        case(LOGOUT): 
            return ({
                ...state
            });

        case(LOGOUT_SUCCESS): 
            return ({
                ...state, 
                ...initState
            });

        case(GET_USER):
            return({
                ...state,
                loaders: {
                    getCurrentLoading: true,
                    signInLoading: false,
                }
            });

        case(GET_USER_SUCCESS):
            return({
                ...state,
                email: action.email, 
                name: action.name, 
                isExistSession: true,
                isLoggedIn: true,
                loaders: {
                    getCurrentLoading: false,
                    signInLoading: false,
                }
            });

        case(GET_USER_FAILED):
            return({
                ...state,
                isExistSession: false,
                isLoggedIn: false,
                loaders: {
                    getCurrentLoading: false,
                    signInLoading: false,
                }
            });

        default: 
            return ({
                ...state
            });
    }
}
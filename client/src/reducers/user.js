import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, GET_USER, GET_USER_FAILED, GET_USER_SUCCESS } from '../constants/actions/userActions';

const initState = {
    id: null,
    email: null, 
    name: null, 
    isLoading: false,
    isLogin: false
}

export default function user(state = initState, action) {
    switch(action.type) {
        case(LOGIN): 
            return ({
                ...state,
                isLoading: true
            });

        case(LOGIN_SUCCESS): 
            return({
                ...state, 
                email: action.email,
                name:  action.name,
                isLogin: true, 
                isLoading: false
            });

        case(LOGIN_FAILED): 
            return({
                ...state, 
                isLogin: false, 
                isLoading: false
            });

        case(GET_USER):
            return({
                ...state,
                isLoading: true
            });

        case(GET_USER_SUCCESS):
            return({
                ...state,
                email: action.email, 
                name: action.name, 
                isLoading: false,
                isLogin: true
            });

        case(GET_USER_FAILED):
            return({
                ...state,
                isLoading: false,
                isLogin: false
            });

        default: 
            return ({
                ...state
            });
    }
}
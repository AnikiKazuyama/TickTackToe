import { 
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    LOGOUT_SUCCESS,
    GET_USER,
    GET_USER_FAILED, 
    GET_USER_SUCCESS,  
} from '../constants/actions/userActions';

export function login( email, password ){
    return {
        type: LOGIN, 
        email, 
        password
    }
}

export function loginSuccess(user, socket) {
    return {
        type: LOGIN_SUCCESS,
        ...user, 
        socket
    }
}

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    }
}

export function getUser(){
    return {
        type: GET_USER
    }
}

export function getUserSuccess(user, socket) {
    return {
        type: GET_USER_SUCCESS,
        ...user, 
        socket
    }
}

export function getUserFailed() {
    return {
        type: GET_USER_FAILED
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}
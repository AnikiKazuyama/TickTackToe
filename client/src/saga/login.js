import { call, put, select  } from 'redux-saga/effects';

import { login, loginSuccess, loginFailed } from '../actions/userActions';

import ApiService from '../utils/ApiService';

export default function* loginSaga(action) {
    try {
        const response = yield call(ApiService.loginRequest, {email: action.email, password: action.password});

        yield put(response.status === 'success' 
        ? 
        loginSuccess(response.user)
        :
        loginFailed());
    } catch(e) {
        yield put(loginFailed());
    }
}
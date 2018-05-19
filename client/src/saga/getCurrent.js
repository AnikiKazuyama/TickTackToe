import { call, put, select  } from 'redux-saga/effects';

import { login, getUserSuccess, getUserFailed } from '../actions/userActions';

import { URL } from '../constants/Api';

import ApiService from '../utils/ApiService';

import io from 'socket.io-client';

export default function* getCurrent(action){
    try {
        const response = yield call(ApiService.getCurrentUser);
        yield put(response.status === 'success' 
                  ? 
                  getUserSuccess(response.user, io.connect(URL))
                  :
                  getUserFailed());
    } catch(e) {
        yield put(getUserFailed());
    }
}
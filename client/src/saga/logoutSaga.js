import { call, put, select  } from 'redux-saga/effects';

import { logoutSuccess } from '../actions/userActions';

import ApiService from '../utils/ApiService';

export default function* logoutSaga(action){
    try {    
        const response = yield call(ApiService.logoutRequest);
    } catch(e) {}

    const state = yield select();
    state.user.socket.disconnect();
    
    yield put(logoutSuccess());
}
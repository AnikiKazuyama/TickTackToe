import { call, put, select  } from 'redux-saga/effects';

import { logoutSuccess } from '../actions/userActions';

import ApiService from '../utils/ApiService';

export default function* logoutSaga(action){
    const response = yield call(ApiService.logoutRequest);

    yield put(logoutSuccess());

}
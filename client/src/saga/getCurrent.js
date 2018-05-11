import { call, put, select  } from 'redux-saga/effects';

import { login, getUserSuccess, getUserFailed } from '../actions/userActions';

import ApiService from '../utils/ApiService';

export default function* getCurrent(action){
    const response = yield call(ApiService.getCurrentUser);

    yield put(response.status === 'success' 
    ? 
    getUserSuccess(response.user)
    :
    getUserFailed());
}
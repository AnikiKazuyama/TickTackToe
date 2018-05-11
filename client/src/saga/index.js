import { takeEvery } from 'redux-saga/effects';

import loginSaga from './login';
import getCurrent from './getCurrent';
import { LOGIN, GET_USER } from '../constants/actions/userActions';

export default function* watchFetch(){
    yield takeEvery(LOGIN, loginSaga);
    yield takeEvery(GET_USER, getCurrent);
}
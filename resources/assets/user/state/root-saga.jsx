import {all} from 'redux-saga/effects';
import userSaga from './modules/user/sagas';

export default function* rootSaga() {
    yield all([userSaga()]);
}

import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchUserSuccess} from './actions';
import {fetchUser} from "./api";

export default function* userSaga() {
    yield takeLatest('FETCH_USER', fetchUserSaga);
}  

function* fetchUserSaga() {
    try {
        const response = yield call(fetchUser);
        yield put(fetchUserSuccess(response.data));
    } catch (error) {
        console.log(error);   
    }
}

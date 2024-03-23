import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchUserSuccess} from './actions';
import {fetchUser} from "./api";

export default function* userSaga() {
    yield takeLatest('FETCH_USER', fetchUserSaga);
}  

function* fetchUserSaga() {
    try {
        console.log(1);
        const response = yield call(fetchUser);
        console.log(2);
        console.log(response, 'response');
        yield put(fetchUserSuccess(response.data));
    } catch (error) {
        console.log(error);   
    }
}

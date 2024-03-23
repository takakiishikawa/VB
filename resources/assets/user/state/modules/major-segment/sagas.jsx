import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchMajorSegmentSuccess} from './actions';
import {fetchMajorSegment} from './api';

export default function* majorSegmentSaga (action) {
    console.log(action, 'action');
    yield takeLatest('FETCH_MAJOR_SEGMENT', fetchMajorSegmentSaga);
}

function* fetchMajorSegmentSaga() {
    try {
        const response = yield call(fetchMajorSegment);
        yield put(fetchMajorSegmentSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}

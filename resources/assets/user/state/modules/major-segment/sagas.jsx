import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchMajorSegmentSuccess} from './actions';
import {fetchMajorSegment} from './api';
import {FETCH_MAJOR_SEGMENT} from './types';
import {fetchUserMajorSegmentStatusesSuccess} from './actions';
import {fetchUserMajorSegmentStatuses} from './api';
import {FETCH_USER_MAJOR_SEGMENT_STATUSES} from './types';

export default function* majorSegmentSaga (action) {
    yield takeLatest(FETCH_MAJOR_SEGMENT, fetchMajorSegmentSaga);
    yield takeLatest(FETCH_USER_MAJOR_SEGMENT_STATUSES, fetchUserMajorSegmentStatusesSaga);
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

function* fetchUserMajorSegmentStatusesSaga() {
    try {
        const response = yield call(fetchUserMajorSegmentStatuses);
        yield put(fetchUserMajorSegmentStatusesSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}

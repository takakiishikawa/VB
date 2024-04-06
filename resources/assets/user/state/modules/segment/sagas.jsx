

//sagaのコードを書く
import {put, call, takeLatest} from 'redux-saga/effects';
import {fetchSegments} from './api';
import {fetchSegmentsSuccess} from './action';
import {FETCH_SEGMENTS} from './types';
import {FETCH_USER_SEGMENT_STATUSES} from './types';
import {fetchUserSegmentStatuses} from './api';
import {fetchUserSegmentStatusesSuccess} from './action';

export default function* segmentsSaga() {
    yield takeLatest(FETCH_SEGMENTS, fetchSegmentsSaga);
    yield takeLatest(FETCH_USER_SEGMENT_STATUSES, fetchUserSegmentStatusesSaga);
}

function* fetchSegmentsSaga(action) {
    try {
        const id = action.payload;
        const response = yield call(fetchSegments, id);
        yield put(fetchSegmentsSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}

function* fetchUserSegmentStatusesSaga(action) {
    try {
        const id = action.payload;
        const response = yield call(fetchUserSegmentStatuses, id);
        yield put(fetchUserSegmentStatusesSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}


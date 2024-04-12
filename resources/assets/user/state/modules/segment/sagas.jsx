

//sagaのコードを書く
import {put, call, takeLatest} from 'redux-saga/effects';
import {fetchSegments} from './api';
import {fetchSegmentsSuccess} from './action';
import {FETCH_SEGMENTS} from './types';
import {FETCH_USER_SEGMENT_STATUSES} from './types';
import {fetchUserSegmentStatuses} from './api';
import {fetchUserSegmentStatusesSuccess} from './action';
import {FETCH_GENERATE_ARTICLE} from './types';
import {fetchGenerateArticle} from './api';
import {FETCH_READING_STATUS} from './types';
import {fetchReadingStatusSuccess} from './action';
import {fetchReadingStatus} from './api';


export default function* segmentsSaga() {
    yield takeLatest(FETCH_SEGMENTS, fetchSegmentsSaga);
    yield takeLatest(FETCH_USER_SEGMENT_STATUSES, fetchUserSegmentStatusesSaga);
    yield takeLatest(FETCH_GENERATE_ARTICLE, fetchGenerateArticleSaga);
    yield takeLatest(FETCH_READING_STATUS, fetchReadingStatusSaga);

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

function* fetchGenerateArticleSaga(action) {
    try {
        const segmentId = action.payload;
        yield call(fetchGenerateArticle, segmentId);
    }
    catch (error) {
        console.log(error);
    }
}

function* fetchReadingStatusSaga(action) {
    try {
        const {segmentId} = action.payload;
        const response = yield call(fetchReadingStatus, segmentId);
        yield put(fetchReadingStatusSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}
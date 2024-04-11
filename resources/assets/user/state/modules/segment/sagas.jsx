

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

export default function* segmentsSaga() {
    yield takeLatest(FETCH_SEGMENTS, fetchSegmentsSaga);
    yield takeLatest(FETCH_USER_SEGMENT_STATUSES, fetchUserSegmentStatusesSaga);
    yield takeLatest(FETCH_GENERATE_ARTICLE, fetchGenerateArticleSaga);
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
    console.log(1);
    try {
        console.log(2);
        const segmentId = action.payload;
        yield call(fetchGenerateArticle, segmentId);
        console.log('成功や');
    }
    catch (error) {
        console.log(error);
    }
}

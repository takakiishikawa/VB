

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
import {FETCH_SEGMENT_CYCLE} from './types';
import {fetchSegmentCycleSuccess} from './action';
import {fetchSegmentCycle} from './api';
import {UPDATE_READING_STATUS} from './types';
import {updateReadingStatus} from './api';
import { UPDATE_MIDDLE_READING_STATUS } from './types';
import { updateMiddleReadingStatus } from './api';
import { FETCH_WORD_RESULT } from './types';
import { fetchWordResult } from './api';
import { fetchWordResultSuccess } from './action';

export default function* segmentsSaga() {
    yield takeLatest(FETCH_SEGMENTS, fetchSegmentsSaga);
    yield takeLatest(FETCH_USER_SEGMENT_STATUSES, fetchUserSegmentStatusesSaga);
    yield takeLatest(FETCH_GENERATE_ARTICLE, fetchGenerateArticleSaga);
    yield takeLatest(FETCH_READING_STATUS, fetchReadingStatusSaga);
    yield takeLatest(FETCH_SEGMENT_CYCLE, fetchSegmentCycleSaga);
    yield takeLatest(UPDATE_READING_STATUS, updateReadingStatusSaga);
    yield takeLatest(UPDATE_MIDDLE_READING_STATUS, updateMiddleReadingStatusSaga);
    yield takeLatest(FETCH_WORD_RESULT, fetchWordResultSaga);
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

function* fetchSegmentCycleSaga(action) {
    try {
        const segmentId = action.payload;
        const response = yield call(fetchSegmentCycle, segmentId);
        yield put(fetchSegmentCycleSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}

function* updateReadingStatusSaga(action) {
    try {
        const {segmentId} = action.payload;
        const response = yield call(updateReadingStatus, segmentId);
        yield put(fetchReadingStatusSuccess(response.data));
        yield put(fetchSegmentCycleSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}

function* updateMiddleReadingStatusSaga(action) {
    try {
        const {segmentId, articleCount} = action.payload;
        const response = yield call(updateMiddleReadingStatus, segmentId, articleCount);
        yield put(fetchReadingStatusSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}

function* fetchWordResultSaga(action) {
    try {
        const segmentId = action.payload;
        const response = yield call(fetchWordResult, segmentId);
        yield put(fetchWordResultSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}
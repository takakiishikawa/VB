

//sagaのコードを書く
import {put, call, takeLatest} from 'redux-saga/effects';
import {fetchSegments} from './api';
import {fetchSegmentsSuccess} from './action';
import {FETCH_SEGMENTS} from './types';

export default function* segmentsSaga() {
    yield takeLatest(FETCH_SEGMENTS, fetchSegmentsSaga);
}

function* fetchSegmentsSaga(action) {
    try {
        const {id} = action.payload;
        const response = yield call(fetchSegments, id);
        yield put(fetchSegmentsSuccess(response.data));
    }
    catch {
        console.log(error);
    }
}



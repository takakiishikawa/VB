import {FETCH_WORD_LIST} from "./types";
import {fetchWordListSuccess} from "./actions";
import {fetchWordList} from './api';
import {takeLatest, call, put} from 'redux-saga/effects';

export default function* wordSaga() {
    yield takeLatest(FETCH_WORD_LIST, fetchWordListSaga);
}

function* fetchWordListSaga(action) {
    try {
        const segmentId = action.payload;
        const response = yield call(fetchWordList, segmentId);
        yield put(fetchWordListSuccess(response.data));
    }
    catch (error) {
        console.log(error);
    }
}


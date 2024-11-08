import {FETCH_WORD_LIST} from "./types";
import {fetchWordListSuccess} from "./actions";
import {fetchWordList} from './api';
import {takeLatest, call, put, select} from 'redux-saga/effects';
import {getAnswerList} from './selectors';
import {FETCH_ANSWER_LIST} from "./types";
import {fetchAnswerList} from "./api";

export default function* wordSaga() {
    yield takeLatest(FETCH_WORD_LIST, fetchWordListSaga);
    yield takeLatest(FETCH_ANSWER_LIST, fetchAnswerListSaga);
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

function* fetchAnswerListSaga(action) {
    try {
        const segmentId = action.payload;
        const answerList = yield select(getAnswerList);
        yield call(fetchAnswerList, segmentId, answerList);
    }
    catch (error) {
        console.log(error);
    }
}
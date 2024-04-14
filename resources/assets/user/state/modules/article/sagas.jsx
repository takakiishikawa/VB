import {put, takeLatest, call} from 'redux-saga/effects';
import {FETCH_ARTICLE_LIST} from './types';
import {fetchArticleListSuccess} from './actions';
import {fetchArticleList} from './api';

export default function* articleSaga() {
    yield takeLatest(FETCH_ARTICLE_LIST, fetchArticleListSaga);
}

function* fetchArticleListSaga(action) {
    try {
        const {segmentId, articleId} = action.payload
        const response = yield call(fetchArticleList(segmentId, articleId));
        yield put(fetchArticleListSuccess(response.data));
    } catch {
        console.log(error);
    }
}

import {all} from 'redux-saga/effects';
import userSaga from './modules/user/sagas';
import majorSegmentSaga from './modules/major-segment/sagas';
import segmentSaga from './modules/segment/sagas';
import articleSaga from './modules/article/sagas';
import wordSaga from './modules/word/sagas';

export default function* rootSaga() {
    yield all([
        userSaga(),
        majorSegmentSaga(),
        segmentSaga(),
        articleSaga(),
        wordSaga(),
    ]);
}

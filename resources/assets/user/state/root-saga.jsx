import {all} from 'redux-saga/effects';
import userSaga from './modules/user/sagas';
import majorSegmentSaga from './modules/major-segment/sagas';
import segmentsSaga from './modules/segment/sagas';

export default function* rootSaga() {
    yield all([
        userSaga(),
        majorSegmentSaga(),
        segmentsSaga(),
    ]);
}

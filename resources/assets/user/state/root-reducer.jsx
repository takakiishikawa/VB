import {combineReducers} from 'redux';
import userReducer from './modules/user/reducers';
import majorSegmentReducer from './modules/major-segment/reducers';
import segmentReducer from './modules/segment/reducers';

const rootReducer = combineReducers({
    user: userReducer,
    majorSegment: majorSegmentReducer,
    segment: segmentReducer,
});

export default rootReducer;

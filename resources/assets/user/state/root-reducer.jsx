import {combineReducers} from 'redux';
import userReducer from './modules/user/reducers';
import majorSegmentReducer from './modules/major-segment/reducers';

const rootReducer = combineReducers({
    user: userReducer,
    majorSegment: majorSegmentReducer,
});

export default rootReducer;

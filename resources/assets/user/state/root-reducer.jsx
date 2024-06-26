import {combineReducers} from 'redux';
import userReducer from './modules/user/reducers';
import majorSegmentReducer from './modules/major-segment/reducers';
import segmentReducer from './modules/segment/reducers';
import sidebarReducer from './modules/sidebar/reducers';
import articleReducer from './modules/article/reducers';
import wordReducer from './modules/word/reducers';

const rootReducer = combineReducers({
    user: userReducer,
    majorSegment: majorSegmentReducer,
    segment: segmentReducer,
    sidebar: sidebarReducer,
    article: articleReducer,
    word: wordReducer,
});

export default rootReducer;

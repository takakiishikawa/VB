import {combineReducers} from 'redux';
import userReducer from './modules/user/reducers';

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;

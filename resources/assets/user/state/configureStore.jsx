import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

//createStore非推奨, configureStoreのみtoolkit導入
const sagaMiddleware = createSagaMiddleware();

const configureAppStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(sagaMiddleware),
    });

    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureAppStore;
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

const configureStore = (initialState = {}, history, rootReducer) => {
    const sagaMiddleware = createSagaMiddleware();

    const enhancers = [applyMiddleware(sagaMiddleware)];

    // Redux DevTools Extensionを使用する場合
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        initialState,
        rootReducer(history),
        composeEnhancers(...enhancers),
    );

    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {};
    store.injectedSaga = {};
    
    return store;
}

export default configureStore;

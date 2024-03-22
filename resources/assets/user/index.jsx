import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import configureStore from './state/configureStore'
import rootReducer from './state/root-reducer';
import rootSaga from './state/root-saga';
import Routes from './views/routes';
import history from './views/routes/history';

const intialState = {};
const store = configureStore(intialState, history, rootReducer);
store.runSaga(rootSaga);

const Root = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
);

const container = document.getElementById('app');
const appRoot = createRoot(container);
appRoot.render(<Root />);

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-rudux';
import configureStore from './state/configureStore'
import rootReducer from './state/root-reducer';
import rootSaga from './state/root-saga';
import Routes from './views/routes';
import history from './views/routes/history';

const intialState = {};
const store = configureStore(initialState, history, rootReducer);
store.runSaga(rootSaga);

const Root = () => {
    <Provider 
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Routes />);




import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'Shared/state/configureStore';
import history from 'Shared/components/routes/history';
import rootReducer from './state/rootReducer';
import rootSaga from './state/rootSaga';
import Routes from './views/routes';

const initialState = {};
const store = configureStore(initialState, history, rootReducer);
store.runSaga(rootSaga);

const Root = () => (
    <Provider store={store}>
        <Routes />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));

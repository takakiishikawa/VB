import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import configureAppStore from './state/configureStore';
import Routes from './views/routes';

//init store
const store = configureAppStore();

//render<Root />の場合動かない。原因不明
const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <Routes />
    </Provider>
);
